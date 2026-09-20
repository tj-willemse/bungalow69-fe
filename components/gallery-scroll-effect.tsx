"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./gallery-scroll-effect.module.css";

const galleryImages = [
  { src: "/images/gallery/141.webp", width: 1200, height: 675, alt: "Aerial view of Bungalow 69 beneath the Twelve Apostles" },
  { src: "/images/gallery/142.webp", width: 1200, height: 800, alt: "Pool terrace overlooking Clifton Fourth Beach" },
  { src: "/images/gallery/143.webp", width: 1200, height: 1600, alt: "Cushioned lounge seating at Bungalow 69" },
  { src: "/images/gallery/144.webp", width: 1200, height: 1600, alt: "Ocean view framed by the villa interior" },
  { src: "/images/gallery/145.webp", width: 1200, height: 800, alt: "Clifton Fourth Beach viewed from the villa" },
  { src: "/images/gallery/146.webp", width: 1200, height: 1600, alt: "Dining table beneath a sculptural pendant light" },
  { src: "/images/gallery/147.webp", width: 1200, height: 800, alt: "Open-plan kitchen and dining area" },
  { src: "/images/gallery/148.webp", width: 1200, height: 800, alt: "Bright kitchen and breakfast counter" },
  { src: "/images/gallery/149.webp", width: 1200, height: 800, alt: "Shaded ocean terrace with outdoor seating" },
  { src: "/images/gallery/150.webp", width: 1200, height: 1484, alt: "Kitchen opening onto a stone courtyard" },
  { src: "/images/gallery/151.webp", width: 1200, height: 1600, alt: "Layered cushions in the living room" },
  { src: "/images/gallery/152.webp", width: 1200, height: 1600, alt: "Dining table set for an evening at the villa" },
  { src: "/images/gallery/153.webp", width: 1200, height: 1600, alt: "Coastal floral arrangement and dining detail" },
  { src: "/images/gallery/154.webp", width: 1200, height: 800, alt: "Open living room with Atlantic views" },
  { src: "/images/gallery/155.webp", width: 1200, height: 1600, alt: "Soft furnishings and nautical artwork" },
  { src: "/images/gallery/156.webp", width: 1200, height: 1600, alt: "Comfortable television lounge" },
  { src: "/images/gallery/157.webp", width: 1200, height: 800, alt: "Dining space beside the glass staircase" },
  { src: "/images/gallery/158.webp", width: 1200, height: 1600, alt: "Glass staircase and interior planting" },
  { src: "/images/gallery/159.webp", width: 1200, height: 1600, alt: "Quiet reading nook with striped armchairs" },
  { src: "/images/gallery/160.webp", width: 1200, height: 900, alt: "Children's bunk bedroom" },
  { src: "/images/gallery/161.webp", width: 1200, height: 1600, alt: "Striped lounge chair and coffee table" },
  { src: "/images/gallery/162.webp", width: 1200, height: 1600, alt: "Interior decor beside the staircase" },
  { src: "/images/gallery/163.webp", width: 1200, height: 800, alt: "Open-plan lower level of Bungalow 69" },
  { src: "/images/gallery/164.webp", width: 1200, height: 1600, alt: "Bedroom with patterned feature wall" },
  { src: "/images/gallery/165.webp", width: 1200, height: 1600, alt: "Layered cushions in a guest bedroom" },
  { src: "/images/gallery/166.webp", width: 1200, height: 800, alt: "Outdoor shower in a leafy courtyard" },
  { src: "/images/gallery/167.webp", width: 1200, height: 800, alt: "Bright bathroom at Bungalow 69" },
  { src: "/images/gallery/168.webp", width: 960, height: 640, alt: "Bedroom opening to a blue Atlantic view" },
  { src: "/images/gallery/169.webp", width: 960, height: 640, alt: "Sea-view bedroom at dusk" },
  { src: "/images/gallery/170.webp", width: 1200, height: 1600, alt: "Curated coastal shelf detail" },
  { src: "/images/gallery/171.webp", width: 1200, height: 1600, alt: "Bathroom with open shelving" },
  { src: "/images/gallery/172.webp", width: 1200, height: 800, alt: "Spacious white bathroom" },
  { src: "/images/gallery/173.webp", width: 1200, height: 1600, alt: "Calm guest bedroom" },
  { src: "/images/gallery/174.webp", width: 1200, height: 1600, alt: "Guest bed prepared for arrival" },
  { src: "/images/gallery/175.webp", width: 1200, height: 800, alt: "Stone-walled courtyard detail" },
  { src: "/images/gallery/176.webp", width: 1200, height: 1600, alt: "Natural branch artwork in the villa" },
  { src: "/images/gallery/177.webp", width: 1200, height: 1600, alt: "Bunk bedroom with graphic coastal decor" },
  { src: "/images/gallery/179.webp", width: 960, height: 640, alt: "Clifton coastline glowing at dusk" },
  { src: "/images/gallery/180.webp", width: 1024, height: 768, alt: "Night lights along the Clifton coastline" },
  { src: "/images/gallery/181.webp", width: 1200, height: 675, alt: "Bungalow 69 among the homes of Clifton" },
  { src: "/images/gallery/182.webp", width: 1200, height: 675, alt: "Aerial view of Clifton between mountain and sea" },
] as const;

