'use client';

import React from 'react';
import Link from 'next/link';
import { StoreInfo } from '@/types';
import styles from './Footer.module.css';

/**
 * Footer component props
 */
interface FooterProps {
  storeInfo: StoreInfo;
}

/**
 * Footer Component
 * 
 * Displays store contact information, quick links, and copyright.
 * Features:
 * - Store contact information (phone, email, address)
 * - Quick links to all pages
 * - Social media links
 * - Copyright information
 * - Responsive design
 * - Semantic HTML with ARIA labels
 * 
 * Requirements: 1.1, 1.4
 */
export const Footer: React.FC<FooterProps> = ({ storeInfo }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerContainer}>
        {/* Contact Information Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Contact Us</h3>
          <div className={styles.contactInfo}>
            <p>
              <strong>Phone:</strong>{' '}
              <a href={`tel:${storeInfo.phone}`} className={styles.link}>
                {storeInfo.phone}
              </a>
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${storeInfo.email}`} className={styles.link}>
                {storeInfo.email}
              </a>
            </p>
            <p>
              <strong>Address:</strong>
              <br />
              {storeInfo.address}
              <br />
              {storeInfo.city}, {storeInfo.state} {storeInfo.zipCode}
            </p>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Quick Links</h3>
          <nav aria-label="Footer navigation">
            <ul className={styles.linkList}>
              <li>
                <Link href="/" className={styles.link}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.link}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/gallery" className={styles.link}>
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/shop" className={styles.link}>
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/faq" className={styles.link}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.link}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Social Media Section */}
        {storeInfo.socialMedia && storeInfo.socialMedia.length > 0 && (
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Follow Us</h3>
            <div className={styles.socialLinks}>
              {storeInfo.socialMedia.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`Visit our ${social.platform} page`}
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Store Hours Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>Store Hours</h3>
          <div className={styles.hours}>
            {storeInfo.hours.map((hour) => (
              <div key={hour.day} className={styles.hourRow}>
                <span className={styles.day}>{hour.day}:</span>
                <span className={styles.time}>
                  {hour.open} - {hour.close}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className={styles.copyright}>
        <p>
          &copy; {currentYear} {storeInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
