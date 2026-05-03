# Technical Design Document: Modern Aquarium Store Website

## Overview

The Modern Aquarium Store Website is a static, multi-page Next.js application showcasing an aquarium store's products and services. The design emphasizes modern aesthetics with smooth animations (GSAP), fluid scrolling (Lenis), and a cohesive mono-color palette. The architecture prioritizes reusable components, responsive design, and accessibility compliance.

## Architecture

### High-Level Architecture

`
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Application                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Layout & Navigation Layer                │   │
│  │  (Header, Navigation, Footer, Layout Wrapper)        │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Page Components Layer                    │   │
│  │  (Home, About, Contact, FAQ, Gallery, Shop)          │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Reusable Components Layer                   │   │
│  │  (Hero, ProductCard, FAQCard, FeatureCard, etc.)     │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Animation & Interaction Layer                │   │
│  │  (GSAP animations, Lenis scrolling, Hover states)    │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            Data & Utilities Layer                    │   │
│  │  (Static data, helpers, constants, types)            │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
`

### Technology Stack

- **Framework**: Next.js 14+ with TypeScript
- **Styling**: CSS Modules with scoped styling
- **Animations**: GSAP (GreenSock Animation Platform)
- **Smooth Scrolling**: Lenis
- **Type Safety**: TypeScript with strict mode
- **Image Optimization**: Next.js Image component
- **Build Tool**: Next.js built-in bundler with code splitting

## Components and Interfaces

### Component Hierarchy

`
App (Root Layout)
├── Header
│   └── Navigation
├── Pages (Dynamic)
│   ├── Home
│   │   ├── Hero
│   │   ├── FeaturesSection
│   │   │   └── FeatureCard (×3)
│   │   └── CTA Section
│   ├── About
│   │   ├── Hero
│   │   ├── CompanyInfo
│   │   └── ValuesSection
│   ├── Contact
│   │   ├── Hero
│   │   ├── ContactForm
│   │   └── StoreInfo
│   ├── FAQ
│   │   ├── Hero
│   │   └── FAQSection
│   │       └── FAQCard (×8+)
│   ├── Gallery
│   │   ├── Hero
│   │   └── CategoryGrid
│   │       └── FishCard (×multiple)
│   └── Shop
│       ├── Hero
│       ├── SearchBar
│       └── ProductGrid
│           └── ProductCard (×multiple)
└── Footer
`

### Core Components

#### 1. Layout Components

**Header Component** (components/Header.tsx)
`	ypescript
interface HeaderProps {
  activeRoute: string;
}

export const Header: React.FC<HeaderProps> = ({ activeRoute }) => {
  // Navigation menu with active state indicator
  // Sticky positioning with smooth scroll integration
  // Mobile hamburger menu support
}
`

**Navigation Component** (components/Navigation.tsx)
`	ypescript
interface NavLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavigationProps {
  links: NavLink[];
  activeRoute: string;
  onNavigate: (href: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ links, activeRoute, onNavigate }) => {
  // Desktop: Horizontal menu
  // Mobile: Hamburger menu with slide-out drawer
  // Active state styling
  // Smooth transitions between pages
}
`

**Footer Component** (components/Footer.tsx)
`	ypescript
interface FooterProps {
  storeInfo: StoreInfo;
}

export const Footer: React.FC<FooterProps> = ({ storeInfo }) => {
  // Store contact information
  // Quick links
  // Social media links (placeholder)
  // Copyright information
}
`

#### 2. Section Components

**Hero Component** (components/Hero.tsx)
`	ypescript
interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaButton?: {
    label: string;
    href: string;
  };
  animationDelay?: number;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  ctaButton,
  animationDelay = 0,
}) => {
  // Large prominent banner
  // GSAP fade-in, scale, and slide animations
  // CTA button with hover state
  // Responsive scaling on mobile
}
`

**FeatureCard Component** (components/FeatureCard.tsx)
`	ypescript
interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureCardProps extends Feature {
  animationDelay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  id,
  icon,
  title,
  description,
  animationDelay = 0,
}) => {
  // Icon display
  // Title and description
  // Staggered animation on scroll
  // Hover state with subtle lift effect
}
`

**ProductCard Component** (components/ProductCard.tsx)
`	ypescript
interface FishProduct {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  price: number;
  category: 'Freshwater' | 'Saltwater' | 'Specialty';
  image: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: FishProduct;
  onViewDetails?: (productId: string) => void;
  animationDelay?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  animationDelay = 0,
}) => {
  // Product image with lazy loading
  // Species name and scientific name
  // Price display
  // Description preview
  // "View Details" / "Add to Cart" button
  // Hover state: image zoom, shadow elevation
  // Staggered animation on page load
}
`

