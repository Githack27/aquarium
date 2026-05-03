'use client';

import React, { useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { FeatureCard } from '@/components/FeatureCard';
import { features } from '@/data/features';
import { useAnimation } from '@/hooks/useAnimation';
import styles from './page.module.css';

/**
 * Home Page Component
 *
 * Displays the landing page with:
 * - Hero section with headline and CTA button
 * - Features section showcasing store features
 * - Call-to-action section linking to Shop
 */
export default function Home() {
  const { animateElements } = useAnimation();

  useEffect(() => {
    // Animate features section with stagger
    setTimeout(() => {
      animateElements(`.${styles.featuresGrid} > div`, 'fadeIn', {
        duration: 0.6,
        stagger: {
          amount: 0.5,
          from: 'start',
          axis: 'y',
        },
        ease: 'power2.out',
      });
    }, 100);
  }, [animateElements]);

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <Hero
        title="Welcome to Aquatic Paradise"
        subtitle="Discover Premium Fish and Supplies for Your Aquarium"
        ctaButton={{
          label: 'Shop Now',
          href: '/shop',
        }}
        animationDelay={0}
      />

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose Us</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                {...feature}
                animationDelay={index * 0.15}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Start Your Aquarium Journey?</h2>
            <p className={styles.ctaDescription}>
              Browse our complete selection of premium fish and supplies. Our expert team is here to help you succeed.
            </p>
            <a href="/shop" className={styles.ctaLink}>
              Explore Our Shop
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
