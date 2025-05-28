import { domainPath } from "@/data";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/login",
          "/register",
          "/errors/",
          "/dashboard",
          "/user",
        ],
      },
    ],
    sitemap: `${domainPath}/sitemap.xml`,
  };
}
