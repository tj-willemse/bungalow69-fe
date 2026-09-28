import { NextResponse } from "next/server";

const generalRecipient = process.env.GENERAL_EMAIL_TO ?? "administration@clifton69.com";

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
  const emailSender = process.env.GENERAL_EMAIL_FROM ?? process.env.BOOKING_EMAIL_FROM;

  if (!resendApiKey || !emailSender) {
    return NextResponse.json(
      { message: "Online enquiries are temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid enquiry." }, { status: 400 });
  }

  if (readField(body, "company")) {
    return NextResponse.json({ message: "Enquiry received." });
  }

  const name = readField(body, "name", 120);
  const email = readField(body, "email", 160);
  const phone = readField(body, "phone", 60);
  const message = readField(body, "message", 3000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "Please complete all required fields." },
      { status: 400 },
    );
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: emailSender,
      to: [generalRecipient],
      reply_to: email,
      subject: `General enquiry from ${name}`,
      html: `
        <h1>New Bungalow 69 general enquiry</h1>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Message:</strong><br>${escapeHtml(message).replaceAll("\n", "<br>")}</p>
      `,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "We couldn’t send your enquiry. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Enquiry sent." });
}
