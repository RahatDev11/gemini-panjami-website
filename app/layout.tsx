import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Any's Beauty Corner - আপনার সৌন্দর্য চর্চার বিশ্বস্ত সঙ্গী",
  description: "আপনার সৌন্দর্য চর্চার বিশ্বস্ত সঙ্গী। প্রিমিয়াম মেকআপ, স্কিনকেয়ার এবং বিউটি প্রোডাক্টের নির্ভরযোগ্য গন্তব্য।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
