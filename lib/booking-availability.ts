export const earliestBookingDate = "2026-11-14";

export type BlockedDateRange = {
  start: string;
  end: string;
};

export function stayOverlapsBlockedRange(
  arrival: string,
  departure: string,
  blockedRanges: BlockedDateRange[],
) {
  return blockedRanges.some(
    (range) => arrival < range.end && departure > range.start,
  );
}

export function dateIsBlocked(date: string, blockedRanges: BlockedDateRange[]) {
  return blockedRanges.some((range) => date >= range.start && date < range.end);
}
