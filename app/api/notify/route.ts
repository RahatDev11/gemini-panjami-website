
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const order = await req.json();
    
    // Server-side env vars (safe)
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.warn("Telegram configuration missing in API route.");
      return NextResponse.json({ success: false, error: "Configuration missing" }, { status: 500 });
    }

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const productDetails = (order.items || []).map((item: any, index: number) => 
      `${index + 1}. ${item.name} (x${item.quantity}) - ${item.quantity * item.price} টাকা`
    ).join('\n');

    const messageText = `
🚨 <b>নতুন অর্ডার এসেছে!</b> (ID: ${order.orderId}) 🚨
<b>সময়:</b> ${new Date(order.orderDate).toLocaleString('bn-BD', { timeZone: 'Asia/Dhaka' })}
<b>অবস্থা:</b> ${order.status}
➖➖➖➖➖➖➖➖➖➖
<b>👤 গ্রাহকের তথ্য:</b>
<b>নাম:</b> ${order.customerName}
<b>ফোন:</b> ${order.customerPhone}
<b>ঠিকানা:</b> ${order.customerAddress}
➖➖➖➖➖➖➖➖➖➖
<b>🛍️ পণ্যের তালিকা:</b>
${productDetails}
➖➖➖➖➖➖➖➖➖➖
<b>💰 পেমেন্টের তথ্য:</b>
<b>মোট মূল্য:</b> <b>${order.total} টাকা</b>
${order.note ? `<b>নোট:</b> ${order.note}` : ''}
`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: messageText,
        parse_mode: 'HTML'
      })
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("API Notification Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
