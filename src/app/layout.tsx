import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lovelo = localFont({
  src: './fonts/Lovelo-Black.woff2',
  variable: '--font-lovelo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Weekend in the City | Munich's Premier All-Girls Book Club",
  description: "Join our community and take part in curated social events that bring together locals and internationals in Munich.",
  keywords: "book club Munich, women book club, literature events Munich, book discussion groups, female book club, Munich reading club, book events, literary brunch, author meet and greet, book swap, wine tasting books",
  authors: [{ name: "Weekend in the City" }],
  creator: "Weekend in the City",
  publisher: "Weekend in the City",
  robots: "index, follow",
  openGraph: {
    title: "Weekend in the City | Munich's Premier All-Girls Book Club",
    description: "Join our community and take part in curated social events that bring together locals and internationals in Munich.",
    type: "website",
    locale: "en_US",
    siteName: "Weekend in the City",
    url: "https://weekendinthecity.com",
    images: [
      {
        url: "/weekendinthecity.png",
        width: 1200,
        height: 630,
        alt: "Weekend in the City - Munich's Premier Book Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Weekend in the City | Munich's Premier All-Girls Book Club",
    description: "Join our community and take part in curated social events that bring together locals and internationals in Munich.",
    images: ["/weekendinthecity.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#e52100",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lovelo.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
