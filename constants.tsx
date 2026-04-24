
import { Product, Testimonial, EventBanner } from './types';

export const PRODUCTS: Product[] = [
  {
    id: "b1",
    name: "Advanced Night Repair Serum",
    price: 3200,
    originalPrice: 3800,
    category: "skincare",
    image: "https://picsum.photos/seed/serum/600/800",
    badge: "Best Seller",
    stockStatus: 'in_stock'
  },
  {
    id: "b2",
    name: "Matte Lipstick - Crimson Red",
    price: 850,
    category: "cosmetics",
    image: "https://picsum.photos/seed/lipstick/600/800",
    badge: "Trending",
    stockStatus: 'in_stock'
  },
  {
    id: "b3",
    name: "Moisturizing Sunscreen SPF 50",
    price: 1200,
    originalPrice: 1500,
    category: "skincare",
    image: "https://picsum.photos/seed/sunscreen/600/800",
    stockStatus: 'in_stock'
  },
  {
    id: "b4",
    name: "Argan Oil Hair Treatment",
    price: 1800,
    category: "haircare",
    image: "https://picsum.photos/seed/hair/600/800",
    badge: "New",
    stockStatus: 'in_stock'
  },
  {
    id: "b5",
    name: "Herbal Mehandi Pack",
    price: 450,
    category: "mehandi",
    image: "https://picsum.photos/seed/mehandi/600/800",
    stockStatus: 'in_stock'
  },
  {
    id: "b6",
    name: "Vitamin C Face Wash",
    price: 650,
    category: "skincare",
    image: "https://picsum.photos/seed/facewash/600/800",
    stockStatus: 'in_stock'
  }
];

export const EVENT_BANNERS: EventBanner[] = [
  {
    id: "e1",
    title: "ঈদ ধামাকা অফার",
    description: "সব মেকআপ কিটে ২০% পর্যন্ত ছাড়!",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop",
    isActive: true,
    displayOrder: 1,
    bgColor: "bg-lipstick"
  },
  {
    id: "e2",
    title: "ব্রাইডাল স্পেশাল",
    description: "আপনার বিশেষ দিনের জন্য বিশেষ মেকআপ কালেকশন",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2070&auto=format&fit=crop",
    isActive: true,
    displayOrder: 2,
    bgColor: "bg-black"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "আরিফুর রহমান",
    rating: 5,
    text: "কাপড়ের মান অসাধারণ। আমার বোনের বিয়েতে এটি পরেছিলাম এবং সবাই খুব প্রশংসা করেছে!",
    date: "২ সপ্তাহ আগে"
  },
  {
    id: 2,
    name: "সালমান খান",
    rating: 4,
    text: "ফিটিং খুব ভালো এবং ঢাকার গরমে পরতে বেশ আরামদায়ক। ডেলিভারিও খুব দ্রুত ছিল।",
    date: "১ মাস আগে"
  }
];

export const CATEGORIES = [
  { name: "ঈদ কালেকশন", slug: "eid" },
  { name: "বিয়ের পাঞ্জাবী", slug: "wedding" },
  { name: "ক্যাজুয়াল পাঞ্জাবী", slug: "casual" },
  { name: "নতুন কালেকশন", slug: "new" }
];
