import type { Metadata } from "next";
import { GalleryScrollEffect } from "@/components/gallery-scroll-effect";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Gallery",
  description: "View the interiors, pool terrace, ocean views and beachside setting of Bungalow 69 in Clifton, Cape Town.",
  path: "/gallery",
});

export default function GalleryPage() {
  return <GalleryScrollEffect />;
}
