import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_Devanagari } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import FloatingButtons from "@/components/FloatingButtons";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const notoDevaragari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Vidyawadi School - Excellence Since 1960",
  description: "Shaping Leaders of Tomorrow. Educational excellence for over 65 years.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${notoDevaragari.variable} font-sans antialiased bg-sandstone-light text-oxford overflow-x-hidden w-full`}
      >
        {children}
        <FloatingButtons />
        <Script src="https://cdn.botpress.cloud/webchat/v2.2/shareable.js" strategy="lazyOnload" />
        <Script src="https://files.bpcontent.cloud/2025/01/15/06/20250115061642-XN0Z8Q9Z.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
