'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { FishProduct } from '@/types';
import { useAnimation } from '@/hooks/useAnimation';
import styles from './ProductCard.module.css';

/**
 * Props for the ProductCard component
 */
export interface ProductCardProps {
  /** Fish product data */
  product: FishProduct;
  /** Optional callback when "View Details" button is clicked */
  onViewDetails?: (productId: string) => void;
  /** Optional animation delay in seconds */
  animationDelay?: number;
}

/**
 * ProductCard Component
 *
 * Displays a fish product with:
 * - Product image with lazy loading
 * - Species name and scientific name
 * - Price display
 * - Description preview
 * - "View Details" button
 * - Hover state: image zoom, shadow elevation
 * - Staggered animation on page load
 *
 * @example
 * <ProductCard
 *   product={fishProduct}
 *   onViewDetails={(id) => console.log(id)}
 *   animationDelay={0.2}
 * />
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  animationDelay = 0,
}) => {
  const { createHoverEffect, animateElements } = useAnimation();

  useEffect(() => {
    // Create hover effect for the card
    const cardElement = document.querySelector(`[data-product-id="${product.id}"]`) as HTMLElement | null;
    if (cardElement) {
      createHoverEffect(cardElement, {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 32px rgba(45, 55, 72, 0.2)',
      });
    }
  }, [product.id, createHoverEffect]);

  useEffect(() => {
    // Animate product card on mount
    animateElements(`[data-product-id="${product.id}"]`, 'fadeIn', {
      duration: 0.6,
      delay: animationDelay,
      ease: 'power2.out',
    });
  }, [product.id, animationDelay, animateElements]);

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product.id);
    }
  };

  return (
    <div
      className={styles.card}
      data-product-id={product.id}
      style={{
        animationDelay: `${animationDelay}s`,
      }}
    >
      <div className={styles.imageContainer}>
        <Image
          src={product.image}
          alt={`${product.name} - ${product.scientificName}`}
          width={300}
          height={300}
          className={styles.image}
          loading="lazy"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = '/images/placeholder.png';
          }}
        />
        {!product.inStock && <div className={styles.outOfStock}>Out of Stock</div>}
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>

        <p className={styles.scientificName}>{product.scientificName}</p>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.footer}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>

          <button
            className={styles.viewButton}
            onClick={handleViewDetails}
            disabled={!product.inStock}
            aria-label={`View details for ${product.name}`}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
