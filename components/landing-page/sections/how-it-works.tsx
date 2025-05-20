import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, CreditCard, Package2 } from "lucide-react";

export const HowItWorks = () => {
  return (
    <section id="about" className="px-12 py-16 bg-gray-50 dark:bg-slate-950">
      <div className="container flex flex-col md:grid md:grid-cols-12 md:gap-12 md:place-items-start">
        <div className="flex flex-col gap-6 mb-12 text-center md:max-w-lg md:col-span-3 md:pr-20">
          <h2 className="text-sm font-medium text-black mb-2 bg-[#DBDBDC] rounded-full p-3 md:w-fit">
            HOW IT WORKS
          </h2>
          <h3 className="text-4xl font-bold text-center md:text-start">
            Make an order easily
          </h3>
        </div>
        <div className="flex flex-col gap-4 md:grid md:gap-6 md:grid-cols-3 md:col-span-9">
          <Card className="bg-[#1E2631] text-white w-80">
            <CardContent className="p-6 space-y-6">
              <div className="size-16 rounded-full bg-[#F26E41] flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">Select Product</h3>
              <p className="text-gray-300">
                Choose as many coffees as you want from our selection of quality
                beans from all over the world.
              </p>
            </CardContent>
          </Card>
          <Card className="w-80">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-center bg-gray-100 rounded-full size-16">
                <CreditCard className="h-8 w-8 text-[#F26E41]" />
              </div>
              <h3 className="text-xl font-bold">Make Payment</h3>
              <p className="text-gray-500">
                Payment is simple and fast. We accept all major credit cards and
                mobile payment methods.
              </p>
            </CardContent>
          </Card>
          <Card className="w-80">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-center bg-gray-100 rounded-full size-16">
                <Package2 className="h-8 w-8 text-[#F26E41]" />
              </div>
              <h3 className="text-xl font-bold">Receive Product</h3>
              <p className="text-gray-500">
                Your coffee beans will be delivered to your doorstep in
                eco-friendly packaging within 2-3 business days.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
