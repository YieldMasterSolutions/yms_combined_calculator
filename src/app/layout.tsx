// src/app/layout.tsx

import type { Metadata } from "next";
import { Open_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YieldMaster Solutions Calculator",
  description: "Calculate biological seed treatment and foliar costs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${montserrat.variable} antialiased bg-white text-black dark:bg-gray-900 dark:text-white`}
      >
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
