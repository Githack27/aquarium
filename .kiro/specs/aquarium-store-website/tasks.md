# Implementation Plan: Modern Aquarium Store Website

## Overview

This implementation plan breaks down the Modern Aquarium Store Website into discrete, sequential coding tasks. Each task builds on previous steps, starting with project setup and configuration, moving through component creation, page implementation, and finishing with animations, styling, and testing. The tasks are organized to enable incremental validation and early error detection.

## Tasks

- [x] 1. Set up project structure, types, and utilities
  - Create TypeScript type definitions for all data models (FishProduct, FAQItem, StoreInfo, Feature, ContactFormData)
  - Create src/types/index.ts with all interfaces
  - Create src/utils/validation.ts with form validation functions (name, email, subject, message)
  - Create src/utils/formatting.ts with utility functions (formatPrice, formatDate, etc.)
  - Create src/utils/constants.ts with app constants (breakpoints, animation timings, etc.)
  - Create src/hooks/ directory structure
  - _Requirements: 18.1, 18.2, 18.3, 18.4, 19.1, 19.2, 19.3_

- [x] 2. Create static data files
  - Create src/data/fish-products.ts with 25+ fish product entries from public/images/ folder
  - Organize fish products by category (Freshwater, Saltwater, Specialty)
  - Create src/data/faq.ts with 8+ FAQ items
  - Create src/data/store-info.ts with store contact and location information
  - Create src/data/features.ts with 3+ feature items for home page
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6_

- [x] 3. Set up styling system and CSS variables
  - Create src/styles/variables.css with CSS custom properties for mono color palette
  - Define color variations (light, medium, dark) and semantic colors
  - Create src/styles/globals.css with global reset and base styles
  - Create src/styles/animations.css with GSAP animation definitions
  - Configure responsive breakpoints (mobile, tablet, desktop)
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 12.1, 12.2_

- [x] 4. Set up animation hooks and utilities
  - Create src/hooks/useAnimation.ts hook for GSAP animations
  - Create src/hooks/useLenis.ts hook for Lenis smooth scrolling integration
  - Create src/hooks/useMediaQuery.ts hook for responsive design queries
  - Implement useAnimation hook with stagger, fade-in, scale animations
  - Implement Lenis initialization and GSAP ticker integration
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 10.1, 10.2, 10.3_

- [x] 5. Create reusable layout components
  - [x] 5.1 Create Header component (components/Header.tsx)
    - Sticky positioning with smooth scroll integration
    - Display store name/logo
    - Integrate Navigation component
    - _Requirements: 1.1, 1.4, 1.5_
  
  - [x] 5.2 Create Navigation component (components/Navigation.tsx)
    - Desktop horizontal menu with all 6 page links
    - Mobile hamburger menu with slide-out drawer
    - Active route indicator styling
    - Smooth page transitions
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
  
  - [x] 5.3 Create Footer component (components/Footer.tsx)
    - Display store contact information from store-info data
    - Quick links to all pages
    - Copyright information
    - _Requirements: 1.1, 1.4_

- [-] 6. Create core section components
  - [x] 6.1 Create Hero component (components/Hero.tsx)
    - Accept title, subtitle, backgroundImage, ctaButton props
    - Render large prominent banner layout
    - Support GSAP animations (fade-in, scale, slide)
    - Responsive scaling on mobile
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [x] 6.2 Create FeatureCard component (components/FeatureCard.tsx)
    - Display icon, title, and description
    - Support animation delay prop
    - Hover state with subtle lift effect
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.6_
  
  - [x] 6.3 Create ProductCard component (components/ProductCard.tsx)
    - Display product image, name, scientific name, description, price
    - Include "View Details" button
    - Hover state: image zoom, shadow elevation
    - Support animation delay for staggered animations
    - _Requirements: 8.2, 8.8, 8.11_
  
  - [x] 6.4 Create FAQCard component (components/FAQCard.tsx)
    - Display question with expand/collapse control
    - Smooth height animation for answer reveal
    - Chevron icon rotation animation
    - Support animation delay
    - _Requirements: 6.2, 6.3, 6.4, 6.8_
  
  - [x] 6.5 Create ContactForm component (components/ContactForm.tsx)
    - Render form fields: name, email, subject, message
    - Real-time validation using validation utilities
    - Display field-level error messages
    - Display success message after submission
    - Submit button with loading state
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 20.1, 20.2, 20.3, 20.4, 20.5, 20.6_
  
  - [x] 6.6 Create SearchBar component (components/SearchBar.tsx)
    - Text input for product search
    - Real-time filtering with debouncing
    - Clear button
    - _Requirements: 8.3, 8.4_
  
  - [x] 6.7 Create FishCard component (components/FishCard.tsx)
    - Display fish image with species name
    - Hover state with visual feedback
    - Click handler for navigation to Shop
    - _Requirements: 7.3, 7.4, 7.5_

