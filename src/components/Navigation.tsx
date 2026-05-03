'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

/**
 * Navigation link interface
 */
interface NavLink {
  label: string;
  href: string;
}

/**
 * Navigation component props
 */
interface NavigationProps {
  links?: NavLink[];
}

/**
 * Navigation Component
 * 
 * Provides desktop horizontal menu and mobile hamburger menu with slide-out drawer.
 * Features:
 * - Desktop: Horizontal menu with all page links
 * - Mobile: Hamburger menu with slide-out drawer
 * - Active route indicator styling
 * - Smooth page transitions
 * - Keyboard accessible
 * - ARIA labels for screen readers
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6
 */
export const Navigation: React.FC<NavigationProps> = ({
  links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Shop', href: '/shop' },
  ],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={styles.navigation}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Desktop Menu */}
      <ul className={styles.desktopMenu} role="menubar">
        {links.map((link) => (
          <li key={link.href} role="none">
            <Link
              href={link.href}
              className={`${styles.navLink} ${
                isActive(link.href) ? styles.active : ''
              }`}
              aria-current={isActive(link.href) ? 'page' : undefined}
              role="menuitem"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger Button */}
      <button
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </button>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <button
          className={styles.closeButton}
          onClick={toggleMenu}
          aria-label="Close navigation menu"
        >
          ✕
        </button>
        <ul className={styles.mobileMenuList} role="menubar">
          {links.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                className={`${styles.mobileNavLink} ${
                  isActive(link.href) ? styles.active : ''
                }`}
                onClick={handleLinkClick}
                aria-current={isActive(link.href) ? 'page' : undefined}
                role="menuitem"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={toggleMenu}
          aria-hidden="true"
        ></div>
      )}
    </nav>
  );
};

export default Navigation;
