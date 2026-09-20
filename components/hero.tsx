import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="sticky top-0 z-0 h-svh overflow-hidden bg-brand-espresso text-white">
      <Image
        src={siteConfig.heroImage}
        alt="Clifton Fourth Beach and the Atlantic coastline at golden hour"
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,14,10,0.4)_0%,rgba(20,14,10,0.25)_35%,rgba(20,14,10,0.25)_100%)]" />

      <div className="relative z-10 flex min-h-svh items-center justify-center px-5 text-center sm:px-8">
        <div>
          <h1
            id="hero-title"
            className="font-display text-[clamp(4rem,9vw,8rem)] leading-none font-medium tracking-[-0.045em] text-white drop-shadow-lg"
          >
            Bungalow 69
          </h1>
          <p className="mt-5 text-[0.62rem] font-semibold tracking-[0.2em] text-white uppercase drop-shadow-md sm:text-xs">
            Clifton, Cape Town <span className="mx-1.5 text-white/70">|</span> Four Bedrooms
            <span className="mx-1.5 text-white/70">|</span> Private Pool
            <span className="mx-1.5 text-white/70">|</span> Direct Beach Access
          </p>
          <Link
            href={siteConfig.bookingUrl}
            className="mt-8 inline-flex min-h-12 min-w-52 items-center justify-center rounded-[6px] border border-white/80 px-8 text-[0.62rem] font-bold tracking-[0.2em] text-white uppercase transition-colors duration-300 hover:bg-white hover:text-brand-sand sm:min-w-60 sm:text-[0.66rem]"
          >
            Book your stay
          </Link>
        </div>
      </div>
    </section>
  );
}