**FAQCard Component** (components/FAQCard.tsx)
`	ypescript
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQCardProps extends FAQItem {
  isOpen: boolean;
  onToggle: (id: string) => void;
  animationDelay?: number;
}

export const FAQCard: React.FC<FAQCardProps> = ({
  id,
  question,
  answer,
  isOpen,
  onToggle,
  animationDelay = 0,
}) => {
  // Question display with expand/collapse control
  // Smooth height animation for answer reveal
  // Chevron icon rotation animation
  // Staggered animation on page load
}
`

**ContactForm Component** (components/ContactForm.tsx)
`	ypescript
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  isLoading?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  // Form fields: name, email, subject, message
  // Real-time validation
  // Error message display
  // Success message display
  // Submit button with loading state
  // Focus management and keyboard navigation
}
`

#### 3. Page Components

**Home Page** (pp/page.tsx)
- Hero section with headline and CTA
- Features section with 3+ feature cards
- Call-to-action section linking to Shop
- Staggered animations on load

**About Page** (pp/about/page.tsx)
- Hero section
- Company background information
- Mission statement
- Company values/principles
- Placeholder image
- GSAP animations on scroll

**Contact Page** (pp/contact/page.tsx)
- Hero section
- Contact form with validation
- Store contact information (phone, email, address)
- Store location information
- Form animations and focus management

**FAQ Page** (pp/faq/page.tsx)
- Hero section
- FAQ section with 8+ expandable questions
- Smooth expand/collapse animations
- Staggered animation on load

**Gallery Page** (pp/gallery/page.tsx)
- Hero section
- Fish products organized by category (Freshwater, Saltwater, Specialty)
- Grid layout with responsive columns
- Hover state on fish images
- Click navigation to Shop page
- Staggered animations on load

**Shop Page** (pp/shop/page.tsx)
- Hero section
- Search bar for filtering products
- Product grid with ProductCards
- Real-time filtering
- "No results" message
- Product count display
- Staggered animations on load

## Data Models

### Fish Product Data Structure

`	ypescript
interface FishProduct {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  price: number;
  category: 'Freshwater' | 'Saltwater' | 'Specialty';
  image: string; // Path to image in public/images/
  inStock: boolean;
  careLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  tankSize: string; // e.g., "20+ gallons"
  temperament: string;
  diet: string;
}
`

**Storage Location**: src/data/fish-products.ts

### FAQ Data Structure

`	ypescript
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQData {
  items: FAQItem[];
}
`

**Storage Location**: src/data/faq.ts

### Store Information Structure

`	ypescript
interface StoreInfo {
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
`

**Storage Location**: src/data/store-info.ts

### Feature Data Structure

`	ypescript
interface Feature {
  id: string;
  icon: string; // Icon name or component identifier
  title: string;
  description: string;
}

interface FeaturesData {
  items: Feature[];
}
`

**Storage Location**: src/data/features.ts

### Contact Form Data Structure

`	ypescript
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp?: Date;
}
`

## Error Handling

### Form Validation

**Contact Form Validation Rules**:
- Name: Required, minimum 2 characters
- Email: Required, valid email format
- Subject: Required, minimum 5 characters
- Message: Required, minimum 10 characters

**Error Display**:
- Field-level error messages below each input
- Clear, actionable error text
- Red accent color for error states
- Error icons for visual clarity

**Success Handling**:
- Success message displayed after valid submission
- Form fields cleared
- Success message auto-dismisses after 5 seconds
- Optional: Email notification to store

### Image Handling

- Graceful fallback for missing images
- Placeholder image for broken image links
- Alt text for all images (accessibility)
- Lazy loading for performance

### Search Functionality

- Empty search results message
- Case-insensitive search
- Search across product name and description
- Real-time filtering with debouncing

## Testing Strategy

### Why Property-Based Testing Does NOT Apply

This feature is primarily UI rendering, animations, and static data management. Property-based testing is inappropriate because:

1. **UI Rendering**: The website is primarily visual components and layout. Testing "for all inputs" doesn't apply to UI rendering.
2. **Animations**: GSAP animations and Lenis smooth scrolling are side-effect operations, not pure functions with testable properties.
3. **Static Data**: The data is pre-defined and deterministic. There's no meaningful input variation to test.
4. **Configuration**: Styling and layout are deterministic - they don't vary meaningfully with input.

