import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Any's Beauty Corner - আপনার সৌন্দর্য চর্চার বিশ্বস্ত সঙ্গী",
  description: "পাঞ্জাবী হাউজ - সব উৎসবের জন্য প্রিমিয়াম পাঞ্জাবী এবং বিউটি প্রোডাক্টস",
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
