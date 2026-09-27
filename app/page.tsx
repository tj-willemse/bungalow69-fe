import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Bungalow 69 Clifton | Coming Soon",
  description:
    "Bungalow 69 on Clifton Fourth Beach, Cape Town. Short-term villa rentals coming soon.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <ComingSoon />;
}
