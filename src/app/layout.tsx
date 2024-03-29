import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import {Footer} from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "IGPortals",
  description: "The ultimate dashboard for managing IGPortals projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen w-screen justify-evenly overflow-hidden">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
