'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { SearchBar } from '@/components/SearchBar';
import { ProductCard } from '@/components/ProductCard';
import { fishProducts } from '@/data/fish-products';
import { useAnimation } from '@/hooks/useAnimation';
import styles from './page.module.css';

/**
 * Shop Page Component
 *
 * Displays the shop page with:
 * - Hero section with "Shop" title
 * - SearchBar component for filtering products
 * - ProductCard components in grid layout
 * - Real-time search filtering by product name and description
 * - "No results" message when search returns empty
 * - Total product count display
 * - Staggered animations on load
 */
export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const { animateElements } = useAnimation();

  /**
   * Filter products based on search query
   * Searches across product name and description (case-insensitive)
   */
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return fishProducts;
    }

    const lowerQuery = searchQuery.toLowerCase();
    return fishProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.scientificName.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  useEffect(() => {
    // Animate products grid with stagger
    if (filteredProducts.length > 0) {
      setTimeout(() => {
        animateElements(`.${styles.productsGrid} > div`, 'fadeIn', {
          duration: 0.6,
          stagger: {
            amount: 0.4,
            from: 'start',
            axis: 'y',
          },
          ease: 'power2.out',
        });
      }, 100);
    }
  }, [filteredProducts.length, animateElements]);

  /**
   * Handle search query change
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  /**
   * Handle view details button click
   */
  const handleViewDetails = (productId: string) => {
    console.log(`View details for product: ${productId}`);
    // Future: Navigate to product detail page
  };

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <Hero
        title="Shop"
        subtitle="Browse Our Premium Selection of Fish and Aquatic Supplies"
        animationDelay={0}
      />

      {/* Shop Section */}
      <section className={styles.shopSection}>
        <div className={styles.container}>
          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search by fish name, scientific name, or description..."
              debounceDelay={300}
            />
          </div>

          {/* Product Count */}
          <div className={styles.productCountContainer}>
            <p className={styles.productCount}>
              Showing {filteredProducts.length} of {fishProducts.length} products
            </p>
          </div>

          {/* Products Grid or No Results Message */}
          {filteredProducts.length > 0 ? (
            <div className={styles.productsGrid}>
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleViewDetails}
                  animationDelay={index * 0.1}
                />
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <p className={styles.noResultsText}>
                No products found matching "{searchQuery}"
              </p>
              <p className={styles.noResultsSubtext}>
                Try adjusting your search terms or browse all products
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
