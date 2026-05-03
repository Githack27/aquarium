'use client';

import React, { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { FAQCard } from '@/components/FAQCard';
import { getAllFAQItems } from '@/data/faq';
import { useAnimation } from '@/hooks/useAnimation';
import styles from './page.module.css';

/**
 * FAQ Page Component
 *
 * Displays frequently asked questions including:
 * - Hero section with "FAQ" title
 * - FAQ section with expandable FAQCard components
 * - Manage expand/collapse state for each FAQ item
 * - GSAP animations on load
 */
export default function FAQ() {
  const faqItems = getAllFAQItems();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const { animateElements } = useAnimation();

  useEffect(() => {
    // Animate FAQ section with stagger
    setTimeout(() => {
      animateElements(`.${styles.faqGrid} > div`, 'fadeIn', {
        duration: 0.6,
        stagger: {
          amount: 0.3,
          from: 'start',
          axis: 'y',
        },
        ease: 'power2.out',
      });
    }, 100);
  }, [animateElements]);

  /**
   * Handle FAQ item toggle
   */
  const handleToggle = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <Hero
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our store and fish care"
        animationDelay={0}
      />

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqGrid}>
            {faqItems.map((item, index) => (
              <FAQCard
                key={item.id}
                id={item.id}
                question={item.question}
                answer={item.answer}
                category={item.category}
                isOpen={expandedIds.has(item.id)}
                onToggle={handleToggle}
                animationDelay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
