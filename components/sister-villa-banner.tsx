import Image from "next/image";
import { siteConfig } from "@/lib/site";

const BannerMessage = () => (
  <span className="flex shrink-0 items-center gap-3 px-5 sm:gap-4 sm:px-8">
    <span className="font-bold tracking-[0.17em] uppercase">Bakoven Palms</span>
    <Image
      src={siteConfig.sisterVillaLogo}
      alt=""
      width={638}
      height={656}
      unoptimized
      className="h-4 w-auto object-contain"
    />
    <span className="font-bold tracking-[0.17em] uppercase">Camps Bay Villa</span>
  </span>
);

export function SisterVillaBanner() {
  return (
    <aside className="fixed inset-x-0 top-0 z-[80] h-7 overflow-hidden bg-brand-sand text-white">
      <a
        href={siteConfig.sisterVillaUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Visit Bakoven Palms, Camps Bay Villa"
        className="group flex h-full items-center overflow-hidden text-[0.5rem] whitespace-nowrap sm:text-[0.54rem]"
      >
        <span className="sister-villa-marquee flex min-w-max items-center group-hover:[animation-play-state:paused]">
          <span className="flex min-w-max items-center">
            <BannerMessage />
            <BannerMessage />
            <BannerMessage />
            <BannerMessage />
          </span>
          <span aria-hidden="true" className="flex min-w-max items-center">
            <BannerMessage />
            <BannerMessage />
            <BannerMessage />
            <BannerMessage />
          </span>
        </span>
      </a>
    </aside>
  );
}
