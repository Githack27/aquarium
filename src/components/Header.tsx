'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from './Navigation';
import styles from './Header.module.css';

/**
 * Header component props
 */
interface HeaderProps {
  storeName?: string;
}

/**
 * Header Component
 * 
 * Sticky header with store name/logo and integrated navigation.
 * Features:
 * - Sticky positioning at top of page
 * - Store name/logo display
 * - Integrated Navigation component
 * - Smooth scroll integration
 * - Responsive design
 * - Semantic HTML with ARIA labels
 * 
 * Requirements: 1.1, 1.4, 1.5
 */
export const Header: React.FC<HeaderProps> = ({ storeName = 'Aquatic Paradise' }) => {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.headerContainer}>
        {/* Store Logo/Name */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>{storeName}</span>
        </Link>

        {/* Navigation */}
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
