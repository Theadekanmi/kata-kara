import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "KataKara - Find World-Class Freelance Talent",
  description: "Connect with top freelancers and agencies worldwide. Get quality work done faster with KataKara's premium marketplace for web development, design, writing, and more.",
  keywords: "freelance, freelancers, hire talent, remote work, web development, design, writing, digital marketing, upwork alternative",
  authors: [{ name: "KataKara Team" }],
  creator: "KataKara",
  publisher: "KataKara",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://katakara.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "KataKara - Find World-Class Freelance Talent",
    description: "Connect with top freelancers and agencies worldwide. Get quality work done faster with KataKara's premium marketplace.",
    url: 'https://katakara.com',
    siteName: 'KataKara',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KataKara - Premium Freelance Marketplace',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "KataKara - Find World-Class Freelance Talent",
    description: "Connect with top freelancers and agencies worldwide. Get quality work done faster with KataKara's premium marketplace.",
    images: ['/og-image.jpg'],
    creator: '@katakara',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="antialiased bg-white text-gray-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
