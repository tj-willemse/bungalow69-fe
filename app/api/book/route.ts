import { NextResponse } from "next/server";

const bookingRecipient = process.env.BOOKING_EMAIL_TO ?? "reservations@clifton69.com";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const readField = (body: Record<string, unknown>, key: string, maximum = 500) => {
  const value = body[key];
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
};

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const bookingSender = process.env.BOOKING_EMAIL_FROM;

  if (!resendApiKey || !bookingSender) {
    return NextResponse.json(
      { message: "Online booking requests are temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid booking request." }, { status: 400 });
  }

  if (readField(body, "company")) {
    return NextResponse.json({ message: "Booking request received." });
  }

  const arrival = readField(body, "arrival", 20);
  const departure = readField(body, "departure", 20);
  const adults = readField(body, "adults", 2);
  const children = readField(body, "children", 2) || "0";
  const name = readField(body, "name", 120);
  const email = readField(body, "email", 160);
  const phone = readField(body, "phone", 60);
  const message = readField(body, "message", 2000);

  if (!arrival || !departure || !adults || !name || !email) {
    return NextResponse.json({ message: "Please complete all required fields." }, { status: 400 });
  }

  if (departure <= arrival) {
    return NextResponse.json(
      { message: "Departure must be after the arrival date." },
      { status: 400 },
    );
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: bookingSender,
      to: [bookingRecipient],
      reply_to: email,
      subject: `Booking request: ${arrival} to ${departure}`,
      html: `
        <h1>New Bungalow 69 booking request</h1>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Arrival:</strong> ${escapeHtml(arrival)}</p>
        <p><strong>Departure:</strong> ${escapeHtml(departure)}</p>
        <p><strong>Guests:</strong> ${escapeHtml(adults)} adults, ${escapeHtml(children)} children</p>
        <p><strong>Message:</strong><br>${escapeHtml(message || "No message").replaceAll("\n", "<br>")}</p>
      `,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "We couldn’t send your request. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Booking request sent." });
}
