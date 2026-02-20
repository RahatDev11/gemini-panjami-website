
import { Product, Testimonial } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "ক্লাসিক ক্রিম সিল্ক পাঞ্জাবী",
    price: 3450,
    originalPrice: 4200,
    category: "ঈদ কালেকশন",
    image: "https://picsum.photos/seed/panjabi1/600/800",
    badge: "সেরা বিক্রয়"
  },
  {
    id: 2,
    name: "গাঢ় সবুজ কারুকাজ পাঞ্জাবী",
    price: 5200,
    category: "বিয়ের পাঞ্জাবী",
    image: "https://picsum.photos/seed/panjabi2/600/800",
    badge: "প্রিমিয়াম"
  },
  {
    id: 3,
    name: "মিডনাইট ব্ল্যাক মিনিমালিস্ট",
    price: 2800,
    originalPrice: 3200,
    category: "ক্যাজুয়াল পাঞ্জাবী",
    image: "https://picsum.photos/seed/panjabi3/600/800"
  },
  {
    id: 4,
    name: "রয়্যাল ব্লু সুলতান কাট",
    price: 4800,
    category: "নতুন কালেকশন",
    image: "https://picsum.photos/seed/panjabi4/600/800",
    badge: "নতুন"
  },
  {
    id: 5,
    name: "অফ-হোয়াইট কটন কমফোর্ট",
    price: 2200,
    category: "ক্যাজুয়াল পাঞ্জাবী",
    image: "https://picsum.photos/seed/panjabi5/600/800"
  },
  {
    id: 6,
    name: "গোল্ডেন জারদোসি ওয়েডিং সেট",
    price: 8500,
    category: "বিয়ের পাঞ্জাবী",
    image: "https://picsum.photos/seed/panjabi6/600/800",
    badge: "এক্সক্লুসিভ"
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
