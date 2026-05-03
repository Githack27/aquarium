'use client';

import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { LENIS_CONFIG } from '@/utils/constants';

/**
 * Lenis instance reference (singleton pattern)
 */
let lenisInstance: Lenis | null = null;

/**
 * useLenis Hook
 *
 * Initializes and manages Lenis smooth scrolling integration with GSAP.
 * Handles cleanup on unmount and provides scroll-to-top functionality.
 *
 * Features:
 * - Smooth scrolling with customizable easing
 * - GSAP ticker integration for optimal performance
 * - Scroll-to-top functionality
 * - Automatic cleanup on unmount
 * - Singleton pattern to prevent multiple instances
 *
 * @example
 * const { scrollToTop } = useLenis();
 * // Use scrollToTop() to smoothly scroll to top
 */
export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  /**
   * Initialize Lenis instance
   */
  const initLenis = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Use singleton pattern - only create one instance
    if (lenisInstance) {
      lenisRef.current = lenisInstance;
      return lenisInstance;
    }

    try {
      const lenis = new Lenis({
        duration: LENIS_CONFIG.DURATION,
        easing: LENIS_CONFIG.EASING,
        touchMultiplier: LENIS_CONFIG.TOUCH_MULTIPLIER,
      } as any);

      // Integrate with GSAP ticker for optimal performance
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      // Disable default scroll behavior
      gsap.ticker.lagSmoothing(0);

      lenisInstance = lenis;
      lenisRef.current = lenis;

      return lenis;
    } catch (error) {
      console.error('Failed to initialize Lenis:', error);
      return null;
    }
  }, []);

  /**
   * Scroll to a specific element or position
   */
  const scrollTo = useCallback(
    (target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) => {
      const lenis = lenisRef.current || initLenis();
      if (!lenis) return;

      try {
        lenis.scrollTo(target, {
          offset: options?.offset || 0,
          duration: options?.duration || LENIS_CONFIG.DURATION,
        });
      } catch (error) {
        console.error('Failed to scroll to target:', error);
      }
    },
    [initLenis]
  );

  /**
   * Scroll to top of page smoothly
   */
  const scrollToTop = useCallback(() => {
    scrollTo(0, { duration: LENIS_CONFIG.DURATION });
  }, [scrollTo]);

  /**
   * Get current scroll position
   */
  const getScrollPosition = useCallback(() => {
    const lenis = lenisRef.current;
    if (!lenis) return 0;
    return lenis.scroll;
  }, []);

  /**
   * Enable/disable scrolling
   */
  const setScrollEnabled = useCallback((enabled: boolean) => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (enabled) {
      lenis.start();
    } else {
      lenis.stop();
    }
  }, []);

  /**
   * Reset scroll position
   */
  const resetScroll = useCallback(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    lenis.scrollTo(0, { immediate: true });
  }, []);

  /**
   * Initialize Lenis on mount
   */
  useEffect(() => {
    initLenis();

    return () => {
      // Don't destroy Lenis on unmount - keep it as singleton
      // This prevents re-initialization on component remounts
    };
  }, [initLenis]);

  /**
   * Cleanup on component unmount
   */
  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return {
    scrollTo,
    scrollToTop,
    getScrollPosition,
    setScrollEnabled,
    resetScroll,
    lenis: lenisRef.current,
  };
};

/**
 * Destroy Lenis instance (call this when app is unmounting)
 */
export const destroyLenis = () => {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
};
