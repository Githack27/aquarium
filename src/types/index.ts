/**
 * Type definitions for the Aquarium Store Website
 * Includes all data models and interfaces used throughout the application
 */

/**
 * Fish product data model
 */
export interface FishProduct {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  price: number;
  category: 'Freshwater' | 'Saltwater' | 'Specialty';
  image: string;
  inStock: boolean;
  careLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  tankSize: string;
  temperament: string;
  diet: string;
}

/**
 * FAQ item data model
 */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

/**
 * Store information data model
 */
export interface StoreInfo {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  hours: {
    day: string;
    open: string;
    close: string;
  }[];
  socialMedia?: {
    platform: string;
    url: string;
  }[];
}

/**
 * Feature item data model for home page
 */
export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

/**
 * Contact form data model
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp?: Date;
}

/**
 * Form validation error object
 */
export interface FormValidationError {
  field: keyof ContactFormData;
  message: string;
}

/**
 * Form validation result
 */
export interface ValidationResult {
  isValid: boolean;
  errors: FormValidationError[];
}
