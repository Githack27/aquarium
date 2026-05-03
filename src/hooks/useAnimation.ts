'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ANIMATION_TIMINGS, ANIMATION_EASING } from '@/utils/constants';

/**
 * Animation configuration options
 */
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number | { amount: number; from?: string; grid?: [number, number]; axis?: string };
  onComplete?: () => void;
}

/**
 * Animation types supported by the hook
 */
export type AnimationType = 'fadeIn' | 'scaleIn' | 'slideInUp' | 'slideInDown' | 'slideInLeft' | 'slideInRight';

/**
 * useAnimation Hook
 *
 * Provides GSAP animation utilities for React components.
 * Supports fade-in, scale, and slide animations with stagger support.
 * Respects prefers-reduced-motion for accessibility.
 *
 * @example
 * const { animateElements } = useAnimation();
 * useEffect(() => {
 *   animateElements('.product-card', 'fadeIn', { stagger: 0.2 });
 * }, [animateElements]);
 */
export const useAnimation = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  /**
   * Check if user prefers reduced motion
   */
  const prefersReducedMotion = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  /**
   * Animate elements with specified animation type
   */
  const animateElements = useCallback(
    (
      selector: string | HTMLElement | HTMLElement[],
      animationType: AnimationType,
      config: AnimationConfig = {}
    ) => {
      if (prefersReducedMotion()) {
        // Skip animations if reduced motion is preferred
        return;
      }

      const {
        duration = ANIMATION_TIMINGS.NORMAL,
        delay = 0,
        ease = ANIMATION_EASING.EASE_OUT_QUAD,
        stagger = 0,
        onComplete,
      } = config;

      const elements = typeof selector === 'string' ? gsap.utils.toArray(selector) : selector;

      if (!elements || (Array.isArray(elements) && elements.length === 0)) return;

      // Kill any existing animations on these elements
      gsap.killTweensOf(elements);

      const animationProps: gsap.TweenVars = {
        duration,
        delay,
        ease,
        onComplete,
      };

      if (stagger) {
        if (typeof stagger === 'number') {
          animationProps.stagger = stagger;
        } else {
          animationProps.stagger = {
            amount: stagger.amount,
            from: (stagger.from as 'start' | 'center' | 'end' | 'edges' | 'random') || 'start',
            grid: stagger.grid,
            axis: (stagger.axis as 'x' | 'y') || 'y',
          };
        }
      }

      switch (animationType) {
        case 'fadeIn':
          gsap.from(elements, {
            ...animationProps,
            opacity: 0,
          });
          break;

        case 'scaleIn':
          gsap.from(elements, {
            ...animationProps,
            opacity: 0,
            scale: 0.9,
          });
          break;

        case 'slideInUp':
          gsap.from(elements, {
            ...animationProps,
            opacity: 0,
            y: 30,
          });
          break;

        case 'slideInDown':
          gsap.from(elements, {
            ...animationProps,
            opacity: 0,
            y: -30,
          });
          break;

        case 'slideInLeft':
          gsap.from(elements, {
            ...animationProps,
            opacity: 0,
            x: -30,
          });
          break;

        case 'slideInRight':
          gsap.from(elements, {
            ...animationProps,
            opacity: 0,
            x: 30,
          });
          break;

        default:
          break;
      }
    },
    [prefersReducedMotion]
  );

  /**
   * Animate elements with stagger effect (for grids)
   */
  const animateStaggered = useCallback(
    (
      selector: string | HTMLElement | HTMLElement[],
      animationType: AnimationType,
      staggerAmount: number = ANIMATION_TIMINGS.STAGGER_AMOUNT,
      config: AnimationConfig = {}
    ) => {
      if (prefersReducedMotion()) {
        return;
      }

      animateElements(selector, animationType, {
        ...config,
        stagger: {
          amount: staggerAmount,
          from: 'start',
          axis: 'y',
        },
      });
    },
    [animateElements, prefersReducedMotion]
  );

  /**
   * Create a hover animation effect
   */
  const createHoverEffect = useCallback(
    (
      selector: string | HTMLElement | HTMLElement[],
      hoverProps: gsap.TweenVars,
      duration: number = ANIMATION_TIMINGS.NORMAL
    ) => {
      if (prefersReducedMotion()) {
        return;
      }

      const elements = typeof selector === 'string' ? gsap.utils.toArray(selector) : selector;

      if (!elements || (Array.isArray(elements) && elements.length === 0)) return;

      const elementsArray = Array.isArray(elements) ? elements : [elements];

      elementsArray.forEach((element: any) => {
        const originalProps: gsap.TweenVars = {};

        // Store original properties
        Object.keys(hoverProps).forEach((key) => {
          originalProps[key] = element.style[key] || gsap.getProperty(element, key);
        });

        element.addEventListener('mouseenter', () => {
          gsap.to(element, {
            ...hoverProps,
            duration,
            overwrite: 'auto',
          });
        });

        element.addEventListener('mouseleave', () => {
          gsap.to(element, {
            ...originalProps,
            duration,
            overwrite: 'auto',
          });
        });
      });
    },
    [prefersReducedMotion]
  );

  /**
   * Kill all animations
   */
  const killAnimations = useCallback(() => {
    gsap.globalTimeline.getChildren().forEach((tween) => {
      tween.kill();
    });
  }, []);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return {
    animateElements,
    animateStaggered,
    createHoverEffect,
    killAnimations,
    prefersReducedMotion,
  };
};