- [x] 7. Checkpoint - Verify all components render correctly
  - Ensure all components compile without TypeScript errors
  - Verify component props are properly typed
  - Check that all components export correctly
  - Ask the user if questions arise.

- [~] 8. Create Home page
  - [x] 8.1 Implement Home page layout (src/app/page.tsx)
    - Import Hero, FeatureCard, and CTA components
    - Render Hero section with headline and CTA button
    - Render Features section with 3+ feature cards
    - Render CTA section linking to Shop
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_
  
  - [x] 8.2 Create Home page styles (src/app/page.module.css)
    - Hero section layout and spacing
    - Features section grid layout
    - CTA section styling
    - Responsive design for mobile/tablet/desktop
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_
  
  - [x]* 8.3 Write unit tests for Home page
    - Test Hero section renders with correct content
    - Test Features section displays all features
    - Test CTA button links to Shop page
    - Test responsive layout on different screen sizes
    - _Requirements: 2.1, 3.1_

- [~] 9. Create About page
  - [x] 9.1 Implement About page layout (src/app/about/page.tsx)
    - Render Hero section with "About Us" title
    - Display company background information
    - Display mission statement
    - Display company values/principles
    - Include placeholder image
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_
  
  - [x] 9.2 Create About page styles (src/app/about/page.module.css)
    - Content sections layout
    - Image and text arrangement
    - Responsive design
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_
  
  - [-]* 9.3 Write unit tests for About page
    - Test page renders all content sections
    - Test placeholder image loads
    - Test responsive layout
    - _Requirements: 4.1, 4.2_

- [~] 10. Create Contact page with form
  - [x] 10.1 Implement Contact page layout (src/app/contact/page.tsx)
    - Render Hero section with "Contact Us" title
    - Render ContactForm component
    - Display store contact information (phone, email, address)
    - Display store location information
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10_
  
  - [x] 10.2 Create Contact page styles (src/app/contact/page.module.css)
    - Form layout and spacing
    - Contact information display
    - Responsive design
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_
  
  - [x] 10.3 Write unit tests for Contact page
    - Test form renders all fields
    - Test form validation works
    - Test success message displays
    - Test contact information displays
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [~] 11. Create FAQ page
  - [x] 11.1 Implement FAQ page layout (src/app/faq/page.tsx)
    - Render Hero section with "FAQ" title
    - Render FAQ section with FAQCard components
    - Load FAQ data from faq.ts
    - Manage expand/collapse state
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9_
  
  - [x] 11.2 Create FAQ page styles (src/app/faq/page.module.css)
    - FAQ section layout
    - Card spacing and styling
    - Responsive design
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_
  
  - [~]* 11.3 Write unit tests for FAQ page
    - Test all FAQ items render
    - Test expand/collapse functionality
    - Test chevron icon rotation
    - Test responsive layout
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [~] 12. Create Gallery page
  - [x] 12.1 Implement Gallery page layout (src/app/gallery/page.tsx)
    - Render Hero section with "Gallery" title
    - Organize fish products by category (Freshwater, Saltwater, Specialty)
    - Render FishCard components in grid layout
    - Implement click handler to navigate to Shop page
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9_
  
  - [x] 12.2 Create Gallery page styles (src/app/gallery/page.module.css)
    - Category section layout
    - Grid layout for fish cards
    - Responsive column count (1 col mobile, 2 col tablet, 3+ col desktop)
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_
  
  - [~]* 12.3 Write unit tests for Gallery page
    - Test fish products render by category
    - Test grid layout responsive behavior
    - Test click navigation to Shop
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [~] 13. Create Shop page with search
  - [x] 13.1 Implement Shop page layout (src/app/shop/page.tsx)
    - Render Hero section with "Shop" title
    - Render SearchBar component
    - Render ProductCard components in grid layout
    - Implement real-time search filtering
    - Display "no results" message when search returns empty
    - Display total product count
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 8.10, 8.11_
  
  - [x] 13.2 Create Shop page styles (src/app/shop/page.module.css)
    - Search bar layout and styling
    - Product grid layout
    - Responsive column count
    - No results message styling
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_
  
  - [x] 13.3 Write unit tests for Shop page
    - Test all products render
    - Test search filtering works
    - Test no results message displays
    - Test product count updates
    - Test responsive grid layout
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [x] 14. Checkpoint - Verify all pages render and navigate correctly
  - Ensure all pages compile without errors
  - Verify navigation between pages works
  - Test browser back/forward navigation
  - Check that active route indicator updates
  - Ask the user if questions arise.

