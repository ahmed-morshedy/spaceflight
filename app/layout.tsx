import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./ui/Footer";
import Header from "./components/Header";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spaceflight News | Latest Space Articles, Blogs & Reports",
  description: "Stay updated with the latest spaceflight news, articles, blogs, and reports from around the world. Discover space exploration, astronomy, and aerospace innovations.",
  keywords: ["spaceflight", "space news", "space articles", "space blogs", "NASA", "SpaceX", "space exploration", "astronomy"],
  authors: [{ name: "Spaceflight News Team" }],
  openGraph: {
    title: "Spaceflight News | Latest Space Articles, Blogs & Reports",
    description: "Stay updated with the latest spaceflight news, articles, blogs, and reports from around the world.",
    url: "https://spaceflightnews.com",
    siteName: "Spaceflight News",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Spaceflight News",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spaceflight News | Latest Space Articles, Blogs & Reports",
    description: "Stay updated with the latest spaceflight news, articles, blogs, and reports from around the world.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <Suspense>{children}</Suspense>
        <Footer />
      </body>
    </html>
  );
}
