import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

/**
 * Header Component Tests
 * Tests for sticky header with store name and navigation
 */

describe('Header Component', () => {
  it('should render the header element', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should display the store name', () => {
    render(<Header storeName="Aquatic Paradise" />);
    const logo = screen.getByText('Aquatic Paradise');
    expect(logo).toBeInTheDocument();
  });

  it('should use default store name when not provided', () => {
    render(<Header />);
    const logo = screen.getByText('Aquatic Paradise');
    expect(logo).toBeInTheDocument();
  });

  it('should render the logo as a link to home', () => {
    render(<Header />);
    const logoLink = screen.getByRole('link', { name: /Aquatic Paradise/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('should render the navigation component', () => {
    render(<Header />);
    const nav = screen.getByRole('navigation', { name: /Main navigation/i });
    expect(nav).toBeInTheDocument();
  });

  it('should have sticky positioning class', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('header');
  });

  it('should accept custom store name', () => {
    render(<Header storeName="My Aquarium Store" />);
    const logo = screen.getByText('My Aquarium Store');
    expect(logo).toBeInTheDocument();
  });
});
