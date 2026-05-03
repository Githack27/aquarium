import { renderHook, act } from '@testing-library/react';
import { useLenis, destroyLenis } from './useLenis';

describe('useLenis', () => {
  afterEach(() => {
    destroyLenis();
  });

  it('should initialize without errors', () => {
    const { result } = renderHook(() => useLenis());

    expect(result.current).toBeDefined();
    expect(result.current.scrollTo).toBeDefined();
    expect(result.current.scrollToTop).toBeDefined();
    expect(result.current.getScrollPosition).toBeDefined();
    expect(result.current.setScrollEnabled).toBeDefined();
    expect(result.current.resetScroll).toBeDefined();
  });

  it('should provide scroll control functions', () => {
    const { result } = renderHook(() => useLenis());

    expect(typeof result.current.scrollTo).toBe('function');
    expect(typeof result.current.scrollToTop).toBe('function');
    expect(typeof result.current.getScrollPosition).toBe('function');
    expect(typeof result.current.setScrollEnabled).toBe('function');
    expect(typeof result.current.resetScroll).toBe('function');
  });

  it('should get scroll position', () => {
    const { result } = renderHook(() => useLenis());

    act(() => {
      const position = result.current.getScrollPosition();
      expect(typeof position).toBe('number');
    });
  });

  it('should handle scroll to top', () => {
    const { result } = renderHook(() => useLenis());

    act(() => {
      result.current.scrollToTop();
    });

    // Should not throw
    expect(result.current).toBeDefined();
  });

  it('should handle enable/disable scrolling', () => {
    const { result } = renderHook(() => useLenis());

    act(() => {
      result.current.setScrollEnabled(false);
      result.current.setScrollEnabled(true);
    });

    // Should not throw
    expect(result.current).toBeDefined();
  });

  it('should handle reset scroll', () => {
    const { result } = renderHook(() => useLenis());

    act(() => {
      result.current.resetScroll();
    });

    // Should not throw
    expect(result.current).toBeDefined();
  });
});
