
import { Product, Testimonial } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Classic Cream Silk Panjabi",
    price: 3450,
    originalPrice: 4200,
    category: "Eid Collection",
    image: "https://picsum.photos/seed/panjabi1/600/800",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Deep Emerald Embroidery",
    price: 5200,
    category: "Wedding Panjabi",
    image: "https://picsum.photos/seed/panjabi2/600/800",
    badge: "Premium"
  },
  {
    id: 3,
    name: "Midnight Black Minimalist",
    price: 2800,
    originalPrice: 3200,
    category: "Casual Panjabi",
    image: "https://picsum.photos/seed/panjabi3/600/800"
  },
  {
    id: 4,
    name: "Royal Blue Sultan Cut",
    price: 4800,
    category: "New Arrival",
    image: "https://picsum.photos/seed/panjabi4/600/800",
    badge: "New"
  },
  {
    id: 5,
    name: "Off-White Cotton Comfort",
    price: 2200,
    category: "Casual Panjabi",
    image: "https://picsum.photos/seed/panjabi5/600/800"
  },
  {
    id: 6,
    name: "Golden Zardosi Wedding Set",
    price: 8500,
    category: "Wedding Panjabi",
    image: "https://picsum.photos/seed/panjabi6/600/800",
    badge: "Exclusive"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Arifur Rahman",
    rating: 5,
    text: "The fabric quality is outstanding. Wore it for my sister's wedding and received so many compliments!",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Salman Khan",
    rating: 4,
    text: "Great fitting and very comfortable for the humid weather in Dhaka. Delivery was fast too.",
    date: "1 month ago"
  }
];

export const CATEGORIES = [
  { name: "Eid Collection", slug: "eid" },
  { name: "Wedding Panjabi", slug: "wedding" },
  { name: "Casual Panjabi", slug: "casual" },
  { name: "New Arrival", slug: "new" }
];
