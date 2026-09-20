"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GalleryNavigation } from "@/components/gallery-navigation";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const hasTransparentHero =
    pathname === "/" || pathname === "/rooms-and-spaces" || pathname === "/location";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasSolidHeader = !hasTransparentHero || isScrolled;
  const showSolidHeader = hasSolidHeader || isMenuOpen;

  useEffect(() => {
    if (!hasTransparentHero) return;

    const updateHeader = () => setIsScrolled(window.scrollY > 48);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, [hasTransparentHero]);

  return (
    <header
      className={`${hasTransparentHero ? "fixed inset-x-0 top-7" : "sticky top-7"} z-20`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 z-0 bg-white transition-transform duration-200 ease-out ${
          showSolidHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      />

      <div className="relative z-10 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex h-22 max-w-[1440px] items-center sm:h-24">
          <Link
            href="/"
            aria-label="Bungalow 69 Clifton home"
            className="group inline-flex shrink-0 items-center"
          >
            <Image
              src={siteConfig.logoImage}
              alt=""
              width={1172}
              height={767}
              preload
              unoptimized
              sizes="(min-width: 640px) 110px, 98px"
              className={`h-16 w-auto object-contain transition-[filter,opacity] duration-300 sm:h-[4.5rem] ${
                showSolidHeader
                  ? "group-hover:opacity-75"
                  : "brightness-0 invert drop-shadow-md group-hover:opacity-75"
              }`}
            />
          </Link>
        </div>
      </div>

      <GalleryNavigation solidBackground={showSolidHeader} onOpenChange={setIsMenuOpen} />
    </header>
  );
}
