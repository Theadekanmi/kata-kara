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
        
        {/* Organization Schema for Google Knowledge Panel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "KataKara",
              "alternateName": "KataKara Freelance Marketplace",
              "description": "The world's leading freelance marketplace connecting businesses with independent talent from across the globe. Find top-rated freelancers for web development, design, writing, and digital services.",
              "url": "https://kata-kara.vercel.app",
              "logo": "https://kata-kara.vercel.app/logo.png",
              "image": "https://kata-kara.vercel.app/og-image.jpg",
              "foundingDate": "2024",
              "founder": {
                "@type": "Person",
                "name": "KataKara Team"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "hello@katakara.com",
                "contactType": "Customer Service",
                "availableLanguage": ["English"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "NG",
                "addressRegion": "Lagos"
              },
              "sameAs": [
                "https://www.facebook.com/katakara",
                "https://www.twitter.com/katakara",
                "https://www.instagram.com/katakara",
                "https://www.linkedin.com/company/katakara"
              ],
              "serviceType": "Freelance Marketplace",
              "knowsAbout": [
                "Freelance Services",
                "Web Development",
                "Graphic Design",
                "Digital Marketing",
                "Content Writing",
                "Software Development"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Freelance Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Web Development",
                      "description": "Professional web development services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Graphic Design",
                      "description": "Creative graphic design solutions"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Digital Marketing",
                      "description": "Strategic digital marketing campaigns"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className="antialiased bg-white text-gray-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
