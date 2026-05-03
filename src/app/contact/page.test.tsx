import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Contact from './page';
import { storeInfo, getFullAddress } from '@/data/store-info';

/**
 * Contact Page Component Tests
 * Tests for contact form rendering, validation, success message, and contact information display
 * Validates Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6
 */

describe('Contact Page', () => {
  describe('Form Rendering - All Fields Present', () => {
    it('should render the contact form', () => {
      const { container } = render(<Contact />);
      
      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('should render name input field', () => {
      render(<Contact />);
      
      const nameInput = screen.getByLabelText(/Name/i);
      expect(nameInput).toBeInTheDocument();
      expect(nameInput).toHaveAttribute('type', 'text');
      expect(nameInput).toHaveAttribute('placeholder', 'Your name');
    });

    it('should render email input field', () => {
      render(<Contact />);
      
      const emailInput = screen.getByLabelText(/Email/i);
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('placeholder', 'your@email.com');
    });

    it('should render subject input field', () => {
      render(<Contact />);
      
      const subjectInput = screen.getByLabelText(/Subject/i);
      expect(subjectInput).toBeInTheDocument();
      expect(subjectInput).toHaveAttribute('type', 'text');
      expect(subjectInput).toHaveAttribute('placeholder', 'What is this about?');
    });

    it('should render message textarea field', () => {
      render(<Contact />);
      
      const messageInput = screen.getByLabelText(/Message/i);
      expect(messageInput).toBeInTheDocument();
      expect(messageInput.tagName).toBe('TEXTAREA');
      expect(messageInput).toHaveAttribute('placeholder', 'Your message here...');
    });

    it('should render submit button', () => {
      render(<Contact />);
      
      const submitButton = screen.getByRole('button', { name: /Send Message/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    it('should mark all fields as required', () => {
      render(<Contact />);
      
      const nameInput = screen.getByLabelText(/Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const subjectInput = screen.getByLabelText(/Subject/i);
      const messageInput = screen.getByLabelText(/Message/i);
      
      expect(nameInput).toHaveAttribute('required');
      expect(emailInput).toHaveAttribute('required');
      expect(subjectInput).toHaveAttribute('required');
      expect(messageInput).toHaveAttribute('required');
    });

    it('should display required field indicators', () => {
      render(<Contact />);
      
      // Check for required indicators (asterisks)
      const requiredIndicators = screen.getAllByText('*');
      expect(requiredIndicators.length).toBeGreaterThanOrEqual(4);
    });

    it('should render form with all input fields visible', () => {
      const { container } = render(<Contact />);
      
      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
      
      // Check for all form groups
      const formGroups = form?.querySelectorAll('[class*="formGroup"]');
      expect(formGroups?.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Form Validation - Required Fields', () => {
    it('should show validation error for empty name on blur', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const nameInput = screen.getByLabelText(/Name/i);
      
      // Focus and blur without entering text
      await user.click(nameInput);
      await user.tab();
      
      await waitFor(() => {
        const errorMessage = screen.getByText('Name is required');
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it('should show validation error for empty email on blur', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const emailInput = screen.getByLabelText(/Email/i);
      
      // Focus and blur without entering text
      await user.click(emailInput);
      await user.tab();
      
      await waitFor(() => {
        const errorMessage = screen.getByText('Email is required');
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it('should show validation error for empty subject on blur', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const subjectInput = screen.getByLabelText(/Subject/i);
      
      // Focus and blur without entering text
      await user.click(subjectInput);
      await user.tab();
      
      await waitFor(() => {
        const errorMessage = screen.getByText('Subject is required');
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it('should show validation error for empty message on blur', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const messageInput = screen.getByLabelText(/Message/i);
      
      // Focus and blur without entering text
      await user.click(messageInput);
      await user.tab();
      
      await waitFor(() => {
        const errorMessage = screen.getByText('Message is required');
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it('should show all validation errors on submit with empty form', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const submitButton = screen.getByRole('button', { name: /Send Message/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Subject is required')).toBeInTheDocument();
        expect(screen.getByText('Message is required')).toBeInTheDocument();
      });
    });
  });

  describe('Form Validation - Field Length Requirements', () => {
    it('should show error for name less than 2 characters', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const nameInput = screen.getByLabelText(/Name/i);
      
      await user.type(nameInput, 'A');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
      });
    });

    it('should accept name with 2 or more characters', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const nameInput = screen.getByLabelText(/Name/i);
      
      await user.type(nameInput, 'John');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.queryByText('Name must be at least 2 characters')).not.toBeInTheDocument();
      });
    });

    it('should show error for subject less than 5 characters', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const subjectInput = screen.getByLabelText(/Subject/i);
      
      await user.type(subjectInput, 'Test');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText('Subject must be at least 5 characters')).toBeInTheDocument();
      });
    });

    it('should accept subject with 5 or more characters', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const subjectInput = screen.getByLabelText(/Subject/i);
      
      await user.type(subjectInput, 'Question');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.queryByText('Subject must be at least 5 characters')).not.toBeInTheDocument();
      });
    });

    it('should show error for message less than 10 characters', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const messageInput = screen.getByLabelText(/Message/i);
      
      await user.type(messageInput, 'Short');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument();
      });
    });

    it('should accept message with 10 or more characters', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const messageInput = screen.getByLabelText(/Message/i);
      
      await user.type(messageInput, 'This is a longer message');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.queryByText('Message must be at least 10 characters')).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Validation - Email Format', () => {
    it('should show error for invalid email format', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const emailInput = screen.getByLabelText(/Email/i);
      
      await user.type(emailInput, 'invalidemail');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    it('should show error for email without domain', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const emailInput = screen.getByLabelText(/Email/i);
      
      await user.type(emailInput, 'user@');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    it('should accept valid email format', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const emailInput = screen.getByLabelText(/Email/i);
      
      await user.type(emailInput, 'user@example.com');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
      });
    });

    it('should accept email with subdomain', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const emailInput = screen.getByLabelText(/Email/i);
      
      await user.type(emailInput, 'user@mail.example.com');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Validation - Real-time Validation', () => {
    it('should validate field in real-time after blur', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const nameInput = screen.getByLabelText(/Name/i);
      
      // First blur with empty value
      await user.click(nameInput);
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
      });
      
      // Now type valid value
      await user.type(nameInput, 'John Doe');
      
      await waitFor(() => {
        expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
      });
    });

    it('should clear error when field becomes valid', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      
      const emailInput = screen.getByLabelText(/Email/i);
      
      // Type invalid email
      await user.type(emailInput, 'invalid');
      await user.tab();
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
      
      // Clear and type valid email
      await user.clear(emailInput);
      await user.type(emailInput, 'valid@example.com');
      
      await waitFor(() => {
        expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
      });
    });
  });

  describe('Success Message Display', () => {
    it('should display success message after valid form submission', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Contact />);
      
      // Fill in all fields with valid data
      const nameInput = screen.getByLabelText(/Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const subjectInput = screen.getByLabelText(/Subject/i);
      const messageInput = screen.getByLabelText(/Message/i);
      
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(subjectInput, 'Question about fish');
      await user.type(messageInput, 'I have a question about your fish products');
      
      // Submit form
      const submitButton = screen.getByRole('button', { name: /Send Message/i });
      await user.click(submitButton);
      
      // Check for success message
      await waitFor(() => {
        const successMessage = screen.getByRole('alert');
        expect(successMessage).toBeInTheDocument();
        expect(successMessage).toHaveTextContent("Thank you for your message! We'll get back to you soon.");
      });
    });

    it('should display success message with checkmark icon', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Contact />);
      
      // Fill in all fields
      const nameInput = screen.getByLabelText(/Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const subjectInput = screen.getByLabelText(/Subject/i);
      const messageInput = screen.getByLabelText(/Message/i);
      
      await user.type(nameInput, 'Jane Smith');
      await user.type(emailInput, 'jane@example.com');
      await user.type(subjectInput, 'Product inquiry');
      await user.type(messageInput, 'I would like to know more about your products');
      
      // Submit form
      const submitButton = screen.getByRole('button', { name: /Send Message/i });
      await user.click(submitButton);
      
      // Check for success message with checkmark
      await waitFor(() => {
        const successMessage = screen.getByRole('alert');
        expect(successMessage).toHaveTextContent('✓');
      });
    });

    it('should reset form after successful submission', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Contact />);
      
      // Fill in all fields
      const nameInput = screen.getByLabelText(/Name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
      const subjectInput = screen.getByLabelText(/Subject/i) as HTMLInputElement;
      const messageInput = screen.getByLabelText(/Message/i) as HTMLTextAreaElement;
      
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(subjectInput, 'Question about fish');
      await user.type(messageInput, 'I have a question about your fish products');
      
      // Submit form
      const submitButton = screen.getByRole('button', { name: /Send Message/i });
      await user.click(submitButton);
      
      // Wait for success message
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
      
      // Check that form fields are cleared
      await waitFor(() => {
        expect(nameInput.value).toBe('');
        expect(emailInput.value).toBe('');
        expect(subjectInput.value).toBe('');
        expect(messageInput.value).toBe('');
      });
    });

    it('should not show success message on invalid submission', () => {
      render(<Contact />);
      
      // Submit empty form
      const submitButton = screen.getByRole('button', { name: /Send Message/i });
      submitButton.click();
      
      // Success message should not appear
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Contact Information Display', () => {
    it('should display store phone number', () => {
      render(<Contact />);
      
      const phoneLink = screen.getByRole('link', { name: storeInfo.phone });
      expect(phoneLink).toBeInTheDocument();
      expect(phoneLink).toHaveAttribute('href', `tel:${storeInfo.phone}`);
    });

    it('should display store email', () => {
      render(<Contact />);
      
      const emailLink = screen.getByRole('link', { name: storeInfo.email });
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute('href', `mailto:${storeInfo.email}`);
    });

    it('should display store address', () => {
      render(<Contact />);
      
      const address = getFullAddress();
      expect(screen.getByText(address)).toBeInTheDocument();
    });

    it('should display contact information section title', () => {
      render(<Contact />);
      
      expect(screen.getByText('Contact Information')).toBeInTheDocument();
    });

    it('should display location information section title', () => {
      render(<Contact />);
      
      expect(screen.getByText('Location')).toBeInTheDocument();
    });

    it('should display business hours section title', () => {
      render(<Contact />);
      
      expect(screen.getByText('Business Hours')).toBeInTheDocument();
    });

    it('should display all business hours', () => {
      render(<Contact />);
      
      storeInfo.hours.forEach((hour) => {
        expect(screen.getByText(hour.day)).toBeInTheDocument();
        // Check for the time range - use getAllByText since times repeat
        const timeElements = screen.getAllByText(new RegExp(`${hour.open}.*${hour.close}`));
        expect(timeElements.length).toBeGreaterThan(0);
      });
    });

    it('should have proper labels for contact information', () => {
      const { container } = render(<Contact />);
      
      // Check for Phone label in info section
      const infoLabels = container.querySelectorAll('[class*="infoLabel"]');
      const labelTexts = Array.from(infoLabels).map(el => el.textContent);
      
      expect(labelTexts).toContain('Phone');
      expect(labelTexts).toContain('Email');
      expect(labelTexts).toContain('Address');
    });

    it('should display contact information in organized cards', () => {
      const { container } = render(<Contact />);
      
      // Check for info cards (using class names from CSS modules)
      const infoCards = container.querySelectorAll('[class*="infoCard"]');
      expect(infoCards.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Page Structure and Layout', () => {
    it('should render Hero section with Contact Us title', () => {
      render(<Contact />);
      
      expect(screen.getByText('Contact Us')).toBeInTheDocument();
    });

    it('should render Hero section with subtitle', () => {
      render(<Contact />);
      
      expect(screen.getByText('Get in Touch with Aquatic Paradise')).toBeInTheDocument();
    });

    it('should render main element', () => {
      const { container } = render(<Contact />);
      
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('should render contact section', () => {
      const { container } = render(<Contact />);
      
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThanOrEqual(2);
    });

    it('should display form column with title', () => {
      render(<Contact />);
      
      expect(screen.getByText('Send us a Message')).toBeInTheDocument();
    });

    it('should have proper semantic structure', () => {
      const { container } = render(<Contact />);
      
      // Check for main element
      expect(container.querySelector('main')).toBeInTheDocument();
      
      // Check for sections
      expect(container.querySelectorAll('section').length).toBeGreaterThanOrEqual(2);
      
      // Check for form
      expect(container.querySelector('form')).toBeInTheDocument();
    });
  });

  describe('Form Accessibility', () => {
    it('should have accessible form labels', () => {
      render(<Contact />);
      
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    });

    it('should have aria-required on required fields', () => {
      render(<Contact />);
      
      const nameInput = screen.getByLabelText(/Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const subjectInput = screen.getByLabelText(/Subject/i);
      const messageInput = screen.getByLabelText(/Message/i);
      
      expect(nameInput).toHaveAttribute('aria-required', 'true');
      expect(emailInput).toHaveAttribute('aria-required', 'true');
      expect(subjectInput).toHaveAttribute('aria-required', 'true');
      expect(messageInput).toHaveAttribute('aria-required', 'true');
    });

    it('should have proper heading hierarchy', () => {
      render(<Contact />);
      
      // H1 for page title (in Hero)
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
      
      // H2 for section titles (at least "Send us a Message")
      const h2s = screen.getAllByRole('heading', { level: 2 });
      expect(h2s.length).toBeGreaterThanOrEqual(1);
      
      // H3 for info card titles
      const h3s = screen.getAllByRole('heading', { level: 3 });
      expect(h3s.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Form Submission Behavior', () => {
    it('should have form with novalidate attribute', () => {
      const { container } = render(<Contact />);
      
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('novalidate');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle form submission with valid data', async () => {
      const user = userEvent.setup({ delay: null });
      render(<Contact />);
      
      // Fill in all fields
      const nameInput = screen.getByLabelText(/Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const subjectInput = screen.getByLabelText(/Subject/i);
      const messageInput = screen.getByLabelText(/Message/i);
      
      await user.type(nameInput, 'Test User');
      await user.type(emailInput, 'test@example.com');
      await user.type(subjectInput, 'Test Subject');
      await user.type(messageInput, 'This is a test message');
      
      // Submit form
      const submitButton = screen.getByRole('button', { name: /Send Message/i });
      await user.click(submitButton);
      
      // Success message should appear
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
    });
  });
});
