import { MetadataRoute } from "next";
import { domainPath } from "@/data";
import dayjs from "dayjs";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: domainPath,
      lastModified: dayjs().toISOString(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
