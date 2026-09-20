import Link from "next/link";
import { CliftonFootstepTrail } from "@/components/clifton-footstep-trail";

const propertyDetails = [
  ["Bedrooms", "4"],
  ["Bathrooms", "3.5"],
  ["To the beach", "44 steps"],
  ["Outdoor living", "Heated pool"],
] as const;

export function HomePropertyOverview() {
  return (
    <section
      aria-labelledby="property-overview-title"
      className="relative z-10 bg-white px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40"
    >
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 xl:gap-32">
        <div className="relative hidden min-h-0 lg:block">
          <div className="flex h-full flex-col lg:absolute lg:inset-0">
            <div className="mx-auto h-full min-h-0 w-full">
              <CliftonFootstepTrail />
            </div>
          </div>
        </div>

        <div>
          <h2
            id="property-overview-title"
            className="max-w-4xl font-display text-[clamp(3.3rem,7vw,7rem)] leading-[0.88] font-medium tracking-[-0.055em] text-brand-espresso"
          >
            Life, just above the Atlantic.
          </h2>

          <div className="mt-10 grid gap-6 text-[0.95rem] leading-7 text-brand-espresso/75 sm:grid-cols-2 sm:gap-10 lg:mt-14">
            <p>
              Bungalow 69 is a private four-bedroom beach home overlooking Clifton Fourth, with
              panoramic ocean views and an effortless indoor-outdoor flow.
            </p>
            <p>
              Sliding doors open the living space onto a deck with a heated pool, barbecue and
              outdoor dining, while the upstairs loft, fireplace and patio offer a quieter place
              to take in the coast.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-2 border-y border-brand-oyster sm:mt-16 sm:grid-cols-4">
            {propertyDetails.map(([term, detail]) => (
              <div
                key={term}
                className="border-brand-oyster py-5 odd:border-r sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
              >
                <dt className="text-[0.58rem] font-bold tracking-[0.16em] text-brand-umber/65 uppercase">
                  {term}
                </dt>
                <dd className="mt-2 text-sm font-semibold text-brand-espresso">{detail}</dd>
              </div>
            ))}
          </dl>

          <Link
            href="/rooms-and-spaces"
            className="mt-10 inline-flex min-h-12 items-center justify-center gap-4 rounded-[6px] border border-brand-sand bg-brand-sand px-7 text-[0.65rem] font-bold tracking-[0.18em] text-white uppercase transition-colors hover:bg-transparent hover:text-brand-sand"
          >
            Explore rooms &amp; spaces
          </Link>
        </div>
      </div>
    </section>
  );
}
