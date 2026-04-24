
import { Order } from '../types';

const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

export const notificationService = {
  /**
   * Telegram এ নোটিফিকেশন পাঠায়
   */
  async sendTelegramNotification(order: Order) {
    if (!BOT_TOKEN || !CHAT_ID) {
      console.warn("Telegram BOT_TOKEN or CHAT_ID is missing. Skipping notification.");
      return { success: false, error: "Missing configuration" };
    }
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const productDetails = (order.items || []).map((item, index) => 
      `${index + 1}. ${item.name} (x${item.quantity}) - ${item.quantity * item.price} টাকা`
    ).join('\n');

    const messageText = `
🚨 <b>নতুন অর্ডার এসেছে!</b> (ID: ${order.orderId}) 🚨
<b>সময়:</b> ${new Date(order.orderDate).toLocaleString('bn-BD', { timeZone: 'Asia/Dhaka' })}
<b>অবস্থা:</b> ${order.status}
➖➖➖➖➖➖➖➖➖➖
<b>👤 গ্রাহকের তথ্য:</b>
<b>নাম:</b> ${order.customerName}
<b>ফোন:</b> <a href="tel:${order.customerPhone}">${order.customerPhone}</a>
<b>ঠিকানা:</b> ${order.customerAddress}
➖➖➖➖➖➖➖➖➖➖
<b>🛍️ পণ্যের তালিকা:</b>
${productDetails}
➖➖➖➖➖➖➖➖➖➖
<b>💰 পেমেন্টের তথ্য:</b>
<b>মোট মূল্য:</b> <b>${order.total} টাকা</b>
${order.note ? `<b>নোট:</b> ${order.note}` : ''}
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
