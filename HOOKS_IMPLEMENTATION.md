# Animation Hooks Implementation Summary

## Task 4: Set up animation hooks and utilities

This document summarizes the implementation of three custom React hooks for the Aquarium Store Website.

### Completed Deliverables

#### 1. **useAnimation.ts** - GSAP Animation Hook
**Location**: `src/hooks/useAnimation.ts`

**Features**:
- Support for multiple animation types: `fadeIn`, `scaleIn`, `slideInUp`, `slideInDown`, `slideInLeft`, `slideInRight`
- Staggered animations for multiple elements with configurable timing
- Hover effect animations with automatic state management
- Respects `prefers-reduced-motion` media query for accessibility
- Animation control functions: `animateElements`, `animateStaggered`, `createHoverEffect`, `killAnimations`
- TypeScript support with full type definitions
- GSAP integration with proper cleanup

**Key Functions**:
- `animateElements(selector, animationType, config)` - Animate elements with specified type
- `animateStaggered(selector, animationType, staggerAmount, config)` - Staggered animations for grids
- `createHoverEffect(selector, hoverProps, duration)` - Create hover state animations
- `killAnimations()` - Stop all active animations
- `prefersReducedMotion()` - Check accessibility preference

**Configuration Options**:
- `duration` - Animation duration in seconds
- `delay` - Animation delay in seconds
- `ease` - GSAP easing function
- `stagger` - Stagger timing (number or object with grid support)
- `onComplete` - Callback when animation completes

#### 2. **useLenis.ts** - Lenis Smooth Scrolling Hook
**Location**: `src/hooks/useLenis.ts`

**Features**:
- Lenis smooth scrolling initialization and management
- GSAP ticker integration for optimal performance
- Singleton pattern to prevent multiple instances
- Scroll-to-top functionality with smooth animation
- Scroll position tracking
- Enable/disable scrolling control
- Automatic cleanup on unmount
- Error handling and fallbacks

**Key Functions**:
- `scrollTo(target, options)` - Scroll to specific element or position
- `scrollToTop()` - Smooth scroll to top of page
- `getScrollPosition()` - Get current scroll position
- `setScrollEnabled(enabled)` - Enable/disable scrolling
- `resetScroll()` - Reset scroll to top immediately
- `destroyLenis()` - Destroy Lenis instance (for app cleanup)

**Configuration**:
- Duration: 1.2 seconds
- Easing: Custom exponential easing function
- Touch multiplier: 2x for touch devices
- Integrated with GSAP ticker for smooth animations

#### 3. **useMediaQuery.ts** - Responsive Design Hook
**Location**: `src/hooks/useMediaQuery.ts`

**Features**:
- Check if viewport matches media query
- Predefined breakpoint queries for common screen sizes
- Support for custom media queries
- Server-side rendering safe (prevents hydration mismatch)
- Automatic listener cleanup
- Multiple query support with `useMediaQueries`
- Current breakpoint detection with `useBreakpoint`

**Predefined Breakpoints**:
- `isMobile` - Max width 767px
- `isTablet` - 768px to 1023px
- `isDesktop` - 1024px and above
- `isDesktopLarge` - 1920px and above
- `isMobileOrTablet` - Max width 1023px
- `isTabletOrDesktop` - 768px and above

**Key Functions**:
- `useMediaQuery(query)` - Check single media query
- `useMediaQueries(queries)` - Check multiple queries at once
- `useBreakpoint()` - Get current breakpoint name

**Breakpoint Values**:
- `'mobile'` - < 768px
- `'tablet'` - 768px to 1023px
- `'desktop'` - 1024px to 1919px
- `'desktopLarge'` - 1920px and above
- `null` - Server-side rendering

### Dependencies Added

```json
{
  "gsap": "^3.12.2",
  "lenis": "^1.0.42"
}
```

### File Structure

```
src/hooks/
├── useAnimation.ts          # GSAP animation hook
├── useAnimation.test.ts     # Unit tests for useAnimation
├── useLenis.ts              # Lenis smooth scrolling hook
├── useLenis.test.ts         # Unit tests for useLenis
├── useMediaQuery.ts         # Responsive design hook
└── useMediaQuery.test.ts    # Unit tests for useMediaQuery
```

### Requirements Covered

- **Requirement 9.1**: Smooth scrolling with Lenis library ✓
- **Requirement 9.2**: Smooth scrolling behavior ✓
- **Requirement 9.3**: No interference with page navigation ✓
- **Requirement 9.4**: Consistent smooth scrolling across pages ✓
- **Requirement 10.1**: GSAP animations throughout ✓
- **Requirement 10.2**: Hero section animations ✓
- **Requirement 10.3**: Content section animations with stagger ✓

### Accessibility Features

- **Reduced Motion Support**: All hooks respect `prefers-reduced-motion` media query
- **Server-Side Rendering Safe**: Media query hooks prevent hydration mismatches
- **No Forced Animations**: Animations can be disabled for accessibility

### Usage Examples

#### useAnimation
```typescript
const { animateElements, animateStaggered } = useAnimation();

// Fade in elements
useEffect(() => {
  animateElements('.hero-title', 'fadeIn', { duration: 1 });
}, [animateElements]);

// Staggered animations for grid
useEffect(() => {
  animateStaggered('.product-card', 'slideInUp', 0.5);
}, [animateStaggered]);
```

#### useLenis
```typescript
const { scrollToTop, scrollTo } = useLenis();

// Scroll to top on navigation
useEffect(() => {
  scrollToTop();
}, [pathname, scrollToTop]);

// Scroll to specific element
const handleClick = () => {
  scrollTo('.features-section', { offset: 100 });
};
```

#### useMediaQuery
```typescript
const isMobile = useMediaQuery('isMobile');
const isDesktop = useMediaQuery('isDesktop');

// Conditional rendering
return isMobile ? <MobileNav /> : <DesktopNav />;

// Multiple queries
const { isMobile, isTablet, isDesktop } = useMediaQueries(['isMobile', 'isTablet', 'isDesktop']);

// Current breakpoint
const breakpoint = useBreakpoint();
```

### Testing

Unit tests have been created for all three hooks:
- `useAnimation.test.ts` - Tests animation initialization and control functions
- `useLenis.test.ts` - Tests scroll control and initialization
- `useMediaQuery.test.ts` - Tests media query detection and breakpoint tracking

### Build Status

✓ TypeScript compilation successful
✓ Next.js build successful
✓ All hooks properly typed and integrated
✓ No compilation errors or warnings

### Next Steps

These hooks are ready to be used in:
- Page components for animations on load
- Layout components for smooth scrolling integration
- Responsive components for adaptive layouts
- Hero sections for entrance animations
- Product grids for staggered animations
- Navigation for responsive behavior

The hooks follow React best practices with proper cleanup, memoization, and accessibility considerations.
