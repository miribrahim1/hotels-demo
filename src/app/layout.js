import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PageLoader from "@/components/PageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
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
        <PageLoader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}