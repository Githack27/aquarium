'use client';

import React, { useEffect } from 'react';
import { Feature } from '@/types';
import { useAnimation } from '@/hooks/useAnimation';
import styles from './FeatureCard.module.css';

/**
 * Props for the FeatureCard component
 */
export interface FeatureCardProps extends Feature {
  /** Optional animation delay in seconds */
  animationDelay?: number;
}

/**
 * FeatureCard Component
 *
 * Displays a single feature with:
 * - Icon identifier
 * - Title and description
 * - Support for animation delay
 * - Hover state with subtle lift effect
 *
 * @example
 * <FeatureCard
 *   id="feature-001"
 *   icon="fish"
 *   title="Premium Fish Selection"
 *   description="Curated collection of 25+ fish species"
 *   animationDelay={0.2}
 * />
 */
export const FeatureCard: React.FC<FeatureCardProps> = ({
  id,
  icon,
  title,
  description,
  animationDelay = 0,
}) => {
  const { animateElements } = useAnimation();

  useEffect(() => {
    // Animate feature card on mount
    animateElements(`[data-feature-id="${id}"]`, 'fadeIn', {
      duration: 0.6,
      delay: animationDelay,
      ease: 'power2.out',
    });
  }, [id, animationDelay, animateElements]);

  // Map icon names to emoji or icon symbols
  const getIconDisplay = (iconName: string): string => {
    const iconMap: Record<string, string> = {
      fish: '🐠',
      package: '📦',
      support: '🤝',
      delivery: '🚚',
      guarantee: '✓',
    };
    return iconMap[iconName] || '•';
  };

  return (
    <div
      className={styles.card}
      data-feature-id={id}
      style={{
        animationDelay: `${animationDelay}s`,
      }}
    >
      <div className={styles.iconContainer}>
        <span className={styles.icon}>{getIconDisplay(icon)}</span>
      </div>

      <h3 className={styles.title}>{title}</h3>

      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default FeatureCard;
