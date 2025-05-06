import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, ShoppingBag, PlayCircle } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative p-5 overflow-hidden dark:bg-slate-950">
      <div className="container grid items-center gap-8 py-12 md:grid-cols-2 md:py-20">
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#FFF1EC] text-[#F26E41] text-sm font-medium">
            Get free app
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Order your coffee with <span className="text-[#F26E41]">Noku</span>
          </h1>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-[#F26E41] hover:bg-[#e05a2e] text-white">
              Download App
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5" />
              Play Video
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-8 border-t">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-10 rounded-full bg-[#FFF1EC]">
                <Star className="h-5 w-5 text-[#F26E41] fill-[#F26E41]" />
              </div>
              <div>
                <div className="text-xl font-bold">4.8</div>
                <div className="text-sm text-muted-foreground">
                  User rating on Playstore
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-10 rounded-full bg-[#FFF1EC]">
                <ShoppingBag className="h-5 w-5 text-[#F26E41]" />
              </div>
              <div>
                <div className="text-xl font-bold">1.6M+</div>
                <div className="text-sm text-muted-foreground">
                  Download all over the World
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-[500px] flex justify-center">
          <div className="absolute inset-0 bg-[#F26E41] rounded-full opacity-20 blur-3xl"></div>
          <Image
            src="/placeholder.svg?height=600&width=300"
            alt="Noku App"
            width={300}
            height={600}
            className="relative z-10"
            priority
          />
        </div>
      </div>
    </section>
  );
};
