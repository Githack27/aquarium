import { renderHook, act } from '@testing-library/react';
import { useAnimation } from './useAnimation';

describe('useAnimation', () => {
  it('should initialize without errors', () => {
    const { result } = renderHook(() => useAnimation());

    expect(result.current).toBeDefined();
    expect(result.current.animateElements).toBeDefined();
    expect(result.current.animateStaggered).toBeDefined();
    expect(result.current.createHoverEffect).toBeDefined();
    expect(result.current.killAnimations).toBeDefined();
    expect(result.current.prefersReducedMotion).toBeDefined();
  });

  it('should detect reduced motion preference', () => {
    const { result } = renderHook(() => useAnimation());

    const prefersReduced = result.current.prefersReducedMotion();
    expect(typeof prefersReduced).toBe('boolean');
  });

  it('should handle empty element selectors gracefully', () => {
    const { result } = renderHook(() => useAnimation());

    act(() => {
      // Should not throw
      result.current.animateElements('.non-existent-element', 'fadeIn');
    });
  });

  it('should provide animation control functions', () => {
    const { result } = renderHook(() => useAnimation());

    expect(typeof result.current.animateElements).toBe('function');
    expect(typeof result.current.animateStaggered).toBe('function');
    expect(typeof result.current.createHoverEffect).toBe('function');
    expect(typeof result.current.killAnimations).toBe('function');
  });
});
