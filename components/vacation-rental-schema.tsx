import { siteConfig } from "@/lib/site";

export function VacationRentalSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: new URL(siteConfig.heroImage, siteConfig.url).toString(),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Clifton",
      addressRegion: "Western Cape",
      addressCountry: "ZA",
    },
    containsPlace: {
      "@type": "Accommodation",
      numberOfRooms: 4,
      occupancy: {
        "@type": "QuantitativeValue",
        value: 6,
      },
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Private pool", value: true },
        { "@type": "LocationFeatureSpecification", name: "Beach access", value: true },
        { "@type": "LocationFeatureSpecification", name: "Ocean view", value: true },
        { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
