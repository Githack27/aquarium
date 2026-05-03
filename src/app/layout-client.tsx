'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLenis } from '@/hooks/useLenis';

/**
 * RootLayoutClient Component
 *
 * Client-side wrapper for root layout that handles:
 * - Lenis smooth scrolling initialization
 * - Scroll-to-top on page navigation
 * - GSAP ticker integration
 *
 * This component is separated from the main layout to allow
 * the layout to remain a server component (for metadata export).
 */
export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { scrollToTop } = useLenis();

  /**
   * Scroll to top when route changes
   */
  useEffect(() => {
    scrollToTop();
  }, [pathname, scrollToTop]);

  return <>{children}</>;
}
