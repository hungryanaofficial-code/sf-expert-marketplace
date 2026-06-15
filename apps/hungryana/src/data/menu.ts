export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  featured?: boolean;
}

export interface MenuSubsection {
  title: string;
  items: MenuItem[];
}

export interface MenuSection {
  id: string;
  title: string;
  emoji: string;
  subsections: MenuSubsection[];
}

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: 'soups-starters',
    title: 'Soups & Starters',
    emoji: '🥣',
    subsections: [
      {
        title: 'Soups',
        items: [
          { name: 'Classic Tomato Soup', price: '₹60' },
          { name: 'Sweet Corn Soup (Veg/Non-Veg)', price: '₹100' },
        ],
      },
      {
        title: 'Indo-Chinese Appetizers',
        items: [
          { name: 'Chilli Chicken (Dry / Gravy)', price: '₹120' },
          { name: 'Chilli Paneer (Dry / Gravy)', price: '₹120' },
          { name: 'Hot Garlic Chicken', price: '₹150' },
          { name: 'Honey Chicken (Crispy & Glazed)', price: '₹150' },
        ],
      },
    ],
  },
  {
    id: 'signatures',
    title: 'The Signatures',
    emoji: '⭐',
    subsections: [
      {
        title: "Chef's Special",
        items: [
          {
            name: 'Hungryana Special Chicken Sizzler',
            price: '₹200',
            description: 'Grilled chicken, sautéed veggies, and fries on a smoking plate',
            featured: true,
          },
        ],
      },
      {
        title: 'The Biryani Station',
        items: [
          {
            name: 'Chicken Biryani',
            price: '₹130',
            description: '1pc Chicken, 1pc Aloo, 1pc Egg',
          },
          {
            name: 'Mutton Biryani',
            price: '₹200',
            description: '1pc Mutton, 1pc Aloo, 1pc Egg',
          },
        ],
      },
    ],
  },
  {
    id: 'indian-main',
    title: 'Indian Main Course',
    emoji: '🍲',
    subsections: [
      {
        title: 'Chicken Specialties',
        items: [
          { name: "Chicken Bharta (Chef's Choice)", price: '₹200' },
          { name: 'Chicken Butter Masala', price: '₹200' },
          { name: 'Kadai Chicken (4 pcs)', price: '₹200' },
          { name: 'Tariwala Chicken (4 pcs - Home style)', price: '₹210' },
          {
            name: 'Chicken Dakbanglow (Heritage recipe with Egg)',
            price: '₹220',
          },
          { name: 'Chicken Kosha (4 pcs - Spicy semi-dry)', price: '₹180' },
        ],
      },
    ],
  },
  {
    id: 'pizza-pasta',
    title: 'Pizza & Pasta',
    emoji: '🍕',
    subsections: [
      {
        title: 'Hand-Tossed Pizzas',
        items: [
          { name: 'Margherita (Classic Cheese)', price: '₹100' },
          { name: 'Farmhouse (Fresh Veggies & Paneer)', price: '₹120' },
          { name: 'Peri-Peri Pizza (Spicy Kick)', price: 'Veg ₹130 / Chk ₹150' },
          { name: 'Chicken Feast (Loaded with Chicken)', price: '₹180' },
          { name: 'Cheese Overloaded (Chicken + Extra Mozzarella)', price: '₹200' },
        ],
      },
      {
        title: 'Italian Pasta',
        items: [
          { name: 'Veg Pasta (Red / White Sauce)', price: '₹80' },
          { name: 'Chicken Pasta (Red / White Sauce)', price: '₹100' },
        ],
      },
    ],
  },
  {
    id: 'wok-rolls',
    title: 'Wok & Rolls',
    emoji: '🍜',
    subsections: [
      {
        title: 'Fried Rice & Noodles',
        items: [
          { name: 'Fried Rice', price: 'Egg ₹70 | Chicken ₹90 | Mixed ₹110' },
          { name: 'Noodles', price: 'Veg ₹60 | Egg ₹70 | Chicken ₹90 | Mixed ₹110' },
        ],
      },
      {
        title: 'Street-Style Rolls',
        items: [
          { name: 'Egg Roll', price: '₹40' },
          { name: 'Chicken Roll', price: '₹60' },
          { name: 'Paneer Roll', price: '₹60' },
        ],
      },
    ],
  },
  {
    id: 'breads-sides',
    title: 'Breads & Sides',
    emoji: '🫓',
    subsections: [
      {
        title: 'Indian Breads',
        items: [
          { name: 'Laccha Paratha', price: '₹30' },
          { name: 'Aloo Paratha', price: '₹40' },
          { name: 'Paneer Paratha', price: '₹45' },
        ],
      },
      {
        title: 'Rice & Pulao',
        items: [
          { name: 'Plain Rice', price: '₹50' },
          { name: 'Jeera Rice', price: '₹60' },
          { name: 'Peas Pulao', price: '₹70' },
          { name: 'Sweet Veg Pulao', price: '₹90' },
        ],
      },
    ],
  },
  {
    id: 'beverages-dessert',
    title: 'Beverages & Dessert',
    emoji: '🥤',
    subsections: [
      {
        title: 'Refreshing Drinks',
        items: [
          {
            name: 'Hungryana Special Lassi',
            price: '₹70',
            description: 'With Coconut, Banana, Kaju, and Kismiss',
            featured: true,
          },
          { name: 'Salted Lassi (With Roasted Cumin)', price: '₹50' },
          { name: 'Cold Coffee', price: '₹70' },
        ],
      },
      {
        title: 'Hot Brews',
        items: [
          { name: 'Special Milk Tea', price: '₹20' },
          { name: 'Hot Coffee', price: '₹25' },
        ],
      },
      {
        title: 'Dessert',
        items: [
          { name: 'Fried Ice Cream', price: '₹80', featured: true },
        ],
      },
    ],
  },
];

export const MENU_TAGLINE = 'Eat Hearty, Stay Hungry';

export const FEATURED_ITEMS = MENU_SECTIONS.flatMap((section) =>
  section.subsections.flatMap((sub) =>
    sub.items.filter((item) => item.featured).map((item) => ({
      ...item,
      section: section.title,
    }))
  )
);
