import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from './Navigation';

/**
 * Navigation Component Tests
 * Tests for desktop horizontal menu and mobile hamburger menu
 */

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navigation Component', () => {
  const defaultLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Shop', href: '/shop' },
  ];

  it('should render the navigation element', () => {
    render(<Navigation />);
    const nav = screen.getByRole('navigation', { name: /Main navigation/i });
    expect(nav).toBeInTheDocument();
  });

  it('should render all navigation links', () => {
    render(<Navigation links={defaultLinks} />);
    defaultLinks.forEach((link) => {
      const linkElement = screen.getByRole('link', { name: link.label });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', link.href);
    });
  });

  it('should use default links when not provided', () => {
    render(<Navigation />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    const shopLink = screen.getByRole('link', { name: /Shop/i });
    expect(homeLink).toBeInTheDocument();
    expect(shopLink).toBeInTheDocument();
  });

  it('should render hamburger button on mobile', () => {
    render(<Navigation />);
    const hamburger = screen.getByRole('button', { name: /Toggle navigation menu/i });
    expect(hamburger).toBeInTheDocument();
  });

  it('should toggle mobile menu when hamburger is clicked', () => {
    render(<Navigation />);
    const hamburger = screen.getByRole('button', { name: /Toggle navigation menu/i });
    const mobileMenu = screen.getByRole('navigation', { name: /Mobile navigation/i });

    // Initially menu should not be visible
    expect(mobileMenu).toHaveClass('mobileMenu');

    // Click hamburger to open
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    // Click hamburger to close
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should close mobile menu when a link is clicked', () => {
    render(<Navigation links={defaultLinks} />);
    const hamburger = screen.getByRole('button', { name: /Toggle navigation menu/i });

    // Open menu
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    // Click a link
    const aboutLink = screen.getAllByRole('link', { name: /About/i })[1]; // Mobile menu link
    fireEvent.click(aboutLink);

    // Menu should close
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should close mobile menu when close button is clicked', () => {
    render(<Navigation />);
    const hamburger = screen.getByRole('button', { name: /Toggle navigation menu/i });

    // Open menu
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    // Click close button
    const closeButton = screen.getByRole('button', { name: /Close navigation menu/i });
    fireEvent.click(closeButton);

    // Menu should close
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should close mobile menu when overlay is clicked', () => {
    render(<Navigation />);
    const hamburger = screen.getByRole('button', { name: /Toggle navigation menu/i });

    // Open menu
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    // Click overlay
    const overlay = screen.getByRole('presentation', { hidden: true });
    fireEvent.click(overlay);

    // Menu should close
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should have aria-current="page" for active link', () => {
    render(<Navigation links={defaultLinks} />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toHaveAttribute('aria-current', 'page');
  });

  it('should have proper ARIA labels for accessibility', () => {
    render(<Navigation />);
    const nav = screen.getByRole('navigation', { name: /Main navigation/i });
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');

    const hamburger = screen.getByRole('button', { name: /Toggle navigation menu/i });
    expect(hamburger).toHaveAttribute('aria-label', 'Toggle navigation menu');
    expect(hamburger).toHaveAttribute('aria-controls', 'mobile-menu');
  });
});