export function GalleryScrollEffect() {
  const rootRef = useRef<HTMLElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedImageIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImageIndex(null);
      if (event.key === "ArrowLeft") {
        setSelectedImageIndex((current) =>
          current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length,
        );
      }
      if (event.key === "ArrowRight") {
        setSelectedImageIndex((current) =>
          current === null ? null : (current + 1) % galleryImages.length,
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
    <section ref={rootRef} className={styles.effect} aria-labelledby="gallery-title">
      <h1 id="gallery-title" className="sr-only">
        Bungalow 69 gallery
      </h1>
      <div className={styles.pinHeight}>
        <div className={styles.container}>
          {galleryImages.map((image, imageIndex) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Open full-screen image: ${image.alt}`}
              onClick={() => setSelectedImageIndex(imageIndex)}
              className={`${styles.mediaButton} ${
                image.height > image.width ? styles.portrait : ""
              } ${imageIndex === galleryImages.length - 1 ? styles.closingImage : ""}`}
            >
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                loading={imageIndex < 8 ? "eager" : "lazy"}
                unoptimized
                className={styles.media}
              />
            </button>
          ))}
        </div>
      </div>

      {selectedImageIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full-screen gallery image"
          data-lenis-prevent
          className="fixed inset-0 z-[70] bg-white"
        >
          <div className="absolute inset-5 sm:inset-8 lg:inset-12">
            <Image
              src={galleryImages[selectedImageIndex].src}
              alt={galleryImages[selectedImageIndex].alt}
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
            className="fixed top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-[6px] border border-brand-oyster bg-white text-brand-espresso transition-colors hover:border-brand-sand hover:text-brand-sand sm:top-8 sm:right-8"
          >
            <span aria-hidden="true" className="absolute h-px w-5 rotate-45 bg-current" />
            <span aria-hidden="true" className="absolute h-px w-5 -rotate-45 bg-current" />
          </button>

          <button
            type="button"
            aria-label="Previous image"
            onClick={() =>
              setSelectedImageIndex(
                (selectedImageIndex - 1 + galleryImages.length) % galleryImages.length,
              )
            }
            className="fixed top-1/2 left-3 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-[6px] border border-brand-oyster bg-white/90 text-xl text-brand-espresso transition-colors hover:border-brand-sand hover:text-brand-sand sm:left-6"
          >
            <span aria-hidden="true">←</span>
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={() => setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length)}
            className="fixed top-1/2 right-3 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-[6px] border border-brand-oyster bg-white/90 text-xl text-brand-espresso transition-colors hover:border-brand-sand hover:text-brand-sand sm:right-6"
          >
            <span aria-hidden="true">→</span>
          </button>

          <p className="fixed bottom-5 left-1/2 z-10 -translate-x-1/2 bg-white/90 px-3 py-2 text-[0.6rem] font-bold tracking-[0.18em] text-brand-espresso uppercase sm:bottom-8">
            {String(selectedImageIndex + 1).padStart(2, "0")} / {galleryImages.length}
          </p>
        </div>
      ) : null}
    </section>
  );
}
