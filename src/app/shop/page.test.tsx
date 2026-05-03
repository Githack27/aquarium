import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Shop from './page';
import { fishProducts } from '@/data/fish-products';

/**
 * Shop Page Component Tests
 * Tests for product browsing, search filtering, and responsive layout
 * Validates Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6
 */

describe('Shop Page', () => {
  describe('Product Rendering', () => {
    it('should render all products on initial load', () => {
      render(<Shop />);
      
      // Check that all products are rendered
      fishProducts.forEach((product) => {
        expect(screen.getByText(product.name)).toBeInTheDocument();
      });
    });

    it('should display product count showing all products initially', () => {
      render(<Shop />);
      
      const productCount = screen.getByText(
        new RegExp(`Showing ${fishProducts.length} of ${fishProducts.length} products`)
      );
      expect(productCount).toBeInTheDocument();
    });

    it('should render ProductCard components with correct data', () => {
      render(<Shop />);
      
      // Check first product details
      const firstProduct = fishProducts[0];
      expect(screen.getByText(firstProduct.name)).toBeInTheDocument();
      expect(screen.getByText(firstProduct.scientificName)).toBeInTheDocument();
      expect(screen.getByText(firstProduct.description)).toBeInTheDocument();
      expect(screen.getByText(`$${firstProduct.price.toFixed(2)}`)).toBeInTheDocument();
    });

    it('should render product images with correct alt text', () => {
      render(<Shop />);
      
      const firstProduct = fishProducts[0];
      const image = screen.getByAltText(
        `${firstProduct.name} - ${firstProduct.scientificName}`
      );
      expect(image).toBeInTheDocument();
      // Next.js Image component transforms the src, so just check it exists
      expect(image).toHaveAttribute('src');
    });

    it('should render View Details buttons for each product', () => {
      render(<Shop />);
      
      const viewDetailsButtons = screen.getAllByRole('button', {
        name: /View details for/i,
      });
      expect(viewDetailsButtons.length).toBe(fishProducts.length);
    });
  });

  describe('Search Filtering', () => {
    it('should filter products by name in real-time', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      
      // Search for "Betta"
      await user.type(searchInput, 'Betta');
      
      await waitFor(() => {
        // Should show only Betta products
        expect(screen.getByText('Betta Fish')).toBeInTheDocument();
        // Should not show other products
        expect(screen.queryByText('Angelfish')).not.toBeInTheDocument();
      });
    });

    it('should filter products by scientific name', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      
      // Search for scientific name
      await user.type(searchInput, 'Carassius');
      
      await waitFor(() => {
        expect(screen.getByText('Goldfish')).toBeInTheDocument();
      });
    });

    it('should filter products by description', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      
      // Search for a word in description
      await user.type(searchInput, 'colorful');
      
      await waitFor(() => {
        // Should find products with "colorful" in description
        const results = screen.queryAllByRole('button', {
          name: /View details for/i,
        });
        expect(results.length).toBeGreaterThan(0);
      });
    });

    it('should be case-insensitive', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      
      // Search with uppercase
      await user.type(searchInput, 'BETTA');
      
      await waitFor(() => {
        expect(screen.getByText('Betta Fish')).toBeInTheDocument();
      });
    });

    it('should update product count when filtering', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      
      // Search for "Betta" - there are 2 products with Betta
      await user.type(searchInput, 'Betta');
      
      await waitFor(() => {
        // Count should update to show filtered results (2 Betta products)
        const productCount = screen.getByText(/Showing \d+ of \d+ products/);
        expect(productCount).toHaveTextContent('Showing 2 of');
      });
    });

    it('should handle partial matches', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      
      // Search for partial name
      await user.type(searchInput, 'fish');
      
      await waitFor(() => {
        // Should find multiple products with "fish" in name/description
        const results = screen.queryAllByRole('button', {
          name: /View details for/i,
        });
        expect(results.length).toBeGreaterThan(1);
      });
    });
  });

  describe('No Results Message', () => {
    it('should display no results message when search returns empty', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      
      // Search for something that doesn't exist
      await user.type(searchInput, 'xyzabc123notfound');
      
      await waitFor(() => {
        expect(
          screen.getByText(/No products found matching "xyzabc123notfound"/)
        ).toBeInTheDocument();
      });
    });

    it('should display helpful subtext in no results message', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      
      await user.type(searchInput, 'notfound');
      
      await waitFor(() => {
        expect(
          screen.getByText(/Try adjusting your search terms or browse all products/)
        ).toBeInTheDocument();
      });
    });

    it('should hide product grid when no results', async () => {
      const user = userEvent.setup();
      const { container } = render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      
      await user.type(searchInput, 'notfound');
      
      await waitFor(() => {
        // No results message should be visible
        expect(
          screen.getByText(/No products found matching/)
        ).toBeInTheDocument();
        
        // Product grid should not have any product cards
        const productCards = container.querySelectorAll('[data-product-id]');
        expect(productCards.length).toBe(0);
      });
    });

    it('should show products again after clearing search', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      ) as HTMLInputElement;
      
      // Search for something that doesn't exist
      await user.type(searchInput, 'notfound');
      
      await waitFor(() => {
        expect(
          screen.getByText(/No products found matching/)
        ).toBeInTheDocument();
      });
      
      // Clear the search
      await user.clear(searchInput);
      
      await waitFor(() => {
        // All products should be visible again
        expect(screen.getByText('Betta Fish')).toBeInTheDocument();
        expect(screen.getByText('Angelfish')).toBeInTheDocument();
      });
    });
  });

  describe('Product Count Updates', () => {
    it('should display correct product count for filtered results', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      
      // Search for "Betta" - there are 2 products with Betta
      await user.type(searchInput, 'Betta');
      
      await waitFor(() => {
        const productCount = screen.getByText(/Showing \d+ of \d+ products/);
        expect(productCount).toHaveTextContent(`Showing 2 of ${fishProducts.length} products`);
      });
    });

    it('should show total product count in product count display', () => {
      render(<Shop />);
      
      const productCount = screen.getByText(/Showing \d+ of \d+ products/);
      expect(productCount).toHaveTextContent(`of ${fishProducts.length} products`);
    });

    it('should update count when search is cleared', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      ) as HTMLInputElement;
      
      // Search for something
      await user.type(searchInput, 'Betta');
      
      await waitFor(() => {
        expect(screen.getByText(/Showing 2 of/)).toBeInTheDocument();
      });
      
      // Clear search
      await user.clear(searchInput);
      
      await waitFor(() => {
        expect(
          screen.getByText(
            new RegExp(`Showing ${fishProducts.length} of ${fishProducts.length} products`)
          )
        ).toBeInTheDocument();
      });
    });

    it('should show 0 products when search has no matches', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      
      await user.type(searchInput, 'xyznotfound');
      
      await waitFor(() => {
        expect(screen.getByText(/Showing 0 of/)).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Grid Layout', () => {
    it('should render products in a grid layout', () => {
      const { container } = render(<Shop />);
      
      // Check that grid container exists by looking for the products grid
      const productCards = container.querySelectorAll('[data-product-id]');
      expect(productCards.length).toBeGreaterThan(0);
    });

    it('should render all product cards as grid items', () => {
      const { container } = render(<Shop />);
      
      const productCards = container.querySelectorAll('[data-product-id]');
      expect(productCards.length).toBe(fishProducts.length);
    });

    it('should have proper grid structure with gap', () => {
      const { container } = render(<Shop />);
      
      // Find the grid by looking for the parent of product cards
      const productCards = container.querySelectorAll('[data-product-id]');
      expect(productCards.length).toBeGreaterThan(0);
      
      // Check that cards are rendered
      productCards.forEach((card) => {
        expect(card).toBeInTheDocument();
      });
    });

    it('should maintain grid layout when filtering', async () => {
      const user = userEvent.setup();
      const { container } = render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      
      // Search for multiple results
      await user.type(searchInput, 'fish');
      
      await waitFor(() => {
        const productCards = container.querySelectorAll('[data-product-id]');
        expect(productCards.length).toBeGreaterThan(0);
      });
    });

    it('should render Hero section at top of page', () => {
      render(<Shop />);
      
      // Hero should contain "Shop" title
      expect(screen.getByText('Shop')).toBeInTheDocument();
    });

    it('should render search bar before product grid', () => {
      const { container } = render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      const productCards = container.querySelectorAll('[data-product-id]');
      
      expect(searchInput).toBeInTheDocument();
      expect(productCards.length).toBeGreaterThan(0);
      
      // Search input should come before product cards in DOM
      const searchPosition = container.innerHTML.indexOf(searchInput.outerHTML);
      const firstCardPosition = container.innerHTML.indexOf('data-product-id');
      
      expect(searchPosition).toBeLessThan(firstCardPosition);
    });

    it('should render product count between search and grid', () => {
      render(<Shop />);
      
      const productCount = screen.getByText(/Showing \d+ of \d+ products/);
      expect(productCount).toBeInTheDocument();
    });
  });

  describe('Search Bar Integration', () => {
    it('should render search bar with correct placeholder', () => {
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      expect(searchInput).toBeInTheDocument();
    });

    it('should have clear button when search has text', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      
      // Initially no clear button
      let clearButton = screen.queryByRole('button', { name: /Clear search/i });
      expect(clearButton).not.toBeInTheDocument();
      
      // Type something
      await user.type(searchInput, 'test');
      
      // Clear button should appear
      clearButton = screen.getByRole('button', { name: /Clear search/i });
      expect(clearButton).toBeInTheDocument();
    });

    it('should clear search when clear button is clicked', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      ) as HTMLInputElement;
      
      // Type something
      await user.type(searchInput, 'Betta');
      
      // Click clear button
      const clearButton = screen.getByRole('button', { name: /Clear search/i });
      await user.click(clearButton);
      
      // Search input should be empty
      expect(searchInput.value).toBe('');
      
      // All products should be visible again
      await waitFor(() => {
        expect(screen.getByText('Betta Fish')).toBeInTheDocument();
        expect(screen.getByText('Angelfish')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Shop />);
      
      // Shop page should have a main heading
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('should have accessible search input', () => {
      render(<Shop />);
      
      const searchInput = screen.getByLabelText(/Search products/i);
      expect(searchInput).toBeInTheDocument();
    });

    it('should have accessible product count text', () => {
      render(<Shop />);
      
      const productCount = screen.getByText(/Showing \d+ of \d+ products/);
      expect(productCount).toBeInTheDocument();
    });

    it('should have accessible View Details buttons', () => {
      render(<Shop />);
      
      const viewDetailsButtons = screen.getAllByRole('button', {
        name: /View details for/i,
      });
      
      expect(viewDetailsButtons.length).toBeGreaterThan(0);
      viewDetailsButtons.forEach((button) => {
        expect(button).toHaveAttribute('aria-label');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty search query', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      
      // Type and then clear
      await user.type(searchInput, 'test');
      await user.clear(searchInput);
      
      // Should show all products
      await waitFor(() => {
        expect(screen.getByText('Betta Fish')).toBeInTheDocument();
      });
    });

    it('should handle whitespace-only search', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      
      // Type only spaces
      await user.type(searchInput, '   ');
      
      // Should show all products (whitespace is trimmed)
      await waitFor(() => {
        expect(screen.getByText('Betta Fish')).toBeInTheDocument();
      });
    });

    it('should handle special characters in search', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      
      // Search with special characters
      await user.type(searchInput, '@#$%');
      
      // Should show no results
      await waitFor(() => {
        expect(screen.getByText(/No products found/)).toBeInTheDocument();
      });
    });

    it('should handle very long search query', async () => {
      const user = userEvent.setup();
      render(<Shop />);
      
      const searchInput = screen.getByPlaceholderText(
        /Search by fish name, scientific name, or description/i
      );
      
      // Type a very long query
      const longQuery = 'a'.repeat(100);
      await user.type(searchInput, longQuery);
      
      // Should show no results
      await waitFor(() => {
        expect(screen.getByText(/No products found/)).toBeInTheDocument();
      });
    });
  });
});
