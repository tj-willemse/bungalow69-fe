"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LightboxImage } from "@/components/lightbox-image";

type SpaceImage = { src: string; alt: string; title?: string; description?: string };

export function ScrollingSpaceSection({
  title,
  description,
  images,
  reverse = false,
}: {
  title: string;
  description: string;
  images: readonly SpaceImage[];
  reverse?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    const gallery = galleryRef.current;
    if (!root || !gallery || images.length < 2) return;

    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const frames = Array.from(gallery.querySelectorAll<HTMLElement>("[data-space-frame]"));
      const thumbnails = Array.from(gallery.querySelectorAll<HTMLElement>("[data-space-thumb]"));
      gsap.set(frames, { autoAlpha: 0, scale: 1.035 });
      gsap.set(frames[0], { autoAlpha: 1, scale: 1 });
      gsap.set(thumbnails, { opacity: 0.38, scale: 0.96 });
      gsap.set(thumbnails[0], { opacity: 1, scale: 1 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top+=144",
          end: () => `+=${Math.max(window.innerHeight * 0.72 * (images.length - 1), 900)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      });

      for (let index = 1; index < frames.length; index += 1) {
        timeline
          .to(frames[index - 1], { autoAlpha: 0, scale: 1.018, y: -10, duration: 0.45 }, index - 1)
          .to(thumbnails[index - 1], { opacity: 0.38, scale: 0.96, duration: 0.3 }, index - 1)
          .fromTo(
            frames[index],
            { autoAlpha: 0, scale: 1.04, y: 18 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.55 },
            index - 1 + 0.3,
          )
          .to(thumbnails[index], { opacity: 1, scale: 1, duration: 0.35 }, index - 1 + 0.3);
      }
    });

    return () => media.revert();
  }, [images.length]);

  return (
    <div
      ref={rootRef}
      className={`mx-auto grid max-w-[1440px] gap-12 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-2 lg:items-center lg:gap-20 xl:gap-28 ${
        reverse ? "lg:[&>div:first-child]:order-2" : ""
      }`}
    >
      <div>
        <h2 className="max-w-xl font-display text-[clamp(3.25rem,5vw,6rem)] leading-[0.9] font-medium tracking-[-0.05em] text-brand-espresso">
          {title}
        </h2>
        <p className="mt-7 max-w-lg text-[0.95rem] leading-7 text-brand-espresso/68 sm:text-base sm:leading-8">
          {description}
        </p>
      </div>

      <div ref={galleryRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_0.34fr] lg:gap-4">
        <div className="contents lg:relative lg:block lg:aspect-[4/5] lg:max-h-[72vh]">
          {images.map((image, index) => (
            <div
              key={image.src}
              data-space-frame
              className={`relative aspect-[4/5] lg:absolute lg:inset-0 lg:aspect-auto ${
                index === images.length - 1 && images.length % 2 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <LightboxImage
                src={image.src}
                alt={image.alt}
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 50vw, 100vw"
                className="absolute inset-0 h-full w-full"
              />
              <span className="pointer-events-none absolute right-4 bottom-4 z-20 rounded-[6px] bg-white/92 px-3 py-2 text-[0.52rem] font-bold tracking-[0.16em] text-brand-espresso">
                {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              {image.title ? (
                <div className="pointer-events-none absolute right-4 bottom-4 left-4 z-10 rounded-[6px] bg-white/94 p-5 pr-20 backdrop-blur-sm sm:p-6 sm:pr-24">
                  <h3 className="font-display text-3xl leading-none text-brand-espresso sm:text-4xl">
                    {image.title}
                  </h3>
                  {image.description ? (
                    <p className="mt-3 max-w-md text-xs leading-5 text-brand-espresso/68 sm:text-sm sm:leading-6">
                      {image.description}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="hidden min-h-0 grid-rows-3 gap-3 lg:grid">
          {images.map((image) => (
            <div key={image.src} data-space-thumb className="relative min-h-0 overflow-hidden rounded-[6px] ring-1 ring-brand-sand/40">
              <LightboxImage
                src={image.src}
                alt={image.alt}
                sizes="12vw"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
