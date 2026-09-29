# Bungalow 69 — Project Notes

## Email routing

- Reservation and booking enquiries: `reservations@clifton69.com`
- General and administrative enquiries: `administration@clifton69.com`
- The future booking-enquiry form must route to the reservations address.
- General website enquiries must route to the administration address.
- Reservation mail must also copy Steadfast at `collection@steadfast.africa` through `BOOKING_EMAIL_CC`, following the same arrangement used for Bakoven Palms.
- The internal `/book` form sends through the server-side `/api/book` route. Production requires `RESEND_API_KEY` and `BOOKING_EMAIL_FROM`; `BOOKING_EMAIL_TO` may override the default reservations inbox.
- General enquiry forms send through `/api/contact` to `GENERAL_EMAIL_TO`, which defaults to the administration inbox. `GENERAL_EMAIL_FROM` may use a separate verified sender and otherwise falls back to `BOOKING_EMAIL_FROM`.

These addresses are internal implementation requirements and should not be displayed publicly unless explicitly requested.

## Production image policy

- Use SVG for logos, icons and other vector artwork.
- Use WebP for every production raster image; do not reference PNG, JPG or JPEG files in application code.
- Convert new raster assets with `npm run images:webp -- path/to/image.png` before adding them to the website.
- Run `npm run images:check` before production builds to catch non-production raster references.

## Scroll and interaction direction

- The website should feel like one continuous editorial journey rather than a stack of unrelated sections.
- Use sticky split-scroll storytelling where it adds value: the left column holds a section title, room name or key fact while the right column scrolls through related imagery and detail.
- Each sticky column must release naturally at the end of its parent section so the complete layout continues into the next story beat.
- Prioritise this pattern for the upcoming homepage Rooms & Spaces preview and the full Rooms & Spaces page.
- Keep motion restrained, smooth and responsive, with a complete reduced-motion fallback.
- Do not force sticky behaviour on short sections or small mobile screens where normal document flow is clearer.
