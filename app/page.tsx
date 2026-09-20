import { Hero } from "@/components/hero";
import { HomeLocationFeature } from "@/components/home-location-feature";
import { HomePropertyOverview } from "@/components/home-property-overview";
import { HomeSignatureAmenities } from "@/components/home-signature-amenities";
import { VacationRentalSchema } from "@/components/vacation-rental-schema";
import { VillaScrollShowcase } from "@/components/villa-scroll-showcase";

export default function HomePage() {
  return (
    <>
      <VacationRentalSchema />
      <main>
        <Hero />
        <VillaScrollShowcase />
        <HomePropertyOverview />
        <HomeSignatureAmenities />
        <HomeLocationFeature />
      </main>
    </>
  );
}
