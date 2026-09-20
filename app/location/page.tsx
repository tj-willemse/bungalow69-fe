import type { Metadata } from "next";
import Image from "next/image";
import { House } from "lucide-react";
import { LightboxImage } from "@/components/lightbox-image";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Location",
  description: "Find Bungalow 69 beside Clifton Fourth Beach, within easy reach of Cape Town's Atlantic Seaboard.",
  path: "/location",
});

const cliftonImages = [
  { src: "/images/clifton-fourth-beach-hero.webp", alt: "Clifton Fourth Beach at golden hour" },
  { src: "/images/bungalow-69-clifton-aerial.webp", alt: "Bungalow 69 beneath the Twelve Apostles" },
  { src: "/images/clifton-fourth-beach-view.webp", alt: "Clifton Fourth Beach and the Atlantic coastline" },
  { src: "/images/clifton-between-mountain-and-sea.webp", alt: "Clifton between mountain and sea" },
  { src: "/images/clifton-blue-hour-menu.webp", alt: "Clifton coastline illuminated at blue hour" },
  { src: "/images/gallery/180.webp", alt: "Night lights along the Clifton coastline" },
] as const;

export default function LocationPage() {
  return (
    <main className="bg-white">
      <section className="relative flex h-svh min-h-[34rem] items-center justify-center overflow-hidden bg-brand-espresso px-5 text-center text-white sm:px-8">
        <Image
          src="/images/clifton-between-mountain-and-sea.webp"
          alt="Aerial view of Clifton between the Twelve Apostles and Atlantic Ocean"
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,14,10,0.2)_0%,rgba(20,14,10,0.34)_100%)]" />
        <h1 className="relative z-10 font-display text-[clamp(4rem,8vw,7.5rem)] leading-[0.88] font-medium tracking-[-0.055em] text-white drop-shadow-md">
          Clifton 4th Beach
        </h1>
      </section>

      <section aria-label="Clifton coastline views" className="relative isolate bg-white">
        {cliftonImages.map((image, index) => (
          <figure
            key={image.src}
            className="sticky top-0 h-svh overflow-hidden bg-brand-cream"
            style={{ zIndex: index + 1 }}
          >
            <LightboxImage
              src={image.src}
              alt={image.alt}
              sizes="100vw"
              className="h-full w-full rounded-none"
            />
          </figure>
        ))}
      </section>

      <section className="px-5 pt-20 pb-24 sm:px-8 sm:pt-28 sm:pb-32 lg:px-12 lg:pt-40 lg:pb-40">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.28fr_0.72fr] lg:items-start lg:gap-16 xl:gap-20">
          <div className="relative overflow-hidden rounded-[6px] bg-brand-cream lg:order-2">
              <iframe
                title="Map showing Clifton Fourth Beach in Cape Town"
                src="https://www.google.com/maps?q=Clifton%204th%20Beach%2C%20Cape%20Town%2C%20South%20Africa&z=14&output=embed"
                className="h-[30rem] w-full border-0 sm:h-[34rem] lg:h-[32rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute top-1/2 left-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-espresso/18 sm:size-28">
                <span className="flex size-12 items-center justify-center rounded-full bg-brand-espresso text-white shadow-[0_8px_24px_rgba(52,42,35,0.25)] sm:size-14">
                  <House aria-hidden="true" className="size-5 fill-current sm:size-6" strokeWidth={2.2} />
                </span>
              </div>
            </div>

          <div className="lg:order-1">
            <h2 className="font-display text-[clamp(3.25rem,5vw,5.5rem)] leading-[0.9] tracking-[-0.05em] text-brand-espresso">
              Cape Town at your doorstep.
            </h2>
            <div className="mt-9 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {[
                ["Clifton Fourth Beach", "Follow the pedestrian path from the villa to the sand below."],
                ["Camps Bay", "Restaurants, cafés and the beachfront promenade sit along the next bay."],
                ["Lion’s Head", "One of Cape Town’s best known walking routes with wide coastal views."],
                ["Sea Point", "A long ocean promenade with cafés, pools and everyday conveniences."],
                ["Table Mountain", "Mountain trails and the cableway are within easy reach of Clifton."],
                ["Cape Town city bowl", "Dining, galleries and the centre of the city are close at hand."],
              ].map(([place, detail]) => (
                <div key={place}>
                  <h3 className="font-display text-2xl text-brand-espresso sm:text-3xl">{place}</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-espresso/65">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
