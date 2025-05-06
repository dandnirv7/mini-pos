"use client";

// import Header from "@/components/header";

import { Footer } from "@/components/landing-page/layout/footer";
import { Header } from "@/components/landing-page/layout/header";
import { AppDownloadSection } from "@/components/landing-page/sections/app-download-section";
import { HeroSection } from "@/components/landing-page/sections/hero-section";
import { HowItWorks } from "@/components/landing-page/sections/how-it-works";
import { ProductsSection } from "@/components/landing-page/sections/products-section";
import { PromoSection } from "@/components/landing-page/sections/promo-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <ProductsSection />
        <PromoSection />
        <AppDownloadSection />
      </main>
      <Footer />
    </div>
  );
}
