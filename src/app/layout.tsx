import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Footer, Header } from "@/components/layout";
import { ThemeProvider } from "@/components/ui";

import { SITE_METADATA } from "@/lib/config/site";

import "@/styles/globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.url),
  title: {
    default: SITE_METADATA.name,
    template: `%s - ${SITE_METADATA.name}`,
  },
  description: SITE_METADATA.description,
  keywords: [
    "Christian B. Martinez",
    "Christian Martinez Full Stack Developer",
    "Christian B Martinez Full Stack",
    "Full Stack developer Utah",
    "Christian Full Stack Developer",
    "cbm full stack developer",
  ],
  authors: [
    {
      name: SITE_METADATA.name,
      url: SITE_METADATA.url,
    },
  ],
  creator: SITE_METADATA.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_METADATA.url,
    title: SITE_METADATA.name,
    description: SITE_METADATA.description,
    siteName: SITE_METADATA.name,
    images: [
      {
        url: SITE_METADATA.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_METADATA.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.name,
    description: SITE_METADATA.description,
    images: [SITE_METADATA.ogImage],
    creator: SITE_METADATA.handles.twitter,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body
        className={`${geist.variable} ${geistMono.variable} mx-auto max-w-4xl px-6 py-4 antialiased`}
      >
        <ThemeProvider>
          <Header />
          {children}
          <Analytics />
          <SpeedInsights />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
