"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GalleryNavigation } from "@/components/gallery-navigation";
import { navigationItems, siteConfig } from "@/lib/site";

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
      className={`${hasTransparentHero ? "fixed inset-x-0 top-0" : "sticky top-0"} z-20`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 z-0 bg-white transition-transform duration-200 ease-out ${
          showSolidHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      />

      <div className="relative z-10 px-5 sm:px-8 lg:px-12">
        <div className="relative mx-auto flex h-22 max-w-[1440px] items-center sm:h-24 lg:translate-y-1">
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
              className={`h-16 w-auto object-contain transition-[filter,opacity] duration-300 sm:h-20 ${
                showSolidHeader
                  ? "group-hover:opacity-75"
                  : "brightness-0 invert drop-shadow-md group-hover:opacity-75"
              }`}
            />
          </Link>

          <nav
            aria-label="Primary navigation"
            className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 text-[0.56rem] font-bold tracking-[0.16em] uppercase lg:flex xl:gap-9 ${
              showSolidHeader ? "text-brand-espresso" : "text-white drop-shadow-md"
            }`}
          >
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.href === pathname ? "page" : undefined}
                className={`whitespace-nowrap transition-opacity hover:opacity-60 ${
                  item.href === pathname ? "opacity-60" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <GalleryNavigation solidBackground={showSolidHeader} onOpenChange={setIsMenuOpen} />
    </header>
  );
}
