"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function LightboxImage({
  src,
  alt,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  className: string;
  sizes: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label={`View ${alt} full screen`}
        onClick={() => setIsOpen(true)}
        className={`group relative block cursor-zoom-in overflow-hidden rounded-[6px] bg-brand-cream ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
          unoptimized
        />
      </button>

      {isOpen
        ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          data-lenis-prevent
          className="fixed inset-0 z-[100] bg-white"
        >
          <div className="absolute inset-5 sm:inset-8 lg:inset-12">
            <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" unoptimized />
          </div>
          <button
            type="button"
            aria-label="Close full-screen image"
            onClick={() => setIsOpen(false)}
            className="fixed top-5 right-5 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-[6px] border border-brand-oyster bg-white text-brand-espresso transition-colors hover:border-brand-sand hover:text-brand-sand sm:top-8 sm:right-8"
          >
            <span aria-hidden="true" className="absolute h-px w-5 rotate-45 bg-current" />
            <span aria-hidden="true" className="absolute h-px w-5 -rotate-45 bg-current" />
          </button>
        </div>,
        document.body,
          )
        : null}
    </>
  );
}
