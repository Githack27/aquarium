'use client';

import React from 'react';
import { Hero } from '@/components/Hero';
import styles from './page.module.css';

/**
 * About Page Component
 *
 * Displays company information including:
 * - Hero section with "About Us" title
 * - Company background/story
 * - Mission statement
 * - Company values/principles
 * - Placeholder image
 * - GSAP animations on scroll
 */
export default function About() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <Hero
        title="About Us"
        subtitle="Discover the Story Behind Aquatic Paradise"
        animationDelay={0}
      />

      {/* Company Background Section */}
      <section className={styles.backgroundSection}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            {/* Background Content */}
            <div className={styles.contentColumn}>
              <h2 className={styles.sectionTitle}>Our Story</h2>
              <p className={styles.bodyText}>
                Founded in 2010, Aquatic Paradise began as a small passion project by a group of aquarium enthusiasts who wanted to share their love for aquatic life with the community. What started as a modest storefront has grown into one of the region's premier destinations for premium fish and aquarium supplies.
              </p>
              <p className={styles.bodyText}>
                Over the past decade, we've built our reputation on quality, expertise, and genuine care for both our customers and the aquatic creatures we provide. Our team of experienced aquarists is dedicated to helping every customer succeed in their aquarium journey, whether they're beginners setting up their first tank or advanced hobbyists maintaining complex ecosystems.
              </p>
              <p className={styles.bodyText}>
                Today, Aquatic Paradise serves thousands of satisfied customers across the region, offering an extensive selection of healthy fish, premium supplies, and expert guidance. We remain committed to our founding principles of quality, education, and environmental responsibility.
              </p>
            </div>

            {/* Placeholder Image */}
            <div className={styles.imageColumn}>
              <div className={styles.placeholderImage}>
                <svg
                  viewBox="0 0 400 400"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.imageSvg}
                >
                  {/* Background */}
                  <rect width="400" height="400" fill="#e2e8f0" />

                  {/* Aquarium outline */}
                  <rect x="50" y="80" width="300" height="250" fill="none" stroke="#4a5568" strokeWidth="3" />

                  {/* Water waves */}
                  <path
                    d="M 50 150 Q 100 140 150 150 T 250 150 T 350 150"
                    fill="none"
                    stroke="#718096"
                    strokeWidth="2"
                    opacity="0.5"
                  />
                  <path
                    d="M 50 200 Q 100 190 150 200 T 250 200 T 350 200"
                    fill="none"
                    stroke="#718096"
                    strokeWidth="2"
                    opacity="0.5"
                  />

                  {/* Fish silhouettes */}
                  <ellipse cx="120" cy="180" rx="25" ry="15" fill="#4a5568" opacity="0.7" />
                  <polygon points="95,180 85,175 85,185" fill="#4a5568" opacity="0.7" />

                  <ellipse cx="280" cy="220" rx="30" ry="18" fill="#718096" opacity="0.6" />
                  <polygon points="250,220 235,213 235,227" fill="#718096" opacity="0.6" />

                  {/* Bubbles */}
                  <circle cx="100" cy="120" r="5" fill="#718096" opacity="0.4" />
                  <circle cx="200" cy="110" r="4" fill="#718096" opacity="0.4" />
                  <circle cx="300" cy="130" r="6" fill="#718096" opacity="0.4" />

                  {/* Text */}
                  <text
                    x="200"
                    y="350"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="600"
                    fill="#2d3748"
                  >
                    Aquatic Paradise
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className={styles.missionSection}>
        <div className={styles.container}>
          <div className={styles.missionContent}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.missionStatement}>
              To provide the aquarium community with premium fish, expert guidance, and quality supplies while fostering a passion for aquatic life and promoting responsible fishkeeping practices.
            </p>
            <p className={styles.missionDescription}>
              We believe that every aquarium enthusiast deserves access to healthy, vibrant fish and the knowledge to care for them properly. Our mission extends beyond commerce—we're committed to educating our customers, supporting local conservation efforts, and building a thriving community of aquarium lovers.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Values</h2>
          <div className={styles.valuesGrid}>
            {/* Quality Value */}
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2L15.09 8.26H22L17.55 12.5L18.91 18.76L12 14.5L5.09 18.76L6.45 12.5L2 8.26H8.91L12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Quality</h3>
              <p className={styles.valueDescription}>
                We source only the healthiest fish and premium supplies, ensuring every product meets our rigorous standards.
              </p>
            </div>

            {/* Expertise Value */}
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Expertise</h3>
              <p className={styles.valueDescription}>
                Our team of experienced aquarists is passionate about sharing knowledge and helping customers succeed.
              </p>
            </div>

            {/* Community Value */}
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Community</h3>
              <p className={styles.valueDescription}>
                We foster a welcoming community where aquarium enthusiasts can connect, learn, and share their passion.
              </p>
            </div>

            {/* Responsibility Value */}
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Responsibility</h3>
              <p className={styles.valueDescription}>
                We're committed to ethical practices, environmental stewardship, and the welfare of aquatic life.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
