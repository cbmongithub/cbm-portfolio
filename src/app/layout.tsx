import { Analytics } from "@/components/layout";
import { Footer, Header } from "@/components/layout";
import { ThemeProvider } from "@/components/ui";

import { geist, geistMono } from "@/lib/config/font";
import { BASE_METADATA as metadata } from "@/lib/config/metadata";

import "@/styles/globals.css";

export { metadata };

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geist.variable} ${geistMono.variable} mx-auto min-h-screen max-w-4xl px-6 py-4 antialiased`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
