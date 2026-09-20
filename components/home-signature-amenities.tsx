"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AirVent,
  CookingPot,
  Flame,
  Footprints,
  UtensilsCrossed,
  WashingMachine,
  Waves,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const amenityEssentials: ReadonlyArray<{ label: string; icon: LucideIcon }> = [
  { label: "Heated pool", icon: Waves },
  { label: "Direct beach access", icon: Footprints },
  { label: "High-speed Wi-Fi", icon: Wifi },
  { label: "Air conditioning", icon: AirVent },
  { label: "Indoor fireplace", icon: Flame },
  { label: "Fully equipped kitchen", icon: CookingPot },
  { label: "Laundry facilities", icon: WashingMachine },
  { label: "Outdoor dining & barbecue", icon: UtensilsCrossed },
];

const signatureAmenities = [
  {
    title: "Direct beach access",
    description:
      "A well-kept pathway leads from the front door to Clifton Fourth Beach in just 44 steps.",
    image: "/images/gallery/145.webp",
    imageAlt: "Clifton Fourth Beach viewed from Bungalow 69",
  },
  {
    title: "Private heated pool",
    description:
      "An ocean-facing outdoor pool sits at the centre of the villa’s private deck.",
    image: "/images/gallery/142.webp",
    imageAlt: "Private pool and ocean-facing deck at Bungalow 69",
  },
  {
    title: "Panoramic ocean views",
    description:
      "The home looks across Clifton Fourth and the Atlantic from its living spaces, bedrooms and terraces.",
    image: "/images/gallery/144.webp",
    imageAlt: "Atlantic Ocean view framed by the villa interior",
  },
  {
    title: "Outdoor dining & barbecue",
    description:
      "Open the living area onto the deck for long lunches, sunset dinners and relaxed evenings by the pool.",
    image: "/images/villa-pool-at-dusk.webp",
    imageAlt: "Dining area opening onto the pool deck at dusk",
  },
  {
    title: "Loft & fireplace",
    description:
      "A cosy upstairs loft and indoor fireplace offer a quiet retreat when the evening cools.",
    image: "/images/gallery/156.webp",
    imageAlt: "Cosy lounge and fireplace area at Bungalow 69",
  },
  {
    title: "Private patio & balcony",
    description:
      "Multiple outdoor spaces create room to slow down and take in the coastline from above the beach.",
    image: "/images/gallery/149.webp",
    imageAlt: "Private ocean-facing patio with outdoor seating",
  },
  {
    title: "Fully equipped kitchen",
    description:
      "A complete kitchen with oven, dishwasher, coffee maker, cookware and generous dining essentials.",
    image: "/images/gallery/148.webp",
    imageAlt: "Fully equipped kitchen and breakfast counter",
  },
  {
    title: "Comfort throughout",
    description:
      "Air conditioning, ceiling fans, heating, Wi-Fi, laundry facilities and cleaning available during the stay.",
    image: "/images/gallery/163.webp",
    imageAlt: "Bright open-plan interior at Bungalow 69",
  },
] as const;

