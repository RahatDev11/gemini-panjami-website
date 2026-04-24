
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string; // Can be a single URL or comma separated URLs
  badge?: string;
  stockStatus?: 'in_stock' | 'out_of_stock';
  tags?: string;
  isInSlider?: boolean;
  sliderOrder?: number;
  updatedAt?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

export interface Order {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  total: number;
  items: CartItem[];
  orderDate: string;
  status: 'Pending' | 'processing' | 'confirmed' | 'packaging' | 'shipped' | 'delivered' | 'cancelled' | 'failed';
  userId: string;
  note?: string;
}

export interface EventBanner {
  id: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  displayOrder?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
