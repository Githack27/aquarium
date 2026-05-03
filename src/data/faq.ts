import { FAQItem } from '@/types';

/**
 * FAQ data
 * Contains 8+ frequently asked questions about the aquarium store and fish care
 */

export const faqItems: FAQItem[] = [
  {
    id: 'faq-001',
    question: 'What is the best beginner fish?',
    answer:
      'Goldfish, Guppies, and Neon Tetras are excellent choices for beginners. They are hardy, colorful, and relatively easy to care for. We recommend starting with a 20-gallon tank and choosing fish that have similar water temperature and pH requirements.',
    category: 'Fish Care',
  },
  {
    id: 'faq-002',
    question: 'How often should I change the water in my aquarium?',
    answer:
      'For most aquariums, we recommend changing 25-30% of the water every 1-2 weeks. This helps maintain water quality and removes waste products. Heavily stocked tanks may need more frequent changes, while lightly stocked tanks may need less frequent changes.',
    category: 'Tank Maintenance',
  },
  {
    id: 'faq-003',
    question: 'Can I keep different types of fish together?',
    answer:
      'Many fish can be kept together in community tanks, but compatibility depends on species, size, temperament, and water requirements. Aggressive fish like Bettas and Lionfish must be kept alone. We recommend researching specific species before combining them.',
    category: 'Fish Care',
  },
  {
    id: 'faq-004',
    question: 'What equipment do I need to set up an aquarium?',
    answer:
      'Essential equipment includes: a tank, filter, heater (for tropical fish), lighting, substrate, decorations, and a thermometer. For saltwater tanks, you may also need a protein skimmer, powerheads, and specialized lighting. We offer all these items in our store.',
    category: 'Tank Setup',
  },
  {
    id: 'faq-005',
    question: 'How long does it take to cycle a new aquarium?',
    answer:
      'The nitrogen cycle typically takes 4-6 weeks to establish in a new tank. During this time, beneficial bacteria colonize the filter and substrate. We recommend using a fishless cycling method or adding hardy fish gradually to avoid ammonia spikes that can harm fish.',
    category: 'Tank Maintenance',
  },
  {
    id: 'faq-006',
    question: 'What is the difference between freshwater and saltwater aquariums?',
    answer:
      'Freshwater aquariums are easier to maintain and less expensive to set up. Saltwater aquariums require more specialized equipment, more frequent maintenance, and more careful water chemistry management. Saltwater fish are often more colorful but more challenging to keep.',
    category: 'Fish Care',
  },
  {
    id: 'faq-007',
    question: 'How do I know if my fish is sick?',
    answer:
      'Signs of illness include: loss of appetite, unusual swimming behavior, visible spots or lesions, torn fins, and lethargy. If you notice these symptoms, isolate the fish in a quarantine tank and consult with an aquarium specialist. Early intervention can prevent disease spread.',
    category: 'Fish Health',
  },
  {
    id: 'faq-008',
    question: 'What should I feed my fish?',
    answer:
      'Most fish require a balanced diet of high-quality pellets or flakes. Some species need specialized diets like herbivore pellets or carnivore food. Live or frozen foods like brine shrimp and bloodworms can supplement their diet. Feed small amounts 1-2 times daily, only what they can eat in a few minutes.',
    category: 'Fish Care',
  },
  {
    id: 'faq-009',
    question: 'Do you offer delivery or shipping?',
    answer:
      'Yes! We offer local delivery for orders over $50 and nationwide shipping for most items. Live fish are shipped with special care and insulation to ensure they arrive healthy. Shipping costs vary based on location and order size. Contact us for a shipping quote.',
    category: 'Store Services',
  },
  {
    id: 'faq-010',
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy on all equipment and supplies in original condition. Live fish can be returned within 7 days if they arrive damaged or deceased. We also offer a 14-day acclimation guarantee on all fish purchases. Please contact us for return authorization.',
    category: 'Store Services',
  },
];

/**
 * Get all FAQ items
 */
export const getAllFAQItems = (): FAQItem[] => faqItems;

/**
 * Get FAQ items by category
 */
export const getFAQItemsByCategory = (category: string): FAQItem[] =>
  faqItems.filter((item) => item.category === category);

/**
 * Get a single FAQ item by ID
 */
export const getFAQItemById = (id: string): FAQItem | undefined =>
  faqItems.find((item) => item.id === id);

/**
 * Search FAQ items by question or answer
 */
export const searchFAQItems = (query: string): FAQItem[] => {
  const lowerQuery = query.toLowerCase();
  return faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(lowerQuery) ||
      item.answer.toLowerCase().includes(lowerQuery)
  );
};
