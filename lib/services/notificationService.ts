
import { Order } from '../types';

export const notificationService = {
  /**
   * API Route এর মাধ্যমে নোটিফিকেশন পাঠায়
   */
  async sendTelegramNotification(order: Order) {
    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });

      return await response.json();
    } catch (error) {
      console.error("Notification Service Error:", error);
      return { success: false, error };
    }
  }
};
