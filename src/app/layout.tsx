import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FitLogProvider } from "@/context/FitLogContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitLog — Workout Library & Daily Planner",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased`}>
        <FitLogProvider>
          <Navbar />
          {children}
          <Toaster position="top-right" />
          <Footer />
        </FitLogProvider>
      </body>
    </html>
  );
}