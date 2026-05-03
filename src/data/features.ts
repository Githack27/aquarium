import { Feature } from '@/types';

/**
 * Features data
 * Contains 3+ key features of the aquarium store for the home page
 */

export const features: Feature[] = [
  {
    id: 'feature-001',
    icon: 'fish',
    title: 'Premium Fish Selection',
    description:
      'Curated collection of 25+ freshwater, saltwater, and specialty fish species. All fish are healthy, well-acclimated, and backed by our quality guarantee.',
  },
  {
    id: 'feature-002',
    icon: 'package',
    title: 'Complete Supplies',
    description:
      'Everything you need for your aquarium including tanks, filters, heaters, lighting, decorations, and specialized equipment for both beginners and experts.',
  },
  {
    id: 'feature-003',
    icon: 'support',
    title: 'Expert Support',
    description:
      'Our knowledgeable staff provides personalized advice on fish care, tank setup, and maintenance. We offer free consultations to help you succeed.',
  },
  {
    id: 'feature-004',
    icon: 'delivery',
    title: 'Fast Delivery',
    description:
      'Local delivery available for orders over $50, and nationwide shipping with special care packaging for live fish. Same-day pickup available.',
  },
  {
    id: 'feature-005',
    icon: 'guarantee',
    title: 'Quality Guarantee',
    description:
      'All fish come with a 14-day acclimation guarantee. If your fish doesn\'t thrive, we\'ll replace it free of charge within the guarantee period.',
  },
];

/**
 * Get all features
 */
export const getAllFeatures = (): Feature[] => features;

/**
 * Get a single feature by ID
 */
export const getFeatureById = (id: string): Feature | undefined =>
  features.find((feature) => feature.id === id);

/**
 * Get features by icon type
 */
export const getFeaturesByIcon = (icon: string): Feature[] =>
  features.filter((feature) => feature.icon === icon);
