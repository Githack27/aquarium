'use client';

import React, { useState, useCallback } from 'react';
import { ContactFormData } from '@/types';
import { validateContactForm, validateField } from '@/utils/validation';
import styles from './ContactForm.module.css';

/**
 * Props for the ContactForm component
 */
export interface ContactFormProps {
  /** Callback when form is submitted with valid data */
  onSubmit: (data: ContactFormData) => void;
  /** Whether the form is currently submitting */
  isLoading?: boolean;
}

/**
 * ContactForm Component
 *
 * Renders a contact form with:
 * - Form fields: name, email, subject, message
 * - Real-time validation using validation utilities
 * - Display field-level error messages
 * - Display success message after submission
 * - Submit button with loading state
 *
 * @example
 * <ContactForm
 *   onSubmit={(data) => console.log(data)}
 *   isLoading={false}
 * />
 */
export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  /**
   * Handle input change with real-time validation
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const fieldName = name as keyof ContactFormData;

      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }));

      // Real-time validation if field has been touched
      if (touched[fieldName]) {
        const error = validateField(fieldName, value);
        setErrors((prev) => ({
          ...prev,
          [fieldName]: error,
        }));
      }
    },
    [touched]
  );

  /**
   * Handle field blur to mark as touched
   */
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormData;

    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));

    // Validate on blur
    const error = validateField(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  }, []);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validate entire form
      const validation = validateContactForm(formData);

      if (!validation.isValid) {
        // Set all errors
        const errorMap: Record<string, string> = {};
        validation.errors.forEach((error) => {
          errorMap[error.field] = error.message;
        });
        setErrors(errorMap);

        // Mark all fields as touched
        setTouched({
          name: true,
          email: true,
          subject: true,
          message: true,
        });

        return;
      }

      // Form is valid, call onSubmit
      onSubmit({
        ...formData,
        timestamp: new Date(),
      });

      // Show success message
      setShowSuccess(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setErrors({});
      setTouched({});

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    },
    [formData, onSubmit]
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {showSuccess && (
        <div className={styles.successMessage} role="alert">
          <span>✓</span>
          Thank you for your message! We'll get back to you soon.
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Name <span className={styles.required}>*</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${errors.name && touched.name ? styles.error : ''}`}
          placeholder="Your name"
          required
          aria-required="true"
          aria-invalid={!!(errors.name && touched.name)}
          aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
        />
        {errors.name && touched.name && (
          <span className={styles.errorMessage} id="name-error">
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email <span className={styles.required}>*</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${errors.email && touched.email ? styles.error : ''}`}
          placeholder="your@email.com"
          required
          aria-required="true"
          aria-invalid={!!(errors.email && touched.email)}
          aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
        />
        {errors.email && touched.email && (
          <span className={styles.errorMessage} id="email-error">
            {errors.email}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="subject" className={styles.label}>
          Subject <span className={styles.required}>*</span>
        </label>
        <input
          id="subject"
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${errors.subject && touched.subject ? styles.error : ''}`}
          placeholder="What is this about?"
          required
          aria-required="true"
          aria-invalid={!!(errors.subject && touched.subject)}
          aria-describedby={errors.subject && touched.subject ? 'subject-error' : undefined}
        />
        {errors.subject && touched.subject && (
          <span className={styles.errorMessage} id="subject-error">
            {errors.subject}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.label}>
          Message <span className={styles.required}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.textarea} ${errors.message && touched.message ? styles.error : ''}`}
          placeholder="Your message here..."
          rows={5}
          required
          aria-required="true"
          aria-invalid={!!(errors.message && touched.message)}
          aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
        />
        {errors.message && touched.message && (
          <span className={styles.errorMessage} id="message-error">
            {errors.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
