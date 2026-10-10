import "server-only";

import type { BlockedDateRange } from "@/lib/booking-availability";

const datePattern = /^\d{8}/;

function toDateValue(value: string) {
  const match = value.match(datePattern);
  if (!match) return null;

  const date = match[0];
  return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
}

export function parseAirbnbCalendar(calendar: string): BlockedDateRange[] {
  const unfolded = calendar.replace(/\r?\n[ \t]/g, "");
  const events = unfolded.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) ?? [];

  const ranges = events.flatMap((event) => {
    const startLine = event.match(/^DTSTART(?:;[^:]*)?:(.+)$/m);
    const endLine = event.match(/^DTEND(?:;[^:]*)?:(.+)$/m);
    const start = startLine ? toDateValue(startLine[1].trim()) : null;
    const end = endLine ? toDateValue(endLine[1].trim()) : null;

    return start && end && end > start ? [{ start, end }] : [];
  });

  return ranges
    .sort((a, b) => a.start.localeCompare(b.start))
    .reduce<BlockedDateRange[]>((merged, range) => {
      const previous = merged.at(-1);
      if (previous && range.start <= previous.end) {
        previous.end = previous.end > range.end ? previous.end : range.end;
      } else {
        merged.push({ ...range });
      }
      return merged;
    }, []);
}

export async function getAirbnbBlockedRanges() {
  const calendarUrl = process.env.AIRBNB_ICAL_URL;
  if (!calendarUrl) {
    throw new Error("AIRBNB_ICAL_URL is not configured.");
  }

  const response = await fetch(calendarUrl, {
    cache: "no-store",
    headers: { Accept: "text/calendar" },
  });

  if (!response.ok) {
    throw new Error(`Airbnb calendar request failed with status ${response.status}.`);
  }

  return parseAirbnbCalendar(await response.text());
}
