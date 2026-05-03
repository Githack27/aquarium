'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FishProduct } from '@/types';
import { useAnimation } from '@/hooks/useAnimation';
import styles from './FishCard.module.css';

/**
 * Props for the FishCard component
 */
export interface FishCardProps {
  /** Fish product data */
  fish: FishProduct;
  /** Optional animation delay in seconds */
  animationDelay?: number;
}

/**
 * FishCard Component
 *
 * Displays a fish species card with:
 * - Fish image with species name
 * - Hover state with visual feedback
 * - Click handler for navigation to Shop
 *
 * @example
 * <FishCard
 *   fish={fishProduct}
 *   animationDelay={0.1}
 * />
 */
export const FishCard: React.FC<FishCardProps> = ({ fish, animationDelay = 0 }) => {
  const { createHoverEffect, animateElements } = useAnimation();

  useEffect(() => {
    // Create hover effect for the card
    const cardElement = document.querySelector(`[data-fish-id="${fish.id}"]`) as HTMLElement | null;
    if (cardElement) {
      createHoverEffect(cardElement, {
        transform: 'scale(1.05)',
        boxShadow: '0 12px 32px rgba(45, 55, 72, 0.2)',
      });
    }
  }, [fish.id, createHoverEffect]);

  useEffect(() => {
    // Animate fish card on mount
    animateElements(`[data-fish-id="${fish.id}"]`, 'fadeIn', {
      duration: 0.6,
      delay: animationDelay,
      ease: 'power2.out',
    });
  }, [fish.id, animationDelay, animateElements]);

  return (
    <Link href="/shop" className={styles.link}>
      <div
        className={styles.card}
        data-fish-id={fish.id}
        style={{
          animationDelay: `${animationDelay}s`,
        }}
      >
        <div className={styles.imageContainer}>
          <Image
            src={fish.image}
            alt={`${fish.name} - ${fish.scientificName}`}
            width={250}
            height={250}
            className={styles.image}
            loading="lazy"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = '/images/placeholder.png';
            }}
          />
        </div>

        <div className={styles.overlay}>
          <h3 className={styles.name}>{fish.name}</h3>
          <p className={styles.scientificName}>{fish.scientificName}</p>
        </div>
      </div>
    </Link>
  );
};

export default FishCard;
