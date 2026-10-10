import { NextResponse } from "next/server";
import { getAirbnbBlockedRanges } from "@/lib/airbnb-availability";

export async function GET() {
  try {
    const blockedRanges = await getAirbnbBlockedRanges();
    return NextResponse.json(
      { blockedRanges },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Unable to load Airbnb availability", error);
    return NextResponse.json(
      { message: "Live availability is temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
