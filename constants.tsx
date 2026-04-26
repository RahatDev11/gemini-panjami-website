
import { Product, Testimonial, EventBanner } from './types';

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "প্রিমিয়াম ম্যাট লিপস্টিক সেট",
    price: 1250,
    originalPrice: 1500,
    category: "cosmetics",
    image: "https://picsum.photos/seed/beauty1/600/800",
    badge: "সেরা বিক্রয়",
    isInSlider: true,
    sliderOrder: 1
  },
  {
    id: "2",
    name: "হাইড্রেটিং ফেস সিরাম",
    price: 850,
    category: "skincare",
    image: "https://picsum.photos/seed/beauty2/600/800",
    badge: "প্রিমিয়াম"
  },
  {
    id: "3",
    name: "অর্গানিক কোকোনাট হেয়ার অয়েল",
    price: 450,
    originalPrice: 600,
    category: "haircare",
    image: "https://picsum.photos/seed/beauty3/600/800"
  },
  {
    id: "4",
    name: "ব্রাইডাল স্পেশাল মেহেদী",
    price: 150,
    category: "mehandi",
    image: "https://picsum.photos/seed/beauty4/600/800",
    badge: "নতুন",
    isInSlider: true,
    sliderOrder: 2
  },
  {
    id: "5",
    name: "অ্যালোভেরা ফেস মাস্ক",
    price: 320,
    category: "skincare",
    image: "https://picsum.photos/seed/beauty5/600/800"
  },
  {
    id: "6",
    name: "ভিটামিন-সি নাইট ক্রিম",
    price: 1100,
    category: "skincare",
    image: "https://picsum.photos/seed/beauty6/600/800",
    badge: "এক্সক্লুসিভ"
  }
];

export const EVENT_BANNERS: EventBanner[] = [
  {
    id: "1",
    title: "বিউটি ধামাকা অফার",
    description: "ফল সিজন সেলে সব কসমেটিকস এ পাবেন ২০% পর্যন্ত ছাড়!",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2070&auto=format&fit=crop",
    isActive: true,
    displayOrder: 1
  },
  {
    id: "2",
    title: "স্কিনকেয়ার ফেস্ট",
    description: "আপনার ত্বকের যত্নে সেরা সব ব্র্যান্ডের শপে বিশেষ ছাড়",
    image: "https://images.unsplash.com/photo-1570172619999-5256e2978a10?q=80&w=2070&auto=format&fit=crop",
    isActive: true,
    displayOrder: 2
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "সুমাইয়া জান্নাত",
    rating: 5,
    text: "লিপস্টিক টা অসাধারণ! কালার টা একদম ছবির মত। ধন্যবাদ এনি বিউটি কর্নার!",
    date: "২ দিন আগে"
  },
  {
    id: 2,
    name: "তাসনিম রহমান",
    rating: 4,
    text: "সিরাম টা খুব ভালো কাজ করছে। আগের চাইতে স্কিন অনেক গ্লোয়িং হয়েছে।",
    date: "১ সপ্তাহ আগে"
  }
];

export const CATEGORIES = [
  { name: "সবগুলো", slug: "all" },
  { name: "মেকআপ", slug: "cosmetics" },
  { name: "স্কিনকেয়ার", slug: "skincare" },
  { name: "হেয়ারকেয়ার", slug: "haircare" },
  { name: "মেহেদী", slug: "mehandi" }
];
