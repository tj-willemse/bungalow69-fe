import type { Metadata } from "next";
import Image from "next/image";
import { LightboxImage } from "@/components/lightbox-image";
import { ScrollingSpaceSection } from "@/components/scrolling-space-section";
import { SectionScrollNav } from "@/components/section-scroll-nav";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Rooms & Spaces",
  description: "Explore the bedrooms, living spaces, pool terrace and ocean-facing areas at Bungalow 69 Clifton.",
  path: "/rooms-and-spaces",
});

const spaces = [
  { id: "living", nav: "Living", eyebrow: "Gather", title: "Living & dining", description: "Light-filled shared spaces bring everyone together, with wide openings that keep the ocean in view throughout the day.", images: [{ src: "/images/gallery/154.webp", alt: "Open living room with Atlantic views" }, { src: "/images/gallery/147.webp", alt: "Open-plan dining area at Bungalow 69" }, { src: "/images/gallery/157.webp", alt: "Dining space beside the glass staircase" }] },
  { id: "kitchen", nav: "Kitchen", eyebrow: "Cook", title: "Kitchen & breakfast bar", description: "A practical, fully equipped kitchen opens directly into the main living area, making relaxed breakfasts and shared dinners easy.", images: [{ src: "/images/gallery/148.webp", alt: "Bright kitchen and breakfast counter" }, { src: "/images/gallery/146.webp", alt: "Dining table beneath a sculptural pendant light" }, { src: "/images/gallery/150.webp", alt: "Kitchen opening onto a stone courtyard" }] },
  { id: "bedrooms", nav: "Bedrooms", eyebrow: "Rest", title: "Four bedrooms", description: "Each bedroom has its own calm character, with soft natural light, considered details and spaces designed for an unhurried stay.", images: [{ src: "/images/gallery/168.webp", alt: "Bedroom opening to a blue Atlantic view" }, { src: "/images/gallery/164.webp", alt: "Bedroom with a patterned feature wall" }] },
  { id: "bathrooms", nav: "Bathrooms", eyebrow: "Refresh", title: "Bathrooms & outdoor shower", description: "Bright bathrooms and a private outdoor shower bring a fresh, easy rhythm to mornings after the beach.", images: [{ src: "/images/gallery/167.webp", alt: "Bright bathroom at Bungalow 69" }, { src: "/images/gallery/166.webp", alt: "Outdoor shower in a leafy courtyard" }, { src: "/images/gallery/172.webp", alt: "Spacious white bathroom at Bungalow 69" }] },
  { id: "pool", nav: "Pool", eyebrow: "Unwind", title: "Pool & ocean terrace", description: "The private heated pool sits at the centre of the ocean-facing deck, with space to swim, stretch out and settle in for sunset.", images: [{ src: "/images/gallery/142.webp", alt: "Private pool terrace overlooking Clifton Fourth Beach" }, { src: "/images/gallery/149.webp", alt: "Shaded ocean terrace with outdoor seating" }, { src: "/images/villa-pool-at-dusk.webp", alt: "Private pool and terrace at dusk" }] },
  { id: "loft", nav: "Loft", eyebrow: "Retreat", title: "Loft & fireplace", description: "An upstairs loft and indoor fireplace offer a quieter corner of the house when the evening cools.", images: [{ src: "/images/gallery/156.webp", alt: "Comfortable television lounge" }, { src: "/images/gallery/159.webp", alt: "Quiet reading nook with striped armchairs" }, { src: "/images/gallery/161.webp", alt: "Striped lounge chair and coffee table" }] },
] as const;

const bedrooms = [
  {
    title: "Bedroom one",
    description: "A bright sea-facing room that opens towards the Atlantic view.",
    images: [
      { src: "/images/gallery/168.webp", alt: "Sea-facing bedroom opening towards the Atlantic" },
      { src: "/images/gallery/169.webp", alt: "Sea-facing bedroom at dusk" },
    ],
  },
  {
    title: "Bedroom two",
    description: "A calm double bedroom with a patterned feature wall and soft natural light.",
    images: [
      { src: "/images/gallery/164.webp", alt: "Double bedroom with a patterned feature wall" },
      { src: "/images/gallery/165.webp", alt: "Layered cushions in the second bedroom" },
    ],
  },
  {
    title: "Bedroom three",
    description: "A restful guest room with a simple, comfortable coastal palette.",
    images: [
      { src: "/images/gallery/173.webp", alt: "Calm guest bedroom at Bungalow 69" },
      { src: "/images/gallery/174.webp", alt: "Guest bed prepared for arrival" },
    ],
  },
  {
    title: "Bunk bedroom",
    description: "A dedicated bunk room that gives younger guests a space of their own.",
    images: [
      { src: "/images/gallery/160.webp", alt: "Children's bunk bedroom at Bungalow 69" },
      { src: "/images/gallery/177.webp", alt: "Bunk bedroom with graphic coastal decor" },
    ],
  },
] as const;

export default function RoomsAndSpacesPage() {
  return (
    <main className="bg-white">
      <section className="relative flex h-svh min-h-[34rem] items-center justify-center overflow-hidden bg-brand-espresso px-5 text-center text-white sm:px-8">
        <Image
          src="/images/rooms-and-spaces-living-hero.webp"
          alt="Open-plan living room with Atlantic Ocean views at Bungalow 69"
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,14,10,0.22)_0%,rgba(20,14,10,0.36)_100%)]" />
        <div className="relative z-10">
          <h1 className="font-display text-[clamp(4rem,8vw,7.5rem)] leading-[0.88] font-medium tracking-[-0.055em] text-white drop-shadow-md">
            Rooms & Spaces
          </h1>
        </div>
      </section>

      <SectionScrollNav label="Rooms and spaces sections" links={spaces.map(({ id, nav }) => ({ id, label: nav }))} />

      {spaces.map((space, index) => (
        <section id={space.id} key={space.id} className="scroll-mt-0 border-b border-brand-oyster/80 px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
          {space.id === "bedrooms" ? (
            <div className="mx-auto max-w-[1440px]">
              <div className="max-w-3xl">
                <h2 className="font-display text-[clamp(3.25rem,5vw,6rem)] leading-[0.9] font-medium tracking-[-0.05em] text-brand-espresso">{space.title}</h2>
                <p className="mt-7 text-[0.95rem] leading-7 text-brand-espresso/68 sm:text-base sm:leading-8">{space.description}</p>
              </div>
              <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-36">
                {bedrooms.map((bedroom, bedroomIndex) => (
                  <article key={bedroom.title} className="grid gap-8 lg:grid-cols-[0.42fr_1.58fr] lg:items-start lg:gap-16">
                    <div className="lg:sticky lg:top-44">
                      <h3 className="font-display text-4xl leading-none text-brand-espresso sm:text-5xl">{bedroom.title}</h3>
                      <p className="mt-5 max-w-sm text-sm leading-7 text-brand-espresso/65">{bedroom.description}</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {bedroom.images.map((image, imageIndex) => (
                        <LightboxImage
                          key={image.src}
                          src={image.src}
                          alt={image.alt}
                          sizes="(min-width: 1024px) 38vw, (min-width: 640px) 50vw, 100vw"
                          className={imageIndex === bedroomIndex % 2 ? "aspect-[3/4]" : "aspect-[3/4] sm:mt-12"}
                        />
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <ScrollingSpaceSection title={space.title} description={space.description} images={space.images} reverse={index % 2 === 1} />
          )}
        </section>
      ))}
    </main>
  );
}
