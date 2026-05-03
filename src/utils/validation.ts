/**
 * Form validation utilities for the contact form
 */

import { ContactFormData, FormValidationError, ValidationResult } from '@/types';

/**
 * Validates a name field
 * @param name - The name to validate
 * @returns Error message if invalid, empty string if valid
 */
export const validateName = (name: string): string => {
  if (!name || name.trim().length === 0) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  return '';
};

/**
 * Validates an email field
 * @param email - The email to validate
 * @returns Error message if invalid, empty string if valid
 */
export const validateEmail = (email: string): string => {
  if (!email || email.trim().length === 0) {
    return 'Email is required';
  }

  // RFC 5322 simplified email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }

  return '';
};

/**
 * Validates a subject field
 * @param subject - The subject to validate
 * @returns Error message if invalid, empty string if valid
 */
export const validateSubject = (subject: string): string => {
  if (!subject || subject.trim().length === 0) {
    return 'Subject is required';
  }
  if (subject.trim().length < 5) {
    return 'Subject must be at least 5 characters';
  }
  return '';
};

/**
 * Validates a message field
 * @param message - The message to validate
 * @returns Error message if invalid, empty string if valid
 */
export const validateMessage = (message: string): string => {
  if (!message || message.trim().length === 0) {
    return 'Message is required';
  }
  if (message.trim().length < 10) {
    return 'Message must be at least 10 characters';
  }
  return '';
};

/**
 * Validates the entire contact form
 * @param formData - The form data to validate
 * @returns Validation result with errors array
 */
export const validateContactForm = (formData: ContactFormData): ValidationResult => {
  const errors: FormValidationError[] = [];

  const nameError = validateName(formData.name);
  if (nameError) {
    errors.push({ field: 'name', message: nameError });
  }

  const emailError = validateEmail(formData.email);
  if (emailError) {
    errors.push({ field: 'email', message: emailError });
  }

  const subjectError = validateSubject(formData.subject);
  if (subjectError) {
    errors.push({ field: 'subject', message: subjectError });
  }

  const messageError = validateMessage(formData.message);
  if (messageError) {
    errors.push({ field: 'message', message: messageError });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validates a single field
 * @param field - The field name
 * @param value - The field value
 * @returns Error message if invalid, empty string if valid
 */
export const validateField = (field: keyof ContactFormData, value: string): string => {
  switch (field) {
    case 'name':
      return validateName(value);
    case 'email':
      return validateEmail(value);
    case 'subject':
      return validateSubject(value);
    case 'message':
      return validateMessage(value);
    default:
      return '';
  }
};