- [~] 15. Implement GSAP animations for page load
  - [x] 15.1 Add Hero section animations
    - Implement fade-in animation for title
    - Implement scale animation for hero image
    - Implement slide animation for subtitle
    - Stagger animations with 0.2s delay between elements
    - _Requirements: 2.5, 2.6, 4.5, 10.2, 10.3, 10.4_
  
  - [x] 15.2 Add Features section animations
    - Implement staggered fade-in for feature cards
    - Use grid stagger layout (3 columns)
    - Stagger amount: 0.5s total
    - _Requirements: 3.4, 10.2, 10.3, 10.4_
  
  - [x] 15.3 Add FAQ section animations
    - Implement staggered fade-in for FAQ cards
    - Stagger amount: 0.3s total
    - _Requirements: 6.7, 10.2, 10.3, 10.4_
  
  - [x] 15.4 Add Gallery section animations
    - Implement staggered fade-in for fish cards
    - Use grid stagger layout
    - Stagger amount: 0.4s total
    - _Requirements: 7.6, 10.2, 10.3, 10.4_
  
  - [x] 15.5 Add Shop section animations
    - Implement staggered fade-in for product cards
    - Use grid stagger layout
    - Stagger amount: 0.4s total
    - _Requirements: 8.7, 10.2, 10.3, 10.4_

- [~] 16. Implement hover state animations
  - [x] 16.1 Add ProductCard hover animations
    - Implement scale (1.05) on hover
    - Implement shadow elevation on hover
    - Smooth 0.3s transition
    - _Requirements: 8.8, 10.4, 10.5_
  
  - [x] 16.2 Add FishCard hover animations
    - Implement image zoom on hover
    - Implement shadow elevation on hover
    - Smooth 0.3s transition
    - _Requirements: 7.5, 10.4, 10.5_
  
  - [x] 16.3 Add button hover animations
    - Implement scale and shadow on CTA buttons
    - Implement color transition on form buttons
    - Smooth 0.2s transition
    - _Requirements: 2.8, 10.4, 10.5_

- [~] 17. Implement Lenis smooth scrolling
  - [x] 17.1 Initialize Lenis in layout
    - Create Lenis instance in root layout
    - Configure smooth scrolling parameters
    - Integrate with GSAP ticker
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
  
  - [x] 17.2 Add scroll-to-top on page navigation
    - Implement smooth scroll to top when navigating between pages
    - Reset scroll position on route change
    - _Requirements: 9.5_

- [~] 18. Implement reduced motion support
  - [x] 18.1 Add prefers-reduced-motion media query
    - Create CSS rule for @media (prefers-reduced-motion: reduce)
    - Disable all animations when reduced motion is preferred
    - _Requirements: 10.8, 17.6_
  
  - [x] 18.2 Update GSAP animations for reduced motion
    - Check prefers-reduced-motion in useAnimation hook
    - Skip animations if reduced motion is preferred
    - _Requirements: 10.8, 17.6_

- [x] 19. Checkpoint - Verify all animations work correctly
  - Test Hero animations on page load
  - Test staggered animations for all sections
  - Test hover state animations
  - Test Lenis smooth scrolling
  - Test reduced motion support
  - Verify animations are performant (60 FPS)
  - Ask the user if questions arise.

