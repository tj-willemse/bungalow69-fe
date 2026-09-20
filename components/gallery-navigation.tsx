"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigationItems, siteConfig } from "@/lib/site";

export function GalleryNavigation({
  solidBackground = false,
  onOpenChange,
}: {
  solidBackground?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isGalleryPage = pathname === "/gallery";
  const useSolidButtonHover = solidBackground || isOpen;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, onOpenChange]);

  return (
    <>
      {isGalleryPage ? (
        <div className="fixed inset-x-0 top-7 z-50 h-22 bg-white sm:h-24 lg:hidden" />
      ) : null}

      {isGalleryPage && isOpen ? (
        <div className="fixed inset-x-0 top-7 z-50 hidden h-22 bg-white sm:h-24 lg:block" />
      ) : null}

      {isGalleryPage ? (
        <Link
          href="/"
          aria-label="Bungalow 69 Clifton home"
          className="group fixed top-10 left-5 z-[60] inline-flex items-center sm:left-8 lg:left-12"
        >
          <Image
            src={siteConfig.logoImage}
            alt=""
            width={1172}
            height={767}
            unoptimized
            className={`h-16 w-auto object-contain transition-[filter,opacity] duration-300 group-hover:opacity-75 sm:h-[4.5rem] ${
              isOpen ? "" : "lg:brightness-0 lg:invert lg:drop-shadow-md"
            }`}
          />
        </Link>
      ) : null}

      <div className="fixed top-12 right-5 z-[60] flex items-center gap-2 sm:top-15 sm:right-8 lg:right-12">
        <Link
          href={siteConfig.bookingUrl}
          onClick={() => {
            setIsOpen(false);
            onOpenChange?.(false);
          }}
          className={`inline-flex min-h-11 w-[6.25rem] items-center justify-center rounded-[6px] border border-brand-sand bg-brand-sand px-5 text-[0.62rem] font-bold tracking-[0.2em] text-white uppercase shadow-[0_8px_30px_rgba(52,42,35,0.08)] transition-colors duration-300 ${
            useSolidButtonHover
              ? "hover:bg-transparent hover:text-brand-sand"
              : "hover:bg-transparent hover:text-brand-sand lg:hover:border-white/70 lg:hover:text-white"
          }`}
        >
          Book
        </Link>

        <button
          type="button"
          aria-label={isOpen ? "Close gallery navigation" : "Open gallery navigation"}
          aria-expanded={isOpen}
          aria-controls="gallery-navigation"
          onClick={() => {
            const nextOpen = !isOpen;
            setIsOpen(nextOpen);
            onOpenChange?.(nextOpen);
          }}
          className={`relative inline-flex min-h-11 w-[6.25rem] cursor-pointer items-center justify-center rounded-[6px] border bg-white px-5 text-[0.62rem] font-bold tracking-[0.2em] text-brand-espresso uppercase shadow-[0_8px_30px_rgba(52,42,35,0.08)] transition-colors duration-300 ${
            useSolidButtonHover
              ? "border-brand-oyster hover:border-brand-sand hover:bg-transparent hover:text-brand-sand"
              : "border-brand-oyster hover:border-brand-sand hover:bg-transparent hover:text-brand-sand lg:border-white lg:hover:border-white/70 lg:hover:text-white"
          }`}
        >
          <span
            className={`transition-[opacity,transform] duration-300 ${
              isOpen ? "scale-90 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            Menu
          </span>
          <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            <span
              className={`absolute h-px w-5 bg-current transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "rotate-45 opacity-100" : "rotate-0 scale-x-0 opacity-0"
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-current transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "-rotate-45 opacity-100" : "rotate-0 scale-x-0 opacity-0"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="gallery-navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed inset-x-0 top-[7.25rem] bottom-0 z-50 bg-white transition-[opacity,transform] duration-200 ease-out sm:top-[7.75rem] ${
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-5 pb-5 sm:px-8 sm:pb-8 lg:px-12">
          <div className="grid min-h-0 flex-1 gap-8 md:grid-cols-[0.82fr_1.18fr] lg:gap-14 xl:gap-20">
            <div className="flex min-h-0 flex-col pb-6">
              <nav
                aria-label="Gallery navigation"
                className="mt-6 flex w-full max-w-2xl flex-col self-start"
              >
                {navigationItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={item.href === pathname ? "page" : undefined}
                    onClick={() => {
                      setIsOpen(false);
                      onOpenChange?.(false);
                    }}
                    className={`group flex items-baseline justify-between border-b border-brand-oyster py-3 font-display text-[clamp(2rem,4vw,4rem)] leading-[0.95] transition-colors hover:text-brand-sand sm:py-4 ${
                      item.href === pathname ? "text-brand-sand" : "text-brand-espresso"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-sans text-[0.56rem] font-bold tracking-[0.18em] text-brand-sand">
                      0{index + 1}
                    </span>
                  </Link>
                ))}
              </nav>

            </div>

            <figure className="group relative my-6 hidden min-h-0 overflow-hidden rounded-[6px] bg-brand-cream md:block">
              <Image
                src="/images/clifton-blue-hour-menu.webp"
                alt="Clifton coastline and mountain illuminated at blue hour"
                fill
                sizes="(min-width: 1280px) 54vw, 50vw"
                unoptimized
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
              />
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}
