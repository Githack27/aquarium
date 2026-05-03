import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import { StoreInfo } from '@/types';

/**
 * Footer Component Tests
 * Tests for store contact information, quick links, and copyright
 */

const mockStoreInfo: StoreInfo = {
  name: 'Aquatic Paradise',
  tagline: 'Your Premier Destination for Aquarium Fish and Supplies',
  phone: '(555) 123-4567',
  email: 'info@aquaticparadise.com',
  address: '1234 Aquarium Lane',
  city: 'Portland',
  state: 'Oregon',
  zipCode: '97201',
  hours: [
    { day: 'Monday', open: '10:00 AM', close: '7:00 PM' },
    { day: 'Tuesday', open: '10:00 AM', close: '7:00 PM' },
    { day: 'Wednesday', open: '10:00 AM', close: '7:00 PM' },
    { day: 'Thursday', open: '10:00 AM', close: '7:00 PM' },
    { day: 'Friday', open: '10:00 AM', close: '8:00 PM' },
    { day: 'Saturday', open: '9:00 AM', close: '8:00 PM' },
    { day: 'Sunday', open: '11:00 AM', close: '6:00 PM' },
  ],
  socialMedia: [
    { platform: 'Facebook', url: 'https://facebook.com/aquaticparadise' },
    { platform: 'Instagram', url: 'https://instagram.com/aquaticparadise' },
  ],
};

describe('Footer Component', () => {
  it('should render the footer element', () => {
    render(<Footer storeInfo={mockStoreInfo} />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('should display store contact information', () => {
    render(<Footer storeInfo={mockStoreInfo} />);
    expect(screen.getByText(mockStoreInfo.phone)).toBeInTheDocument();
    expect(screen.getByText(mockStoreInfo.email)).toBeInTheDocument();
    expect(screen.getByText(mockStoreInfo.address)).toBeInTheDocument();
  });

  it('should display store address with city, state, and zip', () => {
    render(<Footer storeInfo={mockStoreInfo} />);
    expect(screen.getByText(/Portland, Oregon 97201/)).toBeInTheDocument();
  });

  it('should render phone number as a tel link', () => {
    render(<Footer storeInfo={mockStoreInfo} />);
    const phoneLink = screen.getByRole('link', { name: mockStoreInfo.phone });
    expect(phoneLink).toHaveAttribute('href', `tel:${mockStoreInfo.phone}`);
  });

  it('should render email as a mailto link', () => {
    render(<Footer storeInfo={mockStoreInfo} />);
    const emailLink = screen.getByRole('link', { name: mockStoreInfo.email });
    expect(emailLink).toHaveAttribute('href', `mailto:${mockStoreInfo.email}`);
  });

  it('should display all quick links', () => {
    render(<Footer storeInfo={mockStoreInfo} />);
    const links = ['Home', 'About', 'Gallery', 'Shop', 'FAQ', 'Contact'];
    links.forEach((linkText) => {
      const link = screen.getByRole('link', { name: linkText });
      expect(link).toBeInTheDocument();
    });
  });

  it('should have correct href for quick links', () => {
    render(<Footer storeInfo={mockStoreInfo} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Shop' })).toHaveAttribute('href', '/shop');
  });

  it('should display social media links', () => {
    render(<Footer storeInfo={mockStoreInfo} />);
    mockStoreInfo.socialMedia?.forEach((social) => {
      const link = screen.getByRole('link', { name: new RegExp(social.platform) });
      expect(link).toHaveAttribute('href', social.url);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('should display store hours', () => {
    render(<Footer storeInfo={mockStoreInfo} />);
    expect(screen.getByText(/Monday:/)).toBeInTheDocument();
    expect(screen.getByText(/10:00 AM - 7:00 PM/)).toBeInTheDocument();
    expect(screen.getByText(/Saturday:/)).toBeInTheDocument();
    expect(screen.getByText(/9:00 AM - 8:00 PM/)).toBeInTheDocument();
  });

  it('should display copyright information', () => {
    render(<Footer storeInfo={mockStoreInfo} />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockStoreInfo.name))).toBeInTheDocument();
  });

  it('should have footer navigation with proper aria-label', () => {
    render(<Footer storeInfo={mockStoreInfo} />);
    const nav = screen.getByRole('navigation', { name: /Footer navigation/i });
    expect(nav).toBeInTheDocument();
  });

  it('should handle missing social media gracefully', () => {
    const storeInfoNoSocial = { ...mockStoreInfo, socialMedia: undefined };
    render(<Footer storeInfo={storeInfoNoSocial} />);
    // Should not throw and should render without social section
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('should have proper semantic HTML structure', () => {
    const { container } = render(<Footer storeInfo={mockStoreInfo} />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveAttribute('role', 'contentinfo');
  });
});
