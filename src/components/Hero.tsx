'use client';

import React, { useEffect } from 'react';
import { useAnimation } from '@/hooks/useAnimation';
import styles from './Hero.module.css';

/**
 * Props for the Hero component
 */
export interface HeroProps {
  /** Main headline text */
  title: string;
  /** Optional subheading text */
  subtitle?: string;
  /** Optional background image URL */
  backgroundImage?: string;
  /** Optional call-to-action button */
  ctaButton?: {
    label: string;
    href: string;
  };
  /** Optional animation delay in seconds */
  animationDelay?: number;
}

/**
 * Hero Component
 *
 * Renders a large, prominent banner section with:
 * - Headline and optional subheading
 * - Background image support
 * - Call-to-action button
 * - GSAP animations (fade-in, scale, slide)
 * - Responsive scaling on mobile
 *
 * @example
 * <Hero
 *   title="Welcome to Aquatic Paradise"
 *   subtitle="Discover Premium Fish and Supplies"
 *   backgroundImage="/images/hero-bg.jpg"
 *   ctaButton={{ label: 'Shop Now', href: '/shop' }}
 * />
 */
export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  ctaButton,
  animationDelay = 0,
}) => {
  const { animateElements } = useAnimation();

  useEffect(() => {
    // Animate hero elements on mount
    // Fade in and slide up title
    animateElements(`.${styles.title}`, 'slideInUp', {
      duration: 1,
      delay: animationDelay,
      ease: 'power2.out',
    });

    // Scale in hero image
    if (backgroundImage) {
      animateElements(`.${styles.heroImage}`, 'scaleIn', {
        duration: 1.2,
        delay: animationDelay + 0.2,
        ease: 'back.out',
      });
    }

    // Fade in and slide up subtitle
    if (subtitle) {
      animateElements(`.${styles.subtitle}`, 'slideInUp', {
        duration: 0.8,
        delay: animationDelay + 0.4,
        ease: 'power2.out',
      });
    }

    // Fade in CTA button
    if (ctaButton) {
      animateElements(`.${styles.ctaButton}`, 'fadeIn', {
        duration: 0.8,
        delay: animationDelay + 0.6,
        ease: 'power2.out',
      });
    }
  }, [animateElements, title, subtitle, backgroundImage, ctaButton, animationDelay]);

  return (
    <section
      className={styles.hero}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {ctaButton && (
          <a href={ctaButton.href} className={styles.ctaButton}>
            {ctaButton.label}
          </a>
        )}
      </div>

      {backgroundImage && <div className={styles.heroImage} />}
    </section>
  );
};

export default Hero;
