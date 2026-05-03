import { StoreInfo } from '@/types';

/**
 * Store information data
 * Contains contact information, location, hours, and social media links
 */

export const storeInfo: StoreInfo = {
  name: 'Aquatic Paradise',
  tagline: 'Your Premier Destination for Aquarium Fish and Supplies',
  phone: '(555) 123-4567',
  email: 'info@aquaticparadise.com',
  address: '1234 Aquarium Lane',
  city: 'Portland',
  state: 'Oregon',
  zipCode: '97201',
  hours: [
    {
      day: 'Monday',
      open: '10:00 AM',
      close: '7:00 PM',
    },
    {
      day: 'Tuesday',
      open: '10:00 AM',
      close: '7:00 PM',
    },
    {
      day: 'Wednesday',
      open: '10:00 AM',
      close: '7:00 PM',
    },
    {
      day: 'Thursday',
      open: '10:00 AM',
      close: '7:00 PM',
    },
    {
      day: 'Friday',
      open: '10:00 AM',
      close: '8:00 PM',
    },
    {
      day: 'Saturday',
      open: '9:00 AM',
      close: '8:00 PM',
    },
    {
      day: 'Sunday',
      open: '11:00 AM',
      close: '6:00 PM',
    },
  ],
  socialMedia: [
    {
      platform: 'Facebook',
      url: 'https://facebook.com/aquaticparadise',
    },
    {
      platform: 'Instagram',
      url: 'https://instagram.com/aquaticparadise',
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/aquaticparadise',
    },
    {
      platform: 'YouTube',
      url: 'https://youtube.com/aquaticparadise',
    },
  ],
};

/**
 * Get store information
 */
export const getStoreInfo = (): StoreInfo => storeInfo;

/**
 * Get store hours for a specific day
 */
export const getStoreHours = (day: string) =>
  storeInfo.hours.find((h) => h.day.toLowerCase() === day.toLowerCase());

/**
 * Get full store address
 */
export const getFullAddress = (): string =>
  `${storeInfo.address}, ${storeInfo.city}, ${storeInfo.state} ${storeInfo.zipCode}`;

/**
 * Get store contact information
 */
export const getContactInfo = () => ({
  phone: storeInfo.phone,
  email: storeInfo.email,
  address: getFullAddress(),
});

/**
 * Check if store is currently open (simplified - doesn't account for current time)
 */
export const isStoreOpen = (day: string): boolean => {
  const hours = getStoreHours(day);
  return hours !== undefined;
};
