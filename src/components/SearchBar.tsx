'use client';

import React, { useState, useCallback, useEffect } from 'react';
import styles from './SearchBar.module.css';

/**
 * Props for the SearchBar component
 */
export interface SearchBarProps {
  /** Callback when search query changes */
  onSearch: (query: string) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Optional debounce delay in milliseconds */
  debounceDelay?: number;
}

/**
 * SearchBar Component
 *
 * Renders a search input with:
 * - Text input for product search
 * - Real-time filtering with debouncing
 * - Clear button
 *
 * @example
 * <SearchBar
 *   onSearch={(query) => console.log(query)}
 *   placeholder="Search products..."
 *   debounceDelay={300}
 * />
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search products...',
  debounceDelay = 300,
}) => {
  const [query, setQuery] = useState('');
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  /**
   * Handle input change with debouncing
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);

      // Clear existing timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // Set new timer for debounced search
      const timer = setTimeout(() => {
        onSearch(value);
      }, debounceDelay);

      setDebounceTimer(timer);
    },
    [debounceTimer, debounceDelay, onSearch]
  );

  /**
   * Handle clear button click
   */
  const handleClear = useCallback(() => {
    setQuery('');
    onSearch('');

    // Clear any pending debounce timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
  }, [debounceTimer, onSearch]);

  /**
   * Cleanup timer on unmount
   */
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return (
    <div className={styles.searchBar}>
      <div className={styles.inputWrapper}>
        <svg
          className={styles.searchIcon}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 19L14.65 14.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className={styles.input}
          aria-label="Search products"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
