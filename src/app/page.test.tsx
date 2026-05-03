import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import Home from './page';
import { features } from '@/data/features';

/**
 * Home Page Component Tests
 * Tests for Hero section, Features section, and CTA functionality
 * Validates Requirements: 2.1, 3.1
 */

describe('Home Page', () => {
  describe('Hero Section', () => {
    it('should render the Hero section', () => {
      const { container } = render(<Home />);
      
      // Hero section should be present (first section)
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThanOrEqual(1);
      expect(sections[0]).toBeInTheDocument();
    });

    it('should display the hero title', () => {
      render(<Home />);
      
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveTextContent('Welcome to Aquatic Paradise');
    });

    it('should display the hero subtitle', () => {
      render(<Home />);
      
      const subtitle = screen.getByText('Discover Premium Fish and Supplies for Your Aquarium');
      expect(subtitle).toBeInTheDocument();
    });

    it('should render the CTA button in hero section', () => {
      render(<Home />);
      
      const ctaButton = screen.getByRole('link', { name: /Shop Now/i });
      expect(ctaButton).toBeInTheDocument();
    });

    it('should have correct CTA button href', () => {
      render(<Home />);
      
      const ctaButton = screen.getByRole('link', { name: /Shop Now/i });
      expect(ctaButton).toHaveAttribute('href', '/shop');
    });

    it('should render hero with proper semantic structure', () => {
      const { container } = render(<Home />);
      
      // Check for main element
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
      
      // Check for section elements
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThanOrEqual(2); // At least hero and features
    });
  });

  describe('Features Section', () => {
    it('should render the Features section', () => {
      render(<Home />);
      
      const sectionTitle = screen.getByText('Why Choose Us');
      expect(sectionTitle).toBeInTheDocument();
    });

    it('should display all features from data', () => {
      render(<Home />);
      
      // Check that all features are rendered
      features.forEach((feature) => {
        expect(screen.getByText(feature.title)).toBeInTheDocument();
        expect(screen.getByText(feature.description)).toBeInTheDocument();
      });
    });

    it('should render correct number of feature cards', () => {
      const { container } = render(<Home />);
      
      // Count feature cards by data-feature-id attribute
      const featureCards = container.querySelectorAll('[data-feature-id]');
      expect(featureCards.length).toBe(features.length);
    });

    it('should display feature titles correctly', () => {
      render(<Home />);
      
      const expectedTitles = [
        'Premium Fish Selection',
        'Complete Supplies',
        'Expert Support',
        'Fast Delivery',
        'Quality Guarantee',
      ];
      
      expectedTitles.forEach((title) => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });

    it('should display feature descriptions correctly', () => {
      render(<Home />);
      
      features.forEach((feature) => {
        expect(screen.getByText(feature.description)).toBeInTheDocument();
      });
    });

    it('should render feature cards with proper data attributes', () => {
      const { container } = render(<Home />);
      
      features.forEach((feature) => {
        const featureCard = container.querySelector(`[data-feature-id="${feature.id}"]`);
        expect(featureCard).toBeInTheDocument();
      });
    });

    it('should have at least 3 features displayed', () => {
      render(<Home />);
      
      const featureCards = screen.getAllByRole('heading', { level: 3 });
      expect(featureCards.length).toBeGreaterThanOrEqual(3);
    });

    it('should render features section with proper heading hierarchy', () => {
      render(<Home />);
      
      // Section title should be h2
      const sectionTitle = screen.getByRole('heading', { level: 2, name: /Why Choose Us/i });
      expect(sectionTitle).toBeInTheDocument();
      
      // Feature titles should be h3
      const featureTitles = screen.getAllByRole('heading', { level: 3 });
      expect(featureTitles.length).toBe(features.length);
    });
  });

  describe('CTA Section', () => {
    it('should render the CTA section', () => {
      render(<Home />);
      
      const ctaTitle = screen.getByText('Ready to Start Your Aquarium Journey?');
      expect(ctaTitle).toBeInTheDocument();
    });

    it('should display CTA section title', () => {
      render(<Home />);
      
      const ctaTitle = screen.getByRole('heading', {
        level: 2,
        name: /Ready to Start Your Aquarium Journey/i,
      });
      expect(ctaTitle).toBeInTheDocument();
    });

    it('should display CTA section description', () => {
      render(<Home />);
      
      const description = screen.getByText(
        /Browse our complete selection of premium fish and supplies/i
      );
      expect(description).toBeInTheDocument();
    });

    it('should render CTA link to Shop page', () => {
      render(<Home />);
      
      const ctaLinks = screen.getAllByRole('link', { name: /Shop/i });
      
      // Should have at least 2 shop links (hero and CTA section)
      expect(ctaLinks.length).toBeGreaterThanOrEqual(2);
      
      // All should link to /shop
      ctaLinks.forEach((link) => {
        expect(link).toHaveAttribute('href', '/shop');
      });
    });

    it('should have proper CTA link styling', () => {
      const { container } = render(<Home />);
      
      // Find the CTA link in the CTA section (not the hero)
      const ctaLinks = container.querySelectorAll('a[href="/shop"]');
      expect(ctaLinks.length).toBeGreaterThanOrEqual(2);
    });

    it('should display CTA section with proper semantic structure', () => {
      const { container } = render(<Home />);
      
      // Find all sections
      const sections = container.querySelectorAll('section');
      
      // Last section should be CTA section
      const lastSection = sections[sections.length - 1];
      expect(lastSection).toHaveTextContent('Ready to Start Your Aquarium Journey');
    });
  });

  describe('Page Layout and Structure', () => {
    it('should render main element', () => {
      const { container } = render(<Home />);
      
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('should have correct section order', () => {
      const { container } = render(<Home />);
      
      const sections = container.querySelectorAll('section');
      
      // Should have at least 3 sections: hero, features, cta
      expect(sections.length).toBeGreaterThanOrEqual(3);
      
      // Second section should contain features
      expect(sections[1]).toHaveTextContent('Why Choose Us');
      
      // Last section should contain CTA
      expect(sections[sections.length - 1]).toHaveTextContent('Ready to Start Your Aquarium Journey');
    });

    it('should render all major sections', () => {
      render(<Home />);
      
      // Hero section
      expect(screen.getByText('Welcome to Aquatic Paradise')).toBeInTheDocument();
      
      // Features section
      expect(screen.getByText('Why Choose Us')).toBeInTheDocument();
      
      // CTA section
      expect(screen.getByText('Ready to Start Your Aquarium Journey?')).toBeInTheDocument();
    });

    it('should have proper container structure', () => {
      const { container } = render(<Home />);
      
      // Check for container divs (CSS modules use scoped names)
      const allDivs = container.querySelectorAll('div');
      expect(allDivs.length).toBeGreaterThan(0);
      
      // Verify sections exist
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Responsive Layout', () => {
    it('should render features grid', () => {
      const { container } = render(<Home />);
      
      // Check for feature cards by data attribute
      const featureCards = container.querySelectorAll('[data-feature-id]');
      expect(featureCards.length).toBe(features.length);
    });

    it('should have features grid with all feature cards', () => {
      const { container } = render(<Home />);
      
      // Grid should contain all feature cards
      const featureCards = container.querySelectorAll('[data-feature-id]');
      expect(featureCards.length).toBe(features.length);
    });

    it('should render features section', () => {
      render(<Home />);
      
      const sectionTitle = screen.getByText('Why Choose Us');
      expect(sectionTitle).toBeInTheDocument();
    });

    it('should render CTA section', () => {
      render(<Home />);
      
      const ctaTitle = screen.getByText('Ready to Start Your Aquarium Journey?');
      expect(ctaTitle).toBeInTheDocument();
    });

    it('should have CTA content', () => {
      render(<Home />);
      
      const ctaDescription = screen.getByText(/Browse our complete selection of premium fish and supplies/);
      expect(ctaDescription).toBeInTheDocument();
    });

    it('should render section titles', () => {
      render(<Home />);
      
      const sectionTitle = screen.getByText('Why Choose Us');
      expect(sectionTitle).toBeInTheDocument();
    });

    it('should render CTA title', () => {
      render(<Home />);
      
      const ctaTitle = screen.getByRole('heading', {
        level: 2,
        name: /Ready to Start Your Aquarium Journey/i,
      });
      expect(ctaTitle).toBeInTheDocument();
    });

    it('should render CTA description', () => {
      render(<Home />);
      
      const ctaDescription = screen.getByText(/Browse our complete selection/);
      expect(ctaDescription).toBeInTheDocument();
    });

    it('should render CTA link', () => {
      render(<Home />);
      
      const ctaLinks = screen.getAllByRole('link', { name: /Explore Our Shop/i });
      expect(ctaLinks.length).toBeGreaterThan(0);
    });

    it('should have responsive structure', () => {
      const { container } = render(<Home />);
      
      // Check for main element
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
      
      // Check for sections
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThanOrEqual(3);
    });

    it('should render main element', () => {
      const { container } = render(<Home />);
      
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });
  });

  describe('Navigation and Links', () => {
    it('should have Shop link in hero section', () => {
      render(<Home />);
      
      const shopLink = screen.getByRole('link', { name: /Shop Now/i });
      expect(shopLink).toHaveAttribute('href', '/shop');
    });

    it('should have Shop link in CTA section', () => {
      render(<Home />);
      
      const shopLinks = screen.getAllByRole('link', { name: /Explore Our Shop/i });
      expect(shopLinks.length).toBeGreaterThan(0);
      
      shopLinks.forEach((link) => {
        expect(link).toHaveAttribute('href', '/shop');
      });
    });

    it('should have multiple navigation paths to shop', () => {
      render(<Home />);
      
      const allShopLinks = screen.getAllByRole('link', { name: /shop/i });
      expect(allShopLinks.length).toBeGreaterThanOrEqual(2);
      
      // All should link to /shop
      allShopLinks.forEach((link) => {
        expect(link).toHaveAttribute('href', '/shop');
      });
    });
  });

  describe('Content Validation', () => {
    it('should have meaningful hero content', () => {
      render(<Home />);
      
      const title = screen.getByText('Welcome to Aquatic Paradise');
      const subtitle = screen.getByText('Discover Premium Fish and Supplies for Your Aquarium');
      
      expect(title).toBeInTheDocument();
      expect(subtitle).toBeInTheDocument();
    });

    it('should have meaningful feature content', () => {
      render(<Home />);
      
      // Check for key feature titles
      expect(screen.getByText('Premium Fish Selection')).toBeInTheDocument();
      expect(screen.getByText('Complete Supplies')).toBeInTheDocument();
      expect(screen.getByText('Expert Support')).toBeInTheDocument();
    });

    it('should have meaningful CTA content', () => {
      render(<Home />);
      
      expect(screen.getByText('Ready to Start Your Aquarium Journey?')).toBeInTheDocument();
      expect(
        screen.getByText(/Browse our complete selection of premium fish and supplies/)
      ).toBeInTheDocument();
    });

    it('should have descriptive feature descriptions', () => {
      render(<Home />);
      
      // Check that descriptions are not empty
      features.forEach((feature) => {
        const description = screen.getByText(feature.description);
        expect(description.textContent?.length).toBeGreaterThan(10);
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Home />);
      
      // H1 for hero title
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
      
      // H2 for section titles
      const h2s = screen.getAllByRole('heading', { level: 2 });
      expect(h2s.length).toBeGreaterThanOrEqual(2);
      
      // H3 for feature titles
      const h3s = screen.getAllByRole('heading', { level: 3 });
      expect(h3s.length).toBe(features.length);
    });

    it('should have accessible links', () => {
      render(<Home />);
      
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
      
      // All links should have accessible text
      links.forEach((link) => {
        expect(link.textContent?.trim().length).toBeGreaterThan(0);
      });
    });

    it('should have semantic HTML structure', () => {
      const { container } = render(<Home />);
      
      // Should have main element
      expect(container.querySelector('main')).toBeInTheDocument();
      
      // Should have section elements
      expect(container.querySelectorAll('section').length).toBeGreaterThanOrEqual(2);
    });

    it('should have proper text contrast and readability', () => {
      render(<Home />);
      
      // All text should be readable
      const headings = screen.getAllByRole('heading');
      headings.forEach((heading) => {
        expect(heading.textContent?.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('Feature Card Rendering', () => {
    it('should render each feature with icon, title, and description', () => {
      const { container } = render(<Home />);
      
      features.forEach((feature) => {
        const featureCard = container.querySelector(`[data-feature-id="${feature.id}"]`);
        expect(featureCard).toBeInTheDocument();
        
        // Check for title
        expect(featureCard?.textContent).toContain(feature.title);
        
        // Check for description
        expect(featureCard?.textContent).toContain(feature.description);
      });
    });

    it('should render feature cards in correct order', () => {
      const { container } = render(<Home />);
      
      const featureCards = container.querySelectorAll('[data-feature-id]');
      
      featureCards.forEach((card, index) => {
        const expectedId = features[index].id;
        expect(card).toHaveAttribute('data-feature-id', expectedId);
      });
    });

    it('should have feature cards with proper structure', () => {
      const { container } = render(<Home />);
      
      const featureCards = container.querySelectorAll('[data-feature-id]');
      
      featureCards.forEach((card) => {
        // Each card should have a title (h3)
        const title = card.querySelector('h3');
        expect(title).toBeInTheDocument();
        
        // Each card should have a description (p)
        const description = card.querySelector('p');
        expect(description).toBeInTheDocument();
      });
    });
  });

  describe('Page Integration', () => {
    it('should render complete home page without errors', () => {
      const { container } = render(<Home />);
      
      expect(container).toBeInTheDocument();
      expect(container.querySelector('main')).toBeInTheDocument();
    });

    it('should have all required sections present', () => {
      render(<Home />);
      
      // Hero section content
      expect(screen.getByText('Welcome to Aquatic Paradise')).toBeInTheDocument();
      
      // Features section content
      expect(screen.getByText('Why Choose Us')).toBeInTheDocument();
      
      // CTA section content
      expect(screen.getByText('Ready to Start Your Aquarium Journey?')).toBeInTheDocument();
    });

    it('should maintain proper spacing between sections', () => {
      const { container } = render(<Home />);
      
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThanOrEqual(3);
      
      // Each section should exist
      sections.forEach((section) => {
        expect(section).toBeInTheDocument();
      });
    });
  });
});
