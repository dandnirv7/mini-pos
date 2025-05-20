import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const PromoSection = () => {
  return (
    <section className="px-12 py-16 bg-gray-50 dark:bg-slate-950">
      <div className="container">
        <div className="bg-[#1E2631] rounded-xl overflow-hidden">
          <div className="grid items-center md:grid-cols-2">
            <div className="p-8 text-white md:p-12">
              <h2 className="mb-4 text-3xl font-bold">
                Get 30% Off of
                <br />
                Your First Purchase
              </h2>
              <p className="mb-6 text-gray-300">
                Join our community today and enjoy premium coffee at a special
                introductory price.
              </p>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter your email"
                  className="text-white placeholder:text-white/40 bg-white/10 border-white/20"
                />
                <Button className="bg-[#F26E41] hover:bg-[#e05a2e] text-white">
                  Submit
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-auto">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Barista"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
