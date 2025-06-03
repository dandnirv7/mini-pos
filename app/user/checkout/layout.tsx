"use client";

import Script from "next/script";
import Link from "next/link";
import { ReactNode } from "react";
import { useSearchParams } from "next/navigation";

interface PaymentLayoutProps {
  children: ReactNode;
}

export default function PaymentLayout({ children }: PaymentLayoutProps) {
  const orderNumber = useSearchParams().get("order-number") || "";

  return (
    <>
      <Script
        id="midtrans-script"
        strategy="lazyOnload"
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      />

      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-10 bg-white border-b">
          <div className="container flex items-center justify-between px-4 py-4 mx-auto">
            <Link href="/" className="text-2xl font-bold text-orange-500">
              NOKU
            </Link>
            <div className="text-sm text-gray-500">
              Order ID: #{orderNumber}
            </div>
          </div>
        </header>

        <main className="container px-4 py-8 mx-auto">{children}</main>
      </div>
    </>
  );
}
