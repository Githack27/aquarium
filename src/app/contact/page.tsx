'use client';

import React, { useState } from 'react';
import { Hero } from '@/components/Hero';
import { ContactForm } from '@/components/ContactForm';
import { storeInfo, getFullAddress } from '@/data/store-info';
import { ContactFormData } from '@/types';
import styles from './page.module.css';

/**
 * Contact Page Component
 *
 * Displays contact information and contact form including:
 * - Hero section with "Contact Us" title
 * - Contact form with validation
 * - Store contact information (phone, email, address)
 * - Store location information
 * - Business hours
 * - GSAP animations on load
 */
export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle form submission
   */
  const handleFormSubmit = (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate form submission
    console.log('Form submitted:', data);
    // In a real application, this would send data to a backend API
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <Hero
        title="Contact Us"
        subtitle="Get in Touch with Aquatic Paradise"
        animationDelay={0}
      />

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            {/* Contact Form */}
            <div className={styles.formColumn}>
              <h2 className={styles.sectionTitle}>Send us a Message</h2>
              <ContactForm
                onSubmit={handleFormSubmit}
                isLoading={isSubmitting}
              />
            </div>

            {/* Store Information */}
            <div className={styles.infoColumn}>
              {/* Contact Information */}
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Contact Information</h3>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Phone</span>
                  <a href={`tel:${storeInfo.phone}`} className={styles.infoLink}>
                    {storeInfo.phone}
                  </a>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Email</span>
                  <a href={`mailto:${storeInfo.email}`} className={styles.infoLink}>
                    {storeInfo.email}
                  </a>
                </div>
              </div>

              {/* Location Information */}
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Location</h3>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Address</span>
                  <p className={styles.infoText}>{getFullAddress()}</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Business Hours</h3>
                <div className={styles.hoursGrid}>
                  {storeInfo.hours.map((hour) => (
                    <div key={hour.day} className={styles.hourItem}>
                      <span className={styles.dayName}>{hour.day}</span>
                      <span className={styles.hourTime}>
                        {hour.open} - {hour.close}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
