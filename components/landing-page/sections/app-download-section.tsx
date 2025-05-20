import Image from "next/image";
import Link from "next/link";

import AppStoreBadge from "/public/landing-page/apple-appstore.svg";
import GooglePlayStoreBadge from "/public/landing-page/google-play-store.svg";

export const AppDownloadSection = () => {
  return (
    <section className="px-12 py-16 dark:bg-slate-950">
      <div className="container">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold">Download App</h2>
            <p className="mb-8 text-muted-foreground">
              Get the full Noku experience on your mobile device. Order coffee,
              track deliveries, and earn rewards with our easy-to-use app.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="inline-block">
                <Image
                  src={AppStoreBadge}
                  alt="App Store"
                  width={120}
                  height={40}
                  className="w-auto h-10"
                />
              </Link>
              <Link href="#" className="inline-block">
                <Image
                  src={GooglePlayStoreBadge}
                  alt="Google Play"
                  width={120}
                  height={40}
                  className="w-auto h-10"
                />
              </Link>
            </div>
          </div>
          <div className="relative h-[400px]">
            <div className="absolute inset-0 bg-[#F26E41] rounded-full opacity-20 blur-3xl"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <Image
                src="/placeholder.svg?height=400&width=200"
                alt="App Screenshot 1"
                width={200}
                height={400}
                className="transform -rotate-12"
              />
              <Image
                src="/placeholder.svg?height=400&width=200"
                alt="App Screenshot 2"
                width={200}
                height={400}
                className="transform rotate-12 ml-[-30px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