### Unit Testing Strategy

**Component Tests** (using Vitest + React Testing Library):

1. **Header/Navigation Component**
   - Renders all navigation links
   - Active route is highlighted correctly
   - Mobile menu toggle works
   - Navigation links navigate to correct pages

2. **Hero Component**
   - Renders title and subtitle
   - CTA button is present and clickable
   - Background image loads correctly
   - Responsive scaling on mobile

3. **ProductCard Component**
   - Displays product information correctly
   - Image loads with correct alt text
   - Price is formatted correctly
   - Hover state applies correct styles
   - "View Details" button is clickable

4. **FAQCard Component**
   - Question is displayed
   - Answer is hidden initially
   - Clicking question expands answer
   - Clicking again collapses answer
   - Chevron icon rotates correctly

5. **ContactForm Component**
   - All form fields render
   - Validation errors display for empty fields
   - Email validation works
   - Form submits with valid data
   - Success message displays after submission
   - Form clears after successful submission

6. **Search Functionality**
   - Search filters products by name
   - Case-insensitive search works
   - Empty results message displays
   - Product count updates correctly

### Integration Tests

1. **Page Navigation**
   - All pages load without errors
   - Navigation between pages works
   - Browser back/forward navigation works
   - Active route indicator updates

2. **Smooth Scrolling (Lenis)**
   - Lenis initializes on page load
   - Smooth scrolling works on all pages
   - Scroll position resets on page navigation
   - No conflicts with animations

3. **GSAP Animations**
   - Hero animations play on page load
   - Staggered animations work correctly
   - Hover animations trigger on interaction
   - Animations complete without errors

4. **Responsive Design**
   - Layout adapts to mobile (320px)
   - Layout adapts to tablet (768px)
   - Layout adapts to desktop (1920px)
   - Images scale appropriately
   - Navigation adapts to mobile

5. **Image Loading**
   - Fish product images load from public/images/
   - Placeholder images load correctly
   - Missing images show fallback
   - Alt text is present for all images

### Accessibility Tests

1. **Keyboard Navigation**
   - Tab through all interactive elements
   - Focus visible on all elements
   - Form submission with keyboard
   - Menu navigation with keyboard

2. **Screen Reader Compatibility**
   - Semantic HTML structure
   - ARIA labels on interactive elements
   - Form labels associated with inputs
   - Image alt text present

3. **Color Contrast**
   - Text meets WCAG AA standard (4.5:1)
   - Interactive elements have sufficient contrast
   - Error messages are distinguishable

4. **Reduced Motion**
   - Animations respect prefers-reduced-motion
   - Content is accessible without animations
   - No animation-dependent functionality

### Performance Tests

1. **Page Load Performance**
   - Pages load within 3 seconds
   - Largest Contentful Paint (LCP) < 2.5s
   - First Input Delay (FID) < 100ms
   - Cumulative Layout Shift (CLS) < 0.1

2. **Bundle Size**
   - Main bundle < 200KB (gzipped)
   - Code splitting for pages
   - Lazy loading for images

3. **Animation Performance**
   - 60 FPS animations
   - No layout thrashing
   - GPU acceleration for transforms

## Styling Approach

### Mono Color Palette

