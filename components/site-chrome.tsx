"use client";

import { usePathname } from "next/navigation";
import { GalleryNavigation } from "@/components/gallery-navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteChrome({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isGallery = pathname === "/gallery";

  return (
    <>
      {!isGallery ? <SiteHeader /> : <GalleryNavigation />}
      {children}
      <SiteFooter />
    </>
  );
}
