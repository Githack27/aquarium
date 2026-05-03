'use client';

import React, { useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { FishCard } from '@/components/FishCard';
import { getFishProductsByCategory } from '@/data/fish-products';
import { useAnimation } from '@/hooks/useAnimation';
import styles from './page.module.css';

/**
 * Gallery Page Component
 *
 * Displays fish products organized by category:
 * - Freshwater fish
 * - Saltwater fish
 * - Specialty fish
 *
 * Features:
 * - Hero section with "Gallery" title
 * - Fish products organized in category sections
 * - Grid layout with FishCard components
 * - Click handler to navigate to Shop page
 * - Responsive design with GSAP animations
 */
export default function Gallery() {
  const { animateElements } = useAnimation();

  // Get fish products by category
  const freshwaterFish = getFishProductsByCategory('Freshwater');
  const saltwaterFish = getFishProductsByCategory('Saltwater');
  const specialtyFish = getFishProductsByCategory('Specialty');

  // Category data for rendering
  const categories = [
    {
      title: 'Freshwater Fish',
      description: 'Hardy and colorful freshwater species perfect for beginners and experienced aquarists.',
      products: freshwaterFish,
    },
    {
      title: 'Saltwater Fish',
      description: 'Vibrant and exotic saltwater species for reef and marine aquariums.',
      products: saltwaterFish,
    },
    {
      title: 'Specialty Fish',
      description: 'Unique and rare species for advanced aquarists seeking something extraordinary.',
      products: specialtyFish,
    },
  ];

  useEffect(() => {
    // Animate all fish grids with stagger
    setTimeout(() => {
      animateElements(`.${styles.fishGrid}`, 'fadeIn', {
        duration: 0.6,
        stagger: {
          amount: 0.4,
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
        title="Gallery"
        subtitle="Explore Our Collection of Premium Fish Species"
        ctaButton={{
          label: 'Shop Now',
          href: '/shop',
        }}
        animationDelay={0}
      />

      {/* Gallery Content */}
      <div className={styles.container}>
        {categories.map((category, categoryIndex) => (
          <section key={category.title} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              <p className={styles.categoryDescription}>{category.description}</p>
            </div>

            {/* Fish Grid */}
            <div className={styles.fishGrid}>
              {category.products.map((fish, fishIndex) => (
                <FishCard
                  key={fish.id}
                  fish={fish}
                  animationDelay={categoryIndex * 0.1 + fishIndex * 0.05}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