**Primary Color**: Slate Blue (#4A5568)

**Color Variations**:
- **Light** (#E2E8F0): Backgrounds, light accents
- **Medium** (#718096): Secondary text, borders
- **Dark** (#2D3748): Primary text, headings
- **Accent** (#4A5568): Interactive elements, highlights

**Neutral Colors**:
- **White** (#FFFFFF): Primary background
- **Gray** (#F7FAFC): Secondary background
- **Black** (#1A202C): Text, dark elements

**Semantic Colors**:
- **Success** (#48BB78): Form success, confirmations
- **Error** (#F56565): Form errors, warnings
- **Info** (#4299E1): Information messages

### CSS Module Organization

`
src/
├── styles/
│   ├── globals.css          # Global styles, reset, variables
│   ├── variables.css        # CSS custom properties
│   └── animations.css       # GSAP animation definitions
├── components/
│   ├── Header.module.css
│   ├── Navigation.module.css
│   ├── Hero.module.css
│   ├── ProductCard.module.css
│   ├── FAQCard.module.css
│   ├── ContactForm.module.css
│   └── ...
└── app/
    ├── page.module.css      # Home page styles
    ├── about/
    │   └── page.module.css
    ├── contact/
    │   └── page.module.css
    └── ...
`

### Responsive Breakpoints

`	ypescript
const breakpoints = {
  mobile: '320px',
  mobileLarge: '480px',
  tablet: '768px',
  desktop: '1024px',
  desktopLarge: '1920px',
};

// CSS Media Queries
@media (max-width: 767px) { /* Mobile */ }
@media (min-width: 768px) and (max-width: 1023px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
`

### Typography System

`	ypescript
const typography = {
  h1: {
    fontSize: '3rem',      // 48px
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontSize: '2.25rem',   // 36px
    fontWeight: 700,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.875rem',  // 30px
    fontWeight: 600,
    lineHeight: 1.4,
  },
  body: {
    fontSize: '1rem',      // 16px
    fontWeight: 400,
    lineHeight: 1.6,
  },
  small: {
    fontSize: '0.875rem',  // 14px
    fontWeight: 400,
    lineHeight: 1.5,
  },
};
`

### Spacing System

`	ypescript
const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
};
`

## File Structure

`
aquarium-store-website/
├── .kiro/
│   └── specs/
│       └── aquarium-store-website/
│           ├── requirements.md
│           ├── design.md
│           └── tasks.md
├── public/
│   └── images/
│       ├── Angelfish.png
│       ├── Betta Fish.png
│       ├── Blue Tang.png
│       └── ... (25+ fish images)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Home page
│   │   ├── globals.css
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── faq/
│   │   │   └── page.tsx
│   │   ├── gallery/
│   │   │   └── page.tsx
│   │   └── shop/
│   │       └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Header.module.css
│   │   ├── Navigation.tsx
│   │   ├── Navigation.module.css
│   │   ├── Footer.tsx
│   │   ├── Footer.module.css
│   │   ├── Hero.tsx
│   │   ├── Hero.module.css
│   │   ├── FeatureCard.tsx
│   │   ├── FeatureCard.module.css
│   │   ├── ProductCard.tsx
│   │   ├── ProductCard.module.css
│   │   ├── FAQCard.tsx
│   │   ├── FAQCard.module.css
│   │   ├── ContactForm.tsx
│   │   ├── ContactForm.module.css
│   │   ├── SearchBar.tsx
│   │   ├── SearchBar.module.css
│   │   └── FishCard.tsx
│   │       └── FishCard.module.css
│   ├── data/
│   │   ├── fish-products.ts
│   │   ├── faq.ts
│   │   ├── store-info.ts
│   │   └── features.ts
│   ├── hooks/
│   │   ├── useAnimation.ts
│   │   ├── useLenis.ts
│   │   └── useMediaQuery.ts
│   ├── utils/
│   │   ├── validation.ts
│   │   ├── formatting.ts
│   │   └── constants.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── animations.css
│   └── types/
│       └── index.ts
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
`

### Naming Conventions

- **Components**: PascalCase (e.g., ProductCard.tsx)
- **Hooks**: camelCase with use prefix (e.g., useAnimation.ts)
- **Utilities**: camelCase (e.g., alidation.ts)
- **Data files**: camelCase (e.g., ish-products.ts)
- **CSS Modules**: ComponentName.module.css
- **Types/Interfaces**: PascalCase (e.g., FishProduct)
- **Constants**: UPPER_SNAKE_CASE (e.g., MAX_PRODUCT_NAME_LENGTH)

## Performance Considerations

### Image Optimization

1. **Next.js Image Component**
   - Use <Image> component for automatic optimization
   - Specify width and height for layout stability
   - Lazy loading by default
   - Responsive srcset generation

2. **Image Formats**
   - PNG for fish product images (already provided)
   - WebP format for modern browsers (automatic via Next.js)
   - Fallback to PNG for older browsers

3. **Image Sizes**
   - Product images: 400×400px (optimized)
   - Hero images: 1920×600px (optimized)
   - Thumbnail images: 200×200px (optimized)

### Code Splitting

1. **Route-Based Splitting**
   - Each page is a separate chunk
   - Automatic via Next.js App Router
   - Reduces initial bundle size

2. **Component-Based Splitting**
   - Heavy components lazy loaded
   - Use React.lazy() for non-critical components
   - Suspense boundaries for loading states

### Lazy Loading Strategy

1. **Images**
   - All product images lazy loaded
   - Hero images loaded eagerly (above fold)
   - Gallery images lazy loaded

2. **Components**
   - FAQ section lazy loaded (below fold)
   - Gallery grid lazy loaded
   - Non-critical animations lazy loaded

### Bundle Size Optimization

1. **Dependencies**
   - GSAP: ~50KB (gzipped)
   - Lenis: ~15KB (gzipped)
   - React: ~40KB (gzipped, shared)
   - Total target: < 200KB (gzipped)

2. **Tree Shaking**
   - Import only needed GSAP modules
   - Remove unused CSS
   - Minify production builds

3. **Monitoring**
   - Use 
ext/bundle-analyzer to track bundle size
   - Set up CI/CD checks for bundle size limits
   - Monitor Core Web Vitals

## Accessibility Implementation

### ARIA Labels and Roles

`	ypescript
// Navigation
<nav role="navigation" aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

// Form
<form role="form" aria-label="Contact form">
  <label htmlFor="name">Name</label>
  <input id="name" type="text" required aria-required="true" />
</form>

// FAQ
<div role="region" aria-label="Frequently asked questions">
  <button aria-expanded={isOpen} aria-controls={nswer-}>
    Question
  </button>
  <div id={nswer-} hidden={!isOpen}>
    Answer
  </div>
</div>
`

### Keyboard Navigation

1. **Tab Order**
   - Logical tab order through all interactive elements
   - Skip links for main content
   - Focus trap in modals (if used)

2. **Keyboard Shortcuts**
   - Enter/Space to activate buttons
   - Enter to submit forms
   - Escape to close modals
   - Arrow keys for carousel navigation (if used)

### Focus Management

1. **Focus Indicators**
   - Visible focus outline on all interactive elements
   - Minimum 2px outline width
   - High contrast focus color

2. **Focus Restoration**
   - Focus returns to trigger element after modal closes
   - Focus moves to main content after page navigation
   - Focus visible on page load

### Reduced Motion Support

`css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`

## Animation Strategy

### GSAP Animation Patterns

**Hero Section Animations**:
`	ypescript
// Fade-in animation
gsap.from('.hero-title', {
  duration: 1,
  opacity: 0,
  y: 30,
  ease: 'power2.out',
});

// Scale animation
gsap.from('.hero-image', {
  duration: 1.2,
  scale: 0.9,
  opacity: 0,
  ease: 'back.out',
  delay: 0.2,
});

// Staggered animations
gsap.from('.feature-card', {
  duration: 0.8,
  opacity: 0,
  y: 20,
  stagger: 0.2,
  ease: 'power2.out',
});
`

**Hover State Animations**:
`	ypescript
// Product card hover
gsap.to('.product-card', {
  duration: 0.3,
  scale: 1.05,
  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  ease: 'power2.out',
  onMouseEnter: function() {
    gsap.to(this, { scale: 1.05 });
  },
  onMouseLeave: function() {
    gsap.to(this, { scale: 1 });
  },
});
`

**Page Transition Animations**:
`	ypescript
// Fade out current page
gsap.to('.page-content', {
  duration: 0.3,
  opacity: 0,
  ease: 'power2.in',
  onComplete: () => {
    // Navigate to new page
  },
});

// Fade in new page
gsap.from('.page-content', {
  duration: 0.5,
  opacity: 0,
  delay: 0.2,
  ease: 'power2.out',
});
`

### Lenis Smooth Scrolling Integration

`	ypescript
// Initialize Lenis
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
});

// Integrate with GSAP
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
`

### Staggered Content Reveal

`	ypescript
// Stagger animations for multiple elements
gsap.from('.product-card', {
  duration: 0.6,
  opacity: 0,
  y: 30,
  stagger: {
    amount: 0.5,        // Total stagger time
    from: 'start',      // Start from first element
    grid: [3, 4],       // Grid layout (3 cols, 4 rows)
    axis: 'y',          // Stagger along Y axis
  },
  ease: 'power2.out',
});
`

## Summary

This design document provides a comprehensive technical blueprint for the Modern Aquarium Store Website. The architecture emphasizes:

- **Reusable Components**: Modular, composable components for maintainability
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Performance**: Optimized images, code splitting, lazy loading
- **Accessibility**: WCAG AA compliance, keyboard navigation, screen reader support
- **Modern Aesthetics**: GSAP animations, Lenis smooth scrolling, mono-color palette
- **Type Safety**: TypeScript with strict mode for code quality
- **Static Data**: Pre-defined data structures for easy management

The implementation should follow the file structure, naming conventions, and component hierarchy outlined above. Testing should focus on unit tests, integration tests, and accessibility validation rather than property-based testing, which is not applicable to UI rendering and animation-heavy features.
