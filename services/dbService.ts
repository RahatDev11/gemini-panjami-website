
import { Product, Order, EventBanner } from '../types';
import { db } from './firebase';
import { ref, get, set, runTransaction } from "firebase/database";
import { PRODUCTS, EVENT_BANNERS } from '../constants';

export const dbService = {
  /**
   * ডেটাবেজ থেকে সব প্রোডাক্ট ফেচ করার ফাংশন
   */
  async fetchProducts(): Promise<Product[]> {
    try {
      const productsRef = ref(db, "products");
      const snapshot = await get(productsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => ({ id: key, ...data[key] }));
      }
      // Fallback to constants if DB is empty
      return PRODUCTS;
    } catch (error) {
      console.error("Database Error:", error);
      return PRODUCTS;
    }
  },

  /**
   * ইভেন্ট ব্যান্তর ফেচ করার ফাংশন
   */
  async fetchEvents(): Promise<EventBanner[]> {
    try {
      const eventsRef = ref(db, "events");
      const snapshot = await get(eventsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => ({ id: key, ...data[key] }));
      }
      return EVENT_BANNERS;
    } catch (error) {
      console.error("Events Fetch Error:", error);
      return EVENT_BANNERS;
    }
  },

  /**
   * নতুন অর্ডার সেভ করার ফাংশন (Custom Order ID সহ)
   */
  async placeOrder(orderData: Partial<Order>): Promise<Order> {
    try {
      const today = new Date();
      const year = today.getFullYear().toString().slice(-2);
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1);
      const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${day}`;

      const counterRef = ref(db, `counters/${dateString}`);
      
      const result = await runTransaction(counterRef, (currentData) => {
        if (currentData === null) return 1;
        return currentData + 1;
      });

      if (result.committed) {
        const orderNumber = result.snapshot.val();
        const paddedOrderNumber = String(orderNumber).padStart(3, '0');
        const orderId = `NH-${year}${day}${month}${paddedOrderNumber}`;

        const finalOrder: Order = {
          userId: orderData.userId || 'guest',
          items: orderData.items || [],
          total: orderData.total || 0,
          customerName: orderData.customerName || '',
          customerPhone: orderData.customerPhone || '',
          customerAddress: orderData.customerAddress || '',
          orderDate: new Date().toISOString(),
          status: 'pending',
          orderId: orderId,
          note: orderData.note || ''
        };

        const orderRef = ref(db, `orders/${orderId}`);
        await set(orderRef, finalOrder);

        return finalOrder;
      } else {
        throw new Error("Failed to generate order ID");
      }
    } catch (error: any) {
      console.error("Place Order Error:", error);
      throw error;
    }
  },

  /**
   * অর্ডারের স্ট্যাটাস চেক করার ফাংশন (Search by ID)
   */
  async fetchOrderById(orderId: string): Promise<Order | null> {
    try {
      const orderRef = ref(db, `orders/${orderId}`);
      const snapshot = await get(orderRef);
      if (snapshot.exists()) {
        return snapshot.val() as Order;
      }
      return null;
    } catch (error) {
      console.error("Fetch Order Error:", error);
      return null;
    }
  },

  /**
   * ইউজারের অর্ডার ফেচ করার ফাংশন
   */
  async fetchUserOrders(userId: string): Promise<Order[]> {
    try {
        // Since we can't easily query by child without rules Index, 
        // and it's a small app, we'll fetch all and filter or just return empty for now
        // if user hasn't set up indexes.
        const ordersRef = ref(db, "orders");
        const snapshot = await get(ordersRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            return Object.values(data)
                .filter((o: any) => o.userId === userId)
                .sort((a: any, b: any) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()) as Order[];
        }
        return [];
    } catch (error) {
      console.error("Fetch Orders Error:", error);
      return [];
    }
  }
};
