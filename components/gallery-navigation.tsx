"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigationItems, siteConfig } from "@/lib/site";

export function GalleryNavigation({
  solidBackground = false,
}: {
  solidBackground?: boolean;
}) {
  const pathname = usePathname();
  const isGalleryPage = pathname === "/gallery";
  const [isGalleryScrolled, setIsGalleryScrolled] = useState(false);
  const useSolidButtonHover = isGalleryPage ? isGalleryScrolled : solidBackground;

  useEffect(() => {
    if (!isGalleryPage) return;

    const updateHeader = () => setIsGalleryScrolled(window.scrollY > 40);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, [isGalleryPage]);

  return (
    <>
      {isGalleryPage ? (
        <div
          className={`fixed inset-x-0 top-0 z-50 h-22 bg-white transition-[background-color,box-shadow] duration-300 sm:h-24 ${
            isGalleryScrolled
              ? "lg:bg-white lg:shadow-[0_8px_30px_rgba(52,42,35,0.08)]"
              : "lg:bg-transparent lg:bg-gradient-to-b lg:from-black/45 lg:to-transparent"
          }`}
        />
      ) : null}

      {isGalleryPage ? (
        <Link
          href="/"
          aria-label="Bungalow 69 Clifton home"
          className="group fixed top-3 left-5 z-[60] inline-flex items-center sm:left-8 lg:left-12"
        >
          <Image
            src={siteConfig.logoImage}
            alt=""
            width={1172}
            height={767}
            unoptimized
            className={`h-16 w-auto object-contain transition-[filter,opacity] duration-300 group-hover:opacity-75 sm:h-[4.5rem] ${
              isGalleryScrolled ? "" : "lg:brightness-0 lg:invert lg:drop-shadow-md"
            }`}
          />
        </Link>
      ) : null}

      {isGalleryPage ? (
        <nav
          aria-label="Primary navigation"
          className={`fixed top-[2.55rem] left-1/2 z-[60] hidden -translate-x-1/2 items-center gap-7 text-[0.56rem] font-bold tracking-[0.16em] uppercase transition-colors duration-300 lg:flex xl:gap-9 ${
            isGalleryScrolled ? "text-brand-espresso" : "text-white drop-shadow-md"
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
      ) : null}

      <div className="fixed top-5 right-5 z-[60] flex items-center gap-2 sm:top-8 sm:right-8 lg:right-12">
        <Link
          href={siteConfig.bookingUrl}
          className={`inline-flex min-h-11 w-[6.25rem] items-center justify-center rounded-[6px] border border-brand-sand bg-brand-sand px-5 text-[0.62rem] font-bold tracking-[0.2em] text-white uppercase shadow-[0_8px_30px_rgba(52,42,35,0.08)] transition-colors duration-300 ${
            useSolidButtonHover
              ? "hover:bg-transparent hover:text-brand-sand"
              : "hover:bg-transparent hover:text-brand-sand lg:hover:border-white/70 lg:hover:text-white"
          }`}
        >
          Book
        </Link>

        <a
          href={siteConfig.sisterVillaUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Visit Bakoven Palms, Camps Bay Villa"
          className={`inline-flex min-h-11 items-center justify-center gap-2 px-1 transition-opacity duration-300 hover:opacity-70 sm:gap-2.5 ${
            useSolidButtonHover
              ? "text-brand-espresso"
              : "text-brand-espresso lg:text-white lg:drop-shadow-md"
          }`}
        >
          <Image
            src={siteConfig.sisterVillaLogo}
            alt=""
            width={638}
            height={656}
            unoptimized
            className="h-8 w-auto shrink-0 object-contain sm:h-9"
          />
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-[0.43rem] font-bold tracking-[0.12em] uppercase">
              Bakoven Palms
            </span>
            <span className="mt-0.5 block text-[0.4rem] font-semibold tracking-[0.1em] uppercase opacity-75">
              Camps Bay
            </span>
          </span>
        </a>
      </div>
    </>
  );
}
