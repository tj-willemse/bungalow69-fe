import type { MetadataRoute } from "next";
import { navigationItems, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/book", siteConfig.url).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  return routes.concat(
    navigationItems
      .filter((item) => item.href !== "/")
      .map((item) => ({
        url: new URL(item.href, siteConfig.url).toString(),
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  );
}
