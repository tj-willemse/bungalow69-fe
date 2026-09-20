import Link from "next/link";
import { ScrollExpand } from "@/components/scroll-expand";

export function HomeLocationFeature() {
  return (
    <section aria-label="Bungalow 69 location">
      <ScrollExpand
        src="/images/location/clifton-view-from-villa.webp"
        alt="Clifton Fourth Beach and the Atlantic Ocean viewed from Bungalow 69"
        title="Clifton 4th Beach"
        scrollHint="Scroll to the shoreline"
        startWidth={46}
        startHeight={58}
        startRadius={6}
        endRadius={0}
        mediaZoom={1.2}
        scrollDistance={1.05}
        holdDistance={0.28}
        smoothing={0.1}
        overlayScrim={0.42}
        useWindowScroll
      >
        <p className="text-[0.65rem] font-bold tracking-[0.22em] text-white/80 uppercase">
          Clifton, Cape Town
        </p>
        <h2 className="mt-5 max-w-4xl font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.86] font-medium tracking-[-0.055em] text-white">
          Forty-four steps from the sand.
        </h2>
        <p className="mt-7 max-w-xl text-sm leading-7 text-white/82 sm:text-base">
          The Atlantic lies directly below, with the mountain, city and Cape Town&apos;s coastal
          neighbourhoods close at hand.
        </p>
        <Link
          href="/location"
          className="mt-9 inline-flex min-h-12 items-center justify-center rounded-[6px] border border-white bg-white px-7 text-[0.62rem] font-bold tracking-[0.2em] text-brand-espresso uppercase transition-colors hover:border-white/70 hover:bg-transparent hover:text-white"
        >
          Explore the location
        </Link>
      </ScrollExpand>
    </section>
  );
}
