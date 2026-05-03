'use client';

import React, { useEffect, useRef } from 'react';
import { FAQItem } from '@/types';
import { useAnimation } from '@/hooks/useAnimation';
import styles from './FAQCard.module.css';

/**
 * Props for the FAQCard component
 */
export interface FAQCardProps extends FAQItem {
  /** Whether the FAQ item is currently expanded */
  isOpen: boolean;
  /** Callback when the expand/collapse button is clicked */
  onToggle: (id: string) => void;
  /** Optional animation delay in seconds */
  animationDelay?: number;
}

/**
 * FAQCard Component
 *
 * Displays a single FAQ item with:
 * - Question with expand/collapse control
 * - Smooth height animation for answer reveal
 * - Chevron icon rotation animation
 * - Support for animation delay
 *
 * @example
 * <FAQCard
 *   id="faq-001"
 *   question="What is the best beginner fish?"
 *   answer="Goldfish are excellent for beginners..."
 *   isOpen={false}
 *   onToggle={(id) => console.log(id)}
 *   animationDelay={0.1}
 * />
 */
export const FAQCard: React.FC<FAQCardProps> = ({
  id,
  question,
  answer,
  isOpen,
  onToggle,
  animationDelay = 0,
}) => {
  const answerRef = useRef<HTMLDivElement>(null);
  const { animateElements } = useAnimation();

  useEffect(() => {
    if (answerRef.current) {
      if (isOpen) {
        answerRef.current.style.maxHeight = `${answerRef.current.scrollHeight}px`;
      } else {
        answerRef.current.style.maxHeight = '0px';
      }
    }
  }, [isOpen]);

  useEffect(() => {
    // Animate FAQ card on mount
    animateElements(`[data-faq-id="${id}"]`, 'fadeIn', {
      duration: 0.6,
      delay: animationDelay,
      ease: 'power2.out',
    });
  }, [id, animationDelay, animateElements]);

  const handleToggle = () => {
    onToggle(id);
  };

  return (
    <div
      className={styles.card}
      data-faq-id={id}
      style={{
        animationDelay: `${animationDelay}s`,
      }}
    >
      <button
        className={styles.header}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={`answer-${id}`}
      >
        <h3 className={styles.question}>{question}</h3>
        <span className={`${styles.chevron} ${isOpen ? styles.open : ''}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 8L10 11L13 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        ref={answerRef}
        className={styles.answerContainer}
        id={`answer-${id}`}
        role="region"
      >
        <p className={styles.answer}>{answer}</p>
      </div>
    </div>
  );
};

export default FAQCard;
