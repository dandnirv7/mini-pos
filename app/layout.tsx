import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "@/styles/globals.css";
import {
  domainPath,
  siteName,
  siteDescription,
  creatorName,
  twitterHandle,
  siteLogo,
  ogImage,
  keywords,
} from "@/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteName} Coffee`,
  description: siteDescription,
  metadataBase: new URL(domainPath),
  keywords: keywords,
  authors: [{ name: creatorName, url: domainPath }],
  creator: creatorName,
  icons: {
    icon: siteLogo,
  },
  openGraph: {
    title: `${siteName} | Mini E-Commerce`,
    description:
      "Easy and fast shopping at Noku. Get the best selection of products.",
    url: domainPath,
    siteName: siteName,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${siteName} E-Commerce`,
      },
    ],
    type: "website",
  },
  twitter: {
    title: `${siteName} | Mini E-Commerce`,
    description:
      "Easy and fast shopping at Noku. Get the best selection of products.",
    images: [ogImage],
    card: "summary_large_image",
    creator: twitterHandle,
  },
  alternates: {
    canonical: domainPath,
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Store",
      name: siteName,
      url: domainPath,
      description: "Minimalist and modern online store",
      logo: siteLogo,
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${manrope.variable} antialiased`}
        style={{
          fontFamily:
            "var(--font-inter), var(--font-manrope), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        }}
      >
        <Providers
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <main>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
