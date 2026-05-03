import { renderHook } from '@testing-library/react';
import { useMediaQuery, useMediaQueries, useBreakpoint, MEDIA_QUERIES } from './useMediaQuery';

describe('useMediaQuery', () => {
  it('should initialize with predefined breakpoint', () => {
    const { result } = renderHook(() => useMediaQuery('isMobile'));

    expect(typeof result.current).toBe('boolean');
  });

  it('should support custom media queries', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 1920px)'));

    expect(typeof result.current).toBe('boolean');
  });

  it('should return false on server-side initially', () => {
    const { result } = renderHook(() => useMediaQuery('isMobile'));

    // Initially false to prevent hydration mismatch
    expect(result.current).toBe(false);
  });

  it('should have predefined media queries', () => {
    expect(MEDIA_QUERIES.isMobile).toBeDefined();
    expect(MEDIA_QUERIES.isTablet).toBeDefined();
    expect(MEDIA_QUERIES.isDesktop).toBeDefined();
    expect(MEDIA_QUERIES.isDesktopLarge).toBeDefined();
    expect(MEDIA_QUERIES.isMobileOrTablet).toBeDefined();
    expect(MEDIA_QUERIES.isTabletOrDesktop).toBeDefined();
  });
});

describe('useMediaQueries', () => {
  it('should return multiple media query results', () => {
    const { result } = renderHook(() => useMediaQueries(['isMobile', 'isTablet', 'isDesktop']));

    expect(result.current).toBeDefined();
    expect(typeof result.current.isMobile).toBe('boolean');
    expect(typeof result.current.isTablet).toBe('boolean');
    expect(typeof result.current.isDesktop).toBe('boolean');
  });

  it('should support custom queries in array', () => {
    const { result } = renderHook(() => useMediaQueries(['isMobile', '(min-width: 1920px)']));

    expect(result.current).toBeDefined();
    expect(typeof result.current.isMobile).toBe('boolean');
  });
});

describe('useBreakpoint', () => {
  it('should return current breakpoint', () => {
    const { result } = renderHook(() => useBreakpoint());

    // Initially null on server-side
    expect(result.current === null || typeof result.current === 'string').toBe(true);
  });

  it('should return valid breakpoint values', () => {
    const { result } = renderHook(() => useBreakpoint());

    const validBreakpoints = ['mobile', 'tablet', 'desktop', 'desktopLarge', null];
    expect(validBreakpoints).toContain(result.current);
  });
});
