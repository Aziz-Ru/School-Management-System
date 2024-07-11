import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home Page",
  description: "School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Hero />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
