export const SITE = {
  name: 'Hungryana',
  nameBengali: 'হাংরিয়ানা',
  tagline: 'Eat Hearty, Stay Hungry',
  taglineAlt: 'One Destination, Endless Flavours',
  email: 'hungryana.official@gmail.com',
  phone: '+91 98765 43210',
  address: 'Kirnahar, Birbhum, West Bengal, India',
  locality: 'Kirnahar',
  district: 'Birbhum',
  mapsQuery: 'Kirnahar,Birbhum,West+Bengal',
} as const;

/** Use for `href` on call-to-order buttons and phone links */
export const PHONE_TEL = `tel:${SITE.phone.replace(/\s/g, '')}`;

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Specialities', href: '#specialities' },
  { label: 'Menu', href: '#full-menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
] as const;

export const BUSINESS_HOURS = [
  { day: 'Monday – Thursday', hours: '11:00 AM – 11:00 PM' },
  { day: 'Friday – Saturday', hours: '11:00 AM – 12:00 AM' },
  { day: 'Sunday', hours: '10:00 AM – 11:00 PM' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
] as const;

export const CUISINE_CATEGORIES = [
  'Biryani',
  'Pizza',
  'Indian Cuisine',
  'Chinese Cuisine',
  'Pasta',
  'Fast Food',
  'Beverages',
  'Desserts',
] as const;