- [~] 20. Implement responsive design for mobile
  - [x] 20.1 Update Navigation for mobile
    - Implement hamburger menu for screens < 768px
    - Create slide-out drawer menu
    - Add close button to drawer
    - _Requirements: 12.4, 12.5_
  
  - [x] 20.2 Update Hero section for mobile
    - Reduce font sizes for mobile
    - Adjust image height for mobile
    - Stack content vertically on mobile
    - _Requirements: 12.6, 12.7_
  
  - [x] 20.3 Update grid layouts for mobile
    - Product grid: 1 column on mobile, 2 on tablet, 3+ on desktop
    - Feature grid: 1 column on mobile, 2 on tablet, 3 on desktop
    - Gallery grid: 1 column on mobile, 2 on tablet, 3+ on desktop
    - _Requirements: 12.5, 12.6, 12.7_
  
  - [x] 20.4 Update form for mobile
    - Full-width form inputs on mobile
    - Adjust button size for mobile
    - Improve touch targets (min 44px)
    - _Requirements: 12.4, 12.5, 12.6, 12.7_

- [~] 21. Implement image optimization
  - [x] 21.1 Replace placeholder images with Next.js Image component
    - Update Hero sections to use Next.js Image
    - Add width and height props for layout stability
    - Enable lazy loading
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 15.2, 15.3_
  
  - [x] 21.2 Optimize product images
    - Use Next.js Image for all ProductCard images
    - Set responsive sizes for different breakpoints
    - Enable lazy loading for below-fold images
    - _Requirements: 13.3, 13.4, 13.5, 13.6, 15.2, 15.3_
  
  - [x] 21.3 Add alt text to all images
    - Add descriptive alt text to Hero images
    - Add descriptive alt text to product images
    - Add descriptive alt text to feature images
    - _Requirements: 13.5, 17.1, 17.2_

- [~] 22. Implement accessibility features
  - [x] 22.1 Add semantic HTML and ARIA labels
    - Add role="navigation" to Navigation component
    - Add aria-label to form inputs
    - Add aria-expanded to FAQ expand/collapse buttons
    - Add aria-current="page" to active navigation link
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.7_
  
  - [x] 22.2 Implement keyboard navigation
    - Ensure all interactive elements are keyboard accessible
    - Test Tab key navigation through all pages
    - Test Enter/Space to activate buttons
    - Test form submission with keyboard
    - _Requirements: 17.3, 17.4_
  
  - [x] 22.3 Verify color contrast
    - Check text contrast meets WCAG AA (4.5:1)
    - Check interactive element contrast
    - Check error message contrast
    - _Requirements: 11.4, 17.2_
  
  - [x] 22.4 Add focus management
    - Ensure focus visible on all interactive elements
    - Implement focus restoration after modal/drawer close
    - Test focus order is logical
    - _Requirements: 17.3, 17.4_

- [x] 23. Checkpoint - Verify accessibility compliance
  - Run accessibility audit (axe DevTools or similar)
  - Test keyboard navigation on all pages
  - Test screen reader compatibility
  - Verify color contrast
  - Check reduced motion support
  - Ask the user if questions arise.

- [~] 24. Implement form validation and error handling
  - [x] 24.1 Add real-time validation to ContactForm
    - Validate name field (required, min 2 chars)
    - Validate email field (required, valid format)
    - Validate subject field (required, min 5 chars)
    - Validate message field (required, min 10 chars)
    - Display field-level error messages
    - _Requirements: 5.4, 5.5, 20.1, 20.2, 20.3, 20.4, 20.5, 20.6_
  
  - [x] 24.2 Add success message handling
    - Display success message after valid submission
    - Clear form fields after submission
    - Auto-dismiss success message after 5 seconds
    - _Requirements: 5.6_
  
  - [x] 24.3 Add error message styling
    - Style error messages with error color
    - Add error icons to fields
    - Ensure error messages are accessible
    - _Requirements: 20.3, 20.4, 20.5_

