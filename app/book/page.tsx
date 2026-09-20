import type { Metadata } from "next";
import Image from "next/image";
import { BookingForm } from "@/components/booking-form";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Book Your Stay",
  description: "Request dates and book your stay directly with Bungalow 69 Clifton.",
  path: "/book",
});

export default function BookPage() {
  return (
    <main className="bg-white px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:gap-20 xl:gap-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h1 className="max-w-xl font-display text-[clamp(3.8rem,7vw,7.5rem)] leading-[0.86] font-medium tracking-[-0.055em] text-brand-espresso">
            Book your stay.
          </h1>
          <p className="mt-8 max-w-md text-[0.95rem] leading-7 text-brand-espresso/70">
            Send us your preferred dates and guest details. Our reservations team will confirm
            availability and guide you through the booking directly.
          </p>
          <figure className="relative mt-10 aspect-[4/3] max-w-xl overflow-hidden rounded-[6px] bg-brand-cream">
            <Image
              src="/images/gallery/142.webp"
              alt="Bungalow 69 private pool overlooking Clifton Fourth Beach"
              fill
              sizes="(min-width: 1024px) 38vw, calc(100vw - 2.5rem)"
              className="object-cover"
              unoptimized
            />
          </figure>
        </div>

        <section aria-labelledby="booking-form-title" className="pt-7">
          <h2
            id="booking-form-title"
            className="font-display text-[clamp(2.4rem,4vw,4.5rem)] leading-none tracking-[-0.04em] text-brand-espresso"
          >
            Your stay
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-brand-espresso/65">
            Bungalow 69 accommodates up to six adults and two children across four bedrooms.
          </p>
          <div className="mt-9">
            <BookingForm />
          </div>
        </section>
      </div>
    </main>
  );
}
