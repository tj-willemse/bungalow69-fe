"use client";

import { usePathname } from "next/navigation";
import { GalleryNavigation } from "@/components/gallery-navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SisterVillaBanner } from "@/components/sister-villa-banner";

export function SiteChrome({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isGallery = pathname === "/gallery";

  return (
    <>
      <SisterVillaBanner />
      <div aria-hidden="true" className="h-7" />
      {!isGallery ? <SiteHeader /> : <GalleryNavigation />}
      {children}
      {!isGallery ? <SiteFooter /> : null}
    </>
  );
}