export function HomeSignatureAmenities() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedImageIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImageIndex(null);
      if (event.key === "ArrowLeft") {
        setSelectedImageIndex((current) =>
          current === null
            ? null
            : (current - 1 + signatureAmenities.length) % signatureAmenities.length,
        );
      }
      if (event.key === "ArrowRight") {
        setSelectedImageIndex((current) =>
          current === null ? null : (current + 1) % signatureAmenities.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImageIndex]);

  return (
    <section
      aria-labelledby="signature-amenities-title"
      className="relative z-10 border-t border-brand-oyster/70 bg-white px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40"
    >
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 xl:gap-24">
        <div>
          <div className="lg:sticky lg:top-32">
            <h2
              id="signature-amenities-title"
              className="max-w-xl font-display text-[clamp(3.4rem,6vw,6.5rem)] leading-[0.88] font-medium tracking-[-0.055em] text-brand-espresso"
            >
              Made for days by the sea.
            </h2>
            <p className="mt-8 max-w-md text-[0.95rem] leading-7 text-brand-espresso/70">
              Start the morning on Clifton Fourth, then come home for an evening beside the pool.
            </p>

            <ul className="mt-9 grid max-w-xl sm:grid-cols-2">
              {amenityEssentials.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="flex min-h-14 items-center gap-3.5 border-b border-brand-oyster/80 py-3 text-[0.82rem] text-brand-espresso/80 sm:odd:border-r sm:odd:pr-5 sm:even:pl-5"
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.45}
                    className="h-[1.1rem] w-[1.1rem] shrink-0 text-brand-sand"
                  />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/rooms-and-spaces"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-[6px] border border-brand-sand bg-brand-sand px-7 text-[0.62rem] font-bold tracking-[0.18em] text-white uppercase transition-colors hover:bg-transparent hover:text-brand-sand"
            >
              Explore all rooms &amp; amenities
            </Link>

          </div>
        </div>

        <div>
          <ol>
            {signatureAmenities.map((amenity, index) => (
              <li
                key={amenity.title}
                className="grid gap-6 border-b border-brand-oyster py-8 sm:py-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(23rem,1.32fr)] lg:items-center lg:gap-8 xl:grid-cols-[minmax(0,0.66fr)_minmax(27rem,1.34fr)] xl:gap-10"
              >
                <div>
                  <h3 className="font-display text-[clamp(2rem,3.2vw,3.75rem)] leading-none tracking-[-0.035em] text-brand-espresso">
                    {amenity.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-[0.92rem] leading-7 text-brand-espresso/70">
                    {amenity.description}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Open full-screen image: ${amenity.imageAlt}`}
                  onClick={() => setSelectedImageIndex(index)}
                  className="group relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[6px] border-0 bg-brand-cream p-0 lg:aspect-[5/4]"
                >
                  <Image
                    src={amenity.image}
                    alt={amenity.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 38vw, (min-width: 1024px) 36vw, (min-width: 640px) calc(100vw - 8rem), calc(100vw - 2.5rem)"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                    unoptimized
                  />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {selectedImageIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full-screen amenity image"
          data-lenis-prevent
          className="fixed inset-0 z-[70] bg-white"
        >
          <div className="absolute inset-5 sm:inset-8 lg:inset-12">
            <Image
              src={signatureAmenities[selectedImageIndex].image}
              alt={signatureAmenities[selectedImageIndex].imageAlt}
              fill
              sizes="100vw"
              unoptimized
              className="object-contain"
            />
          </div>

          <button
            type="button"
            aria-label="Close full-screen image"
            onClick={() => setSelectedImageIndex(null)}
            className="fixed top-5 right-5 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-[6px] border border-brand-oyster bg-white text-brand-espresso transition-colors hover:border-brand-sand hover:text-brand-sand sm:top-8 sm:right-8"
          >
            <span aria-hidden="true" className="absolute h-px w-5 rotate-45 bg-current" />
            <span aria-hidden="true" className="absolute h-px w-5 -rotate-45 bg-current" />
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={() =>
              setSelectedImageIndex(
                (selectedImageIndex - 1 + signatureAmenities.length) % signatureAmenities.length,
              )
            }
            className="fixed top-1/2 left-3 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[6px] border border-brand-oyster bg-white/90 text-xl text-brand-espresso transition-colors hover:border-brand-sand hover:text-brand-sand sm:left-6"
          >
            <span aria-hidden="true">←</span>
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={() =>
              setSelectedImageIndex((selectedImageIndex + 1) % signatureAmenities.length)
            }
            className="fixed top-1/2 right-3 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[6px] border border-brand-oyster bg-white/90 text-xl text-brand-espresso transition-colors hover:border-brand-sand hover:text-brand-sand sm:right-6"
          >
            <span aria-hidden="true">→</span>
          </button>

          <p className="fixed bottom-5 left-1/2 z-10 -translate-x-1/2 bg-white/90 px-3 py-2 text-[0.6rem] font-bold tracking-[0.18em] text-brand-espresso uppercase sm:bottom-8">
            {String(selectedImageIndex + 1).padStart(2, "0")} / {signatureAmenities.length}
          </p>
        </div>
      ) : null}
    </section>
  );
}
