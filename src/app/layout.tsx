import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextAuthProvider from "@/components/NextAuthProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Ekodine - Unified Restaurant SaaS Dashboard",
  description: "Manage your restaurant menu, orders, and reservations seamlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable} font-sans antialiased bg-stone-50 text-stone-900`}>
        <NextAuthProvider>
          {children}
          <Toaster position="bottom-right" />
        </NextAuthProvider>
      </body>
    </html>
  );
}
