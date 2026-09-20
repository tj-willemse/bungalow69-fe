import type { Metadata } from "next";

const fallbackUrl = "http://localhost:3000";

export const siteConfig = {
  name: "Bungalow 69 Clifton",
  shortName: "Bungalow 69",
  title: "Bungalow 69 Clifton | Private Beach Villa in Cape Town",
  description:
    "A private four-bedroom beach villa with a pool, panoramic Atlantic views and direct access to Clifton Fourth Beach in Cape Town.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl,
  bookingUrl: "/book",
  sisterVillaUrl: "https://bakovenpalms.com/home",
  sisterVillaLogo: "/images/bakoven-palms-logo.webp",
  location: "Clifton, Cape Town, South Africa",
  heroImage: "/images/clifton-fourth-beach-hero.webp",
  logoImage: "/images/bungalow-69-logo.svg",
} as const;

export const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Rooms & Spaces", href: "/rooms-and-spaces" },
  { label: "Gallery", href: "/gallery" },
  { label: "Location", href: "/location" },
] as const;

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
};

export function buildPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const socialTitle = `${title} | ${siteConfig.shortName}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_ZA",
      url: path,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      images: [
        {
          url: siteConfig.heroImage,
          width: 960,
          height: 432,
          alt: "Clifton Fourth Beach and the Atlantic coastline at golden hour",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [siteConfig.heroImage],
    },
  };
}
