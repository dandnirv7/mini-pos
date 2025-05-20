// import Header from "@/components/header";
import { Facebook, Instagram, ShoppingBag, Twitter } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer id="help" className="bg-[#1E2631] text-white py-12 px-12">
      <div className="container p-5">
        <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="size-8 rounded-full bg-[#F26E41] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">Noku</span>
            </div>
            <p className="mb-6 text-gray-400">
              A new normal to cafes.
              <br />
              Seamless, Simple, Better
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="size-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F26E41]"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="size-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F26E41]"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="size-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F26E41]"
              >
                <Instagram className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-bold">How it Works</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Select Product
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Make Payment
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Receive Product
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Coffee
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Tea
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Beans
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Snacks
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Merch
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold">Help</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Download App
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between pt-6 border-t border-white/10 md:flex-row">
          <div className="mb-4 text-sm text-gray-400 md:mb-0">
            &copy; {new Date().getFullYear()} Noku. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-gray-400 hover:text-white">
              Terms
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              Cookies
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
