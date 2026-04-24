
import { Order } from '../types';

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "7253507963:AAE3p_z03964593465934659346"; // Placeholder should ideally be in .env
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || "5934659346";

export const notificationService = {
  /**
   * Telegram এ নোটিফিকেশন পাঠায়
   */
  async sendTelegramNotification(order: Order) {
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const productDetails = order.cartItems.map((item, index) => 
      `${index + 1}. ${item.name} (x${item.quantity}) - ${item.quantity * item.price} টাকা`
    ).join('\n');

    const messageText = `
🚨 <b>নতুন অর্ডার এসেছে!</b> (ID: ${order.orderId}) 🚨
<b>সময়:</b> ${new Date(order.orderDate).toLocaleString('bn-BD', { timeZone: 'Asia/Dhaka' })}
➖➖➖➖➖➖➖➖➖➖
<b>👤 গ্রাহকের তথ্য:</b>
<b>নাম:</b> ${order.customerName}
<b>ফোন:</b> <a href="tel:${order.phoneNumber}">${order.phoneNumber}</a>
<b>ঠিকানা:</b> ${order.address}
<b>এলাকা:</b> ${order.deliveryLocation === 'insideDhaka' ? 'ঢাকার ভেতরে' : 'ঢাকার বাইরে'}
➖➖➖➖➖➖➖➖➖➖
<b>🛍️ পণ্যের তালিকা:</b>
${productDetails}
➖➖➖➖➖➖➖➖➖➖
<b>💰 পেমেন্টের তথ্য:</b>
<b>পেমেন্ট পদ্ধতি:</b> ${order.paymentNumber !== 'N/A' ? 'বিকাশ/নগদ' : 'ক্যাশ অন ডেলিভারি'}
<b>সাব-টোটাল:</b> ${order.subTotal} টাকা
<b>ডেলিভারি ফি:</b> ${order.deliveryFee} টাকা
<b>মোট মূল্য:</b> <b>${order.totalAmount} টাকা</b>
`;

    try {
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: messageText,
          parse_mode: 'HTML'
        })
      });

      return await response.json();
    } catch (error) {
      console.error("Telegram Notification Error:", error);
      return { success: false, error };
    }
  }
};
