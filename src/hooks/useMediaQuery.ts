'use client';

import { useState, useEffect, useCallback } from 'react';
import { BREAKPOINTS } from '@/utils/constants';

/**
 * Predefined breakpoint queries
 */
export const MEDIA_QUERIES = {
  isMobile: `(max-width: ${BREAKPOINTS.TABLET - 1}px)`,
  isTablet: `(min-width: ${BREAKPOINTS.TABLET}px) and (max-width: ${BREAKPOINTS.DESKTOP - 1}px)`,
  isDesktop: `(min-width: ${BREAKPOINTS.DESKTOP}px)`,
  isDesktopLarge: `(min-width: ${BREAKPOINTS.DESKTOP_LARGE}px)`,
  isMobileOrTablet: `(max-width: ${BREAKPOINTS.DESKTOP - 1}px)`,
  isTabletOrDesktop: `(min-width: ${BREAKPOINTS.TABLET}px)`,
} as const;

/**
 * useMediaQuery Hook
 *
 * Checks if the viewport matches a given media query.
 * Supports predefined breakpoints from constants or custom media queries.
 * Returns a boolean for conditional rendering based on screen size.
 *
 * Features:
 * - Predefined breakpoint queries for common screen sizes
 * - Support for custom media queries
 * - Server-side rendering safe (returns false initially)
 * - Automatic listener cleanup
 * - Memoized callback for performance
 *
 * @param query - Media query string or predefined breakpoint key
 * @returns boolean indicating if the media query matches
 *
 * @example
 * // Using predefined breakpoints
 * const isMobile = useMediaQuery('isMobile');
 * const isDesktop = useMediaQuery('isDesktop');
 *
 * // Using custom media query
 * const isWideScreen = useMediaQuery('(min-width: 1920px)');
 *
 * // Conditional rendering
 * return isMobile ? <MobileNav /> : <DesktopNav />;
 */
export const useMediaQuery = (query: keyof typeof MEDIA_QUERIES | string): boolean => {
  const [matches, setMatches] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Resolve query - use predefined if available, otherwise use as custom query
  const mediaQuery = useCallback(() => {
    if (query in MEDIA_QUERIES) {
      return MEDIA_QUERIES[query as keyof typeof MEDIA_QUERIES];
    }
    return query;
  }, [query]);

  useEffect(() => {
    setIsMounted(true);

    if (typeof window === 'undefined') {
      return;
    }

    const resolvedQuery = mediaQuery();
    const mediaQueryList = window.matchMedia(resolvedQuery);

    // Set initial value
    setMatches(mediaQueryList.matches);

    // Create listener function
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Add listener
    mediaQueryList.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [mediaQuery]);

  // Return false on server-side to prevent hydration mismatch
  if (!isMounted) {
    return false;
  }

  return matches;
};

/**
 * Hook to get multiple media query results at once
 *
 * @param queries - Array of media query keys or strings
 * @returns Object with query results
 *
 * @example
 * const { isMobile, isTablet, isDesktop } = useMediaQueries(['isMobile', 'isTablet', 'isDesktop']);
 */
export const useMediaQueries = (
  queries: (keyof typeof MEDIA_QUERIES | string)[]
): Record<string, boolean> => {
  const results: Record<string, boolean> = {};

  queries.forEach((query) => {
    const key = typeof query === 'string' ? query : query;
    results[key] = useMediaQuery(query);
  });

  return results;
};

/**
 * Hook to get current breakpoint name
 *
 * @returns Current breakpoint name: 'mobile', 'tablet', 'desktop', or 'desktopLarge'
 *
 * @example
 * const breakpoint = useBreakpoint();
 * console.log(breakpoint); // 'mobile' | 'tablet' | 'desktop' | 'desktopLarge'
 */
export const useBreakpoint = (): 'mobile' | 'tablet' | 'desktop' | 'desktopLarge' | null => {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop' | 'desktopLarge' | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (typeof window === 'undefined') {
      return;
    }

    const updateBreakpoint = () => {
      const width = window.innerWidth;

      if (width < BREAKPOINTS.TABLET) {
        setBreakpoint('mobile');
      } else if (width < BREAKPOINTS.DESKTOP) {
        setBreakpoint('tablet');
      } else if (width < BREAKPOINTS.DESKTOP_LARGE) {
        setBreakpoint('desktop');
      } else {
        setBreakpoint('desktopLarge');
      }
    };

    updateBreakpoint();

    window.addEventListener('resize', updateBreakpoint);

    return () => {
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, []);

  // Return null on server-side to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return breakpoint;
};
