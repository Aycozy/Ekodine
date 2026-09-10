// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Premcare Physiotherapy Clinic | Expert Rehab in Lagos",
  description: "Premcare offers professional physiotherapy, sports rehab, and home visits in Lagos. Book your assessment today.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        {/* Add Footer Component Here */}
      </body>
    </html>
  );
}