/**
 * Application constants
 */

/**
 * Responsive design breakpoints (in pixels)
 */
export const BREAKPOINTS = {
  MOBILE: 320,
  MOBILE_LARGE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  DESKTOP_LARGE: 1920,
} as const;

/**
 * Responsive design breakpoint strings for CSS media queries
 */
export const BREAKPOINT_STRINGS = {
  MOBILE: '320px',
  MOBILE_LARGE: '480px',
  TABLET: '768px',
  DESKTOP: '1024px',
  DESKTOP_LARGE: '1920px',
} as const;

/**
 * Animation timing constants (in seconds)
 */
export const ANIMATION_TIMINGS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 1,
  HERO_ANIMATION: 1,
  STAGGER_DELAY: 0.2,
  STAGGER_AMOUNT: 0.5,
} as const;

/**
 * Animation easing functions
 */
export const ANIMATION_EASING = {
  EASE_IN: 'power1.in',
  EASE_OUT: 'power1.out',
  EASE_IN_OUT: 'power1.inOut',
  EASE_IN_QUAD: 'power2.in',
  EASE_OUT_QUAD: 'power2.out',
  EASE_IN_OUT_QUAD: 'power2.inOut',
  EASE_IN_CUBIC: 'power3.in',
  EASE_OUT_CUBIC: 'power3.out',
  EASE_IN_OUT_CUBIC: 'power3.inOut',
  BACK_OUT: 'back.out',
  BACK_IN_OUT: 'back.inOut',
  ELASTIC_OUT: 'elastic.out',
} as const;

/**
 * Color palette constants
 */
export const COLORS = {
  PRIMARY: '#4A5568',
  PRIMARY_LIGHT: '#E2E8F0',
  PRIMARY_MEDIUM: '#718096',
  PRIMARY_DARK: '#2D3748',
  WHITE: '#FFFFFF',
  GRAY: '#F7FAFC',
  BLACK: '#1A202C',
  SUCCESS: '#48BB78',
  ERROR: '#F56565',
  INFO: '#4299E1',
  WARNING: '#ED8936',
} as const;

/**
 * Form validation constants
 */
export const FORM_VALIDATION = {
  MIN_NAME_LENGTH: 2,
  MIN_SUBJECT_LENGTH: 5,
  MIN_MESSAGE_LENGTH: 10,
  MAX_NAME_LENGTH: 100,
  MAX_SUBJECT_LENGTH: 200,
  MAX_MESSAGE_LENGTH: 5000,
} as const;

/**
 * Product constants
 */
export const PRODUCT_CONSTANTS = {
  CATEGORIES: ['Freshwater', 'Saltwater', 'Specialty'] as const,
  CARE_LEVELS: ['Beginner', 'Intermediate', 'Advanced'] as const,
  PRODUCTS_PER_PAGE: 12,
  SEARCH_DEBOUNCE_MS: 300,
} as const;

/**
 * Lenis smooth scrolling configuration
 */
export const LENIS_CONFIG = {
  DURATION: 1.2,
  EASING: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  DIRECTION: 'vertical' as const,
  GESTURE_DIRECTION: 'vertical' as const,
  SMOOTH: true,
  SMOOTH_TOUCH: false,
  TOUCH_MULTIPLIER: 2,
} as const;

/**
 * Page routes
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  GALLERY: '/gallery',
  SHOP: '/shop',
} as const;

/**
 * Page titles
 */
export const PAGE_TITLES = {
  HOME: 'Home',
  ABOUT: 'About Us',
  CONTACT: 'Contact',
  FAQ: 'FAQ',
  GALLERY: 'Gallery',
  SHOP: 'Shop',
} as const;

/**
 * Accessibility constants
 */
export const ACCESSIBILITY = {
  FOCUS_OUTLINE_WIDTH: '2px',
  FOCUS_OUTLINE_COLOR: '#4A5568',
  MIN_TOUCH_TARGET_SIZE: 44,
  MIN_COLOR_CONTRAST_RATIO: 4.5,
} as const;

/**
 * Image constants
 */
export const IMAGE_CONSTANTS = {
  HERO_WIDTH: 1920,
  HERO_HEIGHT: 600,
  PRODUCT_WIDTH: 400,
  PRODUCT_HEIGHT: 400,
  THUMBNAIL_WIDTH: 200,
  THUMBNAIL_HEIGHT: 200,
} as const;

/**
 * Z-index constants for layering
 */
export const Z_INDEX = {
  BACKGROUND: 0,
  CONTENT: 10,
  DROPDOWN: 100,
  STICKY: 200,
  MODAL: 1000,
  TOOLTIP: 1100,
} as const;

/**
 * Success message display duration (in milliseconds)
 */
export const SUCCESS_MESSAGE_DURATION = 5000;

/**
 * Maximum number of products to display
 */
export const MAX_PRODUCTS = 50;

/**
 * Default locale
 */
export const DEFAULT_LOCALE = 'en-US';

/**
 * Default currency
 */
export const DEFAULT_CURRENCY = 'USD';
