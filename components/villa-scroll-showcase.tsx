import Image from "next/image";

const villaScenes = [
  {
    src: "/images/bungalow-69-clifton-aerial.webp",
    alt: "Aerial view of Bungalow 69 beneath the Twelve Apostles",
  },
  {
    src: "/images/villa-open-living.webp",
    alt: "Open-plan living and dining space at Bungalow 69 with Atlantic Ocean views",
  },
  {
    src: "/images/villa-ocean-terrace.webp",
    alt: "Ocean-facing outdoor terrace at Bungalow 69",
  },
  {
    src: "/images/villa-sea-view-bedroom.webp",
    alt: "Bright bedroom at Bungalow 69 with a wide view across the Atlantic",
  },
  {
    src: "/images/clifton-fourth-beach-view.webp",
    alt: "Clifton Fourth Beach and the Atlantic coastline viewed from Bungalow 69",
  },
  {
    src: "/images/villa-pool-at-dusk.webp",
    alt: "Bungalow 69 opening onto its private pool and Atlantic view at dusk",
  },
  {
    src: "/images/clifton-between-mountain-and-sea.webp",
    alt: "Aerial view of Clifton between the Twelve Apostles and the Atlantic Ocean",
  },
] as const;

export function VillaScrollShowcase() {
  return (
    <section aria-labelledby="villa-showcase-title" className="relative isolate bg-white">
      <h2 id="villa-showcase-title" className="sr-only">
        Explore Bungalow 69
      </h2>

      {villaScenes.map((scene, index) => (
        <figure
          key={scene.src}
          className="sticky top-0 h-svh overflow-hidden bg-brand-cream"
          style={{ zIndex: index + 1 }}
        >
          <Image
            src={scene.src}
            alt={scene.alt}
            fill
            sizes="100vw"
            className="object-cover"
            unoptimized
          />
        </figure>
      ))}
    </section>
  );
}
