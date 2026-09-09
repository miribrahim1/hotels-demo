import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { isDemo, resolveSiteUrl } from "@/lib/site-config.mjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = resolveSiteUrl();

export const metadata = {
  metadataBase: new URL(siteUrl),
  robots: isDemo ? { index: false, follow: true } : undefined,
  title: {
    default: "The Verandah | Boutique Hotel in Shantiniketan",
    template: "%s | The Verandah",
  },
  description:
    "A modern boutique hotel in Shantiniketan, West Bengal, blending minimalist design with warm hospitality. Explore rooms, amenities, and book your stay.",
  keywords: [
    "The Verandah",
    "boutique hotel",
    "Shantiniketan hotel",
    "West Bengal hotel",
    "hotel booking",
  ],
  openGraph: {
    title: "The Verandah | Boutique Hotel in Shantiniketan",
    description:
      "A modern boutique hotel in Shantiniketan, West Bengal, blending minimalist design with warm hospitality.",
    url: siteUrl,
    siteName: "The Verandah",
    images: ["/images/hero/01-exterior.png"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Verandah | Boutique Hotel in Shantiniketan",
    description:
      "A modern boutique hotel in Shantiniketan, West Bengal, blending minimalist design with warm hospitality.",
    images: ["/images/hero/01-exterior.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}