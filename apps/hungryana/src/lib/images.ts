/** Curated Unsplash food photography — production CDN URLs */
export const IMAGES = {
  hero: [
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1920&q=80',
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80',
  ],
  biryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
  butterChicken: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
  hakkaNoodles: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80',
  chowmein: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
  mughlai: 'https://images.unsplash.com/photo-1588166524941-3bf61a837340?w=800&q=80',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
  mocktail: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80',
  dessert: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
  interior: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  indian: 'https://images.unsplash.com/photo-1588166524941-3bf61a837340?w=800&q=80',
  chinese: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80',
  about: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
} as const;

export const SPECIALITIES = [
  {
    title: 'Hungryana Special Chicken Sizzler',
    description: 'Grilled chicken, sautéed veggies, and fries on a smoking plate.',
    image: IMAGES.mughlai,
  },
  {
    title: 'Chicken Biryani',
    description: 'Aromatic basmati with chicken, aloo, and egg — our biryani station favourite.',
    image: IMAGES.biryani,
  },
  {
    title: 'Chicken Butter Masala',
    description: 'Creamy tomato gravy with tender chicken — a timeless Indian classic.',
    image: IMAGES.butterChicken,
  },
  {
    title: 'Cheese Overloaded Pizza',
    description: 'Chicken loaded with extra mozzarella on a hand-tossed crust.',
    image: IMAGES.pizza,
  },
  {
    title: 'Hakka Noodles & Fried Rice',
    description: 'Wok-tossed Indo-Chinese favourites with bold, smoky flavours.',
    image: IMAGES.hakkaNoodles,
  },
  {
    title: 'Hungryana Special Lassi',
    description: 'Signature lassi with coconut, banana, kaju, and kismiss.',
    image: IMAGES.mocktail,
  },
] as const;

export const MENU_CATEGORIES = [
  {
    emoji: '🍛',
    title: 'Biryani',
    description: 'Aromatic dum biryani, veg biryani, and royal family platters.',
    image: IMAGES.biryani,
    href: '#full-menu',
  },
  {
    emoji: '🍕',
    title: 'Pizza',
    description: 'Wood-fired classics, cheese burst specials, and gourmet toppings.',
    image: IMAGES.pizza,
    href: '#full-menu',
  },
  {
    emoji: '🍜',
    title: 'Chinese',
    description: 'Hakka noodles, manchurian, fried rice, and sizzling starters.',
    image: IMAGES.chinese,
    href: '#full-menu',
  },
  {
    emoji: '🍲',
    title: 'Indian',
    description: 'Mughlai curries, tandoor, breads, and regional favourites from across India.',
    image: IMAGES.mughlai,
    href: '#full-menu',
  },
  {
    emoji: '🍝',
    title: 'Pasta',
    description: 'White sauce, red sauce, and pesto pasta made fresh to order.',
    image: IMAGES.pasta,
    href: '#full-menu',
  },
  {
    emoji: '🍜',
    title: 'Fast Food',
    description: 'Chowmein, fried rice, egg rolls, and street-style favourites.',
    image: IMAGES.chowmein,
    href: '#full-menu',
  },
  {
    emoji: '🥤',
    title: 'Beverages',
    description: 'Mocktails, shakes, fresh juices, and premium hot beverages.',
    image: IMAGES.mocktail,
    href: '#full-menu',
  },
  {
    emoji: '🍰',
    title: 'Desserts',
    description: 'Cakes, ice creams, kulfi, and sweet endings to every meal.',
    image: IMAGES.dessert,
    href: '#full-menu',
  },
] as const;

export const WHY_CHOOSE = [
  { title: 'Fresh Ingredients', description: 'Sourced daily from trusted local suppliers.' },
  { title: 'Experienced Chefs', description: 'Culinary experts crafting every dish with passion.' },
  { title: 'Multi-Cuisine Options', description: 'Eight cuisines under one roof for every craving.' },
  { title: 'Hygienic Kitchen', description: 'Strict food safety standards at every step.' },
  { title: 'Quick Service', description: 'Fast, attentive service without compromising quality.' },
  { title: 'Family Friendly Ambience', description: 'Warm, welcoming space for all ages.' },
] as const;

export const GALLERY_ITEMS = [
  { src: IMAGES.biryani, alt: 'Royal Dum Biryani served in handi', category: 'Biryani' },
  { src: IMAGES.pizza, alt: 'Cheese burst pizza fresh from the oven', category: 'Pizza' },
  { src: IMAGES.mughlai, alt: 'Mughlai butter chicken with naan', category: 'Indian' },
  { src: IMAGES.chinese, alt: 'Hakka noodles and Chinese stir fry', category: 'Chinese' },
  { src: IMAGES.pasta, alt: 'Creamy white sauce pasta', category: 'Pasta' },
  { src: IMAGES.interior, alt: 'Hungryana restaurant interior dining area', category: 'Interior' },
  { src: IMAGES.butterChicken, alt: 'Rich Mughlai curry platter', category: 'Indian' },
  { src: IMAGES.mocktail, alt: 'Colourful mocktails and beverages', category: 'Beverages' },
  { src: IMAGES.chowmein, alt: 'Chowmein and Indo-Chinese fast food', category: 'Fast Food' },
] as const;