- [~] 25. Implement search functionality
  - [x] 25.1 Add real-time search filtering
    - Filter products by name (case-insensitive)
    - Filter products by description
    - Implement debouncing for performance
    - _Requirements: 8.3, 8.4, 8.5_
  
  - [x] 25.2 Add search result feedback
    - Display "no results" message when search returns empty
    - Update product count based on search results
    - Show clear button in search bar
    - _Requirements: 8.5, 8.6_

- [x] 26. Checkpoint - Verify form validation and search work correctly
  - Test form validation with invalid inputs
  - Test form submission with valid inputs
  - Test success message displays and dismisses
  - Test search filtering works
  - Test no results message displays
  - Ask the user if questions arise.

- [~] 27. Optimize performance
  - [x] 27.1 Implement code splitting
    - Verify each page is a separate chunk
    - Check bundle size with next/bundle-analyzer
    - _Requirements: 15.1, 15.2, 15.3, 15.4_
  
  - [x] 27.2 Optimize bundle size
    - Import only needed GSAP modules
    - Remove unused CSS
    - Verify total bundle < 200KB (gzipped)
    - _Requirements: 15.1, 15.2, 15.3, 15.4_
  
  - [x] 27.3 Implement lazy loading for images
    - Verify hero images load eagerly
    - Verify product images load lazily
    - Test image loading performance
    - _Requirements: 15.1, 15.2, 15.3, 15.4_

- [~] 28. Verify browser compatibility
  - [x] 28.1 Test on Chrome
    - Verify all pages load correctly
    - Verify animations work smoothly
    - Verify responsive design works
    - _Requirements: 16.1, 16.2, 16.3, 16.4_
  
  - [x] 28.2 Test on Firefox
    - Verify all pages load correctly
    - Verify animations work smoothly
    - Verify responsive design works
    - _Requirements: 16.1, 16.2, 16.3, 16.4_
  
  - [x] 28.3 Test on Safari
    - Verify all pages load correctly
    - Verify animations work smoothly
    - Verify responsive design works
    - _Requirements: 16.1, 16.2, 16.3, 16.4_
  
  - [x] 28.4 Test on Edge
    - Verify all pages load correctly
    - Verify animations work smoothly
    - Verify responsive design works
    - _Requirements: 16.1, 16.2, 16.3, 16.4_

- [x] 29. Final checkpoint - Ensure all tests pass and requirements met
  - Run all unit tests
  - Run accessibility audit
  - Verify page load performance (< 3 seconds)
  - Verify all requirements are implemented
  - Test all pages on mobile, tablet, and desktop
  - Ask the user if questions arise.

- [~] 30. Code cleanup and documentation
  - [x] 30.1 Add JSDoc comments to all components
    - Document component props
    - Document component behavior
    - Document animation behavior
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6_
  
  - [x] 30.2 Verify TypeScript strict mode compliance
    - Ensure no TypeScript errors
    - Ensure all types are properly defined
    - Ensure no implicit any types
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_
  
  - [x] 30.3 Clean up unused code and imports
    - Remove unused imports
    - Remove unused variables
    - Remove unused CSS
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation and early error detection
- All tasks are sequential and build on previous steps
- No orphaned code - each task integrates into previous steps
- Focus on writing, modifying, and testing code only
- Responsive design is integrated throughout, not a separate phase
- Accessibility is integrated throughout, not a separate phase
- Performance optimization is integrated throughout, not a separate phase

## Implementation Order

The tasks should be executed in the following order:

1. **Foundation** (Tasks 1-4): Set up types, data, styles, and hooks
2. **Components** (Tasks 5-7): Create reusable components
3. **Pages** (Tasks 8-13): Implement all 6 pages
4. **Animations** (Tasks 15-18): Add GSAP and Lenis animations
5. **Responsive Design** (Task 20): Optimize for mobile/tablet
6. **Images** (Task 21): Optimize images with Next.js Image
7. **Accessibility** (Tasks 22-23): Implement accessibility features
8. **Forms & Search** (Tasks 24-26): Implement form validation and search
9. **Performance** (Task 27): Optimize bundle size and performance
10. **Testing** (Tasks 28-29): Test browser compatibility and verify all requirements
11. **Cleanup** (Task 30): Add documentation and clean up code

This order ensures that foundation work is complete before building components, components are complete before building pages, and all features are implemented before optimization and testing.
