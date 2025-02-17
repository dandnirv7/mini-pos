import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL_DEV: process.env.BASE_URL_DEV,
    NEXT_PUBLIC_API_URL_PROD: process.env.BASE_URL_PROD,
  },
};

export default nextConfig;
