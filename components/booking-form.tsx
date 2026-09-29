"use client";

import { Check, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { earliestBookingDate } from "@/lib/booking-availability";

type SubmissionState = "idle" | "submitting" | "success" | "error";

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-[6px] border border-brand-oyster bg-white px-4 text-sm text-brand-espresso outline-none transition-colors placeholder:text-brand-espresso/35 focus:border-brand-sand";

const selectClassName = `${fieldClassName} appearance-none pr-12`;

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatSelectedDate(value: string) {
  if (!value) return "Select date";
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

function getCalendarDays(month: Date) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return date;
  });
}

export function BookingForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [responseMessage, setResponseMessage] = useState("");
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const today = new Date();
    const firstAvailableDate = new Date(`${earliestBookingDate}T00:00:00`);
    const date = today > firstAvailableDate ? today : firstAvailableDate;
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstAvailableDate = new Date(`${earliestBookingDate}T00:00:00`);
  const calendarDays = getCalendarDays(visibleMonth);

  function selectDate(date: Date) {
    const value = toDateValue(date);

    if (!arrival || departure || value <= arrival) {
      setArrival(value);
      setDeparture("");
      return;
    }

    setDeparture(value);
  }

  function changeMonth(offset: number) {
    setVisibleMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() + offset, 1),
    );
  }

  function closeSuccessMessage() {
    setSubmissionState("idle");
    setResponseMessage("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!arrival || !departure) {
      setSubmissionState("error");
      setResponseMessage("Please select your arrival and departure dates.");
      return;
    }
    setSubmissionState("submitting");
    setResponseMessage("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) throw new Error(result.message || "Unable to send your request.");

      form.reset();
      setArrival("");
      setDeparture("");
      setSubmissionState("success");
      setResponseMessage("Your booking request has been sent. We’ll be in touch shortly.");
    } catch (error) {
      setSubmissionState("error");
      setResponseMessage(
        error instanceof Error ? error.message : "Unable to send your request. Please try again.",
      );
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="grid gap-6" aria-label="Booking request form">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <input type="hidden" name="arrival" value={arrival} />
      <input type="hidden" name="departure" value={departure} />

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-[6px] border border-brand-oyster px-4 py-3">
          <p className="text-[0.58rem] font-bold tracking-[0.16em] text-brand-umber uppercase">
            Arrival
          </p>
          <p className="mt-1 text-sm text-brand-espresso">{formatSelectedDate(arrival)}</p>
        </div>
        <div className="rounded-[6px] border border-brand-oyster px-4 py-3">
          <p className="text-[0.58rem] font-bold tracking-[0.16em] text-brand-umber uppercase">
            Departure
          </p>
          <p className="mt-1 text-sm text-brand-espresso">{formatSelectedDate(departure)}</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-[0.62rem] font-bold tracking-[0.16em] text-brand-umber uppercase">
          Adults
          <span className="relative block">
            <select required name="adults" defaultValue="2" className={selectClassName}>
              {[1, 2, 3, 4, 5, 6].map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-[calc(50%+0.25rem)] right-4 size-4 -translate-y-1/2 text-brand-espresso"
            />
          </span>
        </label>
        <label className="text-[0.62rem] font-bold tracking-[0.16em] text-brand-umber uppercase">
          Children
          <span className="relative block">
            <select name="children" defaultValue="0" className={selectClassName}>
              {[0, 1, 2].map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-[calc(50%+0.25rem)] right-4 size-4 -translate-y-1/2 text-brand-espresso"
            />
          </span>
        </label>
      </div>

      <section aria-label="Choose your stay dates" className="rounded-[6px] border border-brand-oyster p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
            className="flex size-10 cursor-pointer items-center justify-center rounded-[6px] text-brand-espresso transition-colors hover:bg-brand-cream"
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <h3 className="font-display text-2xl text-brand-espresso">
            {new Intl.DateTimeFormat("en-ZA", { month: "long", year: "numeric" }).format(
              visibleMonth,
            )}
          </h3>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            aria-label="Next month"
            className="flex size-10 cursor-pointer items-center justify-center rounded-[6px] text-brand-espresso transition-colors hover:bg-brand-cream"
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-7 text-center">
          {weekdays.map((day) => (
            <span key={day} className="pb-3 text-[0.58rem] font-bold tracking-[0.12em] text-brand-umber/65 uppercase">
              {day}
            </span>
          ))}
          {calendarDays.map((date) => {
            const value = toDateValue(date);
            const outsideMonth = date.getMonth() !== visibleMonth.getMonth();
            const unavailable = date < today || date < firstAvailableDate;
            const selected = value === arrival || value === departure;
            const inRange = Boolean(arrival && departure && value > arrival && value < departure);

            return (
              <button
                key={value}
                type="button"
                disabled={unavailable}
                onClick={() => selectDate(date)}
                aria-label={date.toLocaleDateString("en-ZA")}
                aria-pressed={selected}
                className={`relative flex aspect-square items-center justify-center rounded-[6px] text-sm transition-colors ${
                  selected
                    ? "bg-brand-sand font-bold text-white"
                    : inRange
                      ? "bg-brand-cream text-brand-espresso"
                      : outsideMonth
                        ? "text-brand-espresso/25 hover:bg-brand-cream"
                        : "text-brand-espresso hover:bg-brand-cream"
                } disabled:cursor-not-allowed disabled:text-brand-espresso/20 disabled:line-through disabled:hover:bg-transparent`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-xs leading-5 text-brand-espresso/55">
          Bookings are available from 14 November 2026. Select your preferred arrival and
          departure dates; all dates are subject to confirmation by our reservations team.
        </p>
      </section>

      <label className="text-[0.62rem] font-bold tracking-[0.16em] text-brand-umber uppercase">
        Full name
        <input required name="name" autoComplete="name" className={fieldClassName} />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-[0.62rem] font-bold tracking-[0.16em] text-brand-umber uppercase">
          Email
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className={fieldClassName}
          />
        </label>
        <label className="text-[0.62rem] font-bold tracking-[0.16em] text-brand-umber uppercase">
          Phone
          <input type="tel" name="phone" autoComplete="tel" className={fieldClassName} />
        </label>
      </div>

      <label className="text-[0.62rem] font-bold tracking-[0.16em] text-brand-umber uppercase">
        Anything we should know?
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us about your stay or any special requests."
          className={`${fieldClassName} resize-y py-4`}
        />
      </label>

      <button
        type="submit"
        disabled={submissionState === "submitting"}
        className="inline-flex min-h-13 cursor-pointer items-center justify-center rounded-[6px] border border-brand-sand bg-brand-sand px-8 text-[0.65rem] font-bold tracking-[0.2em] text-white uppercase transition-colors hover:bg-transparent hover:text-brand-sand disabled:cursor-wait disabled:opacity-55"
      >
        {submissionState === "submitting" ? "Sending enquiry…" : "Send booking enquiry"}
      </button>

      {responseMessage && submissionState !== "success" ? (
        <p
          role="status"
          className="text-sm leading-6 text-red-700"
        >
          {responseMessage}
        </p>
      ) : null}
      </form>

      {submissionState === "success" ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-espresso/55 px-5 py-8 backdrop-blur-[3px]"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSuccessMessage();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-success-title"
            aria-describedby="booking-success-description"
            className="relative w-full max-w-lg rounded-[6px] border border-brand-oyster bg-brand-ivory px-7 py-10 text-center shadow-2xl sm:px-12 sm:py-12"
          >
            <button
              type="button"
              onClick={closeSuccessMessage}
              aria-label="Close confirmation"
              className="absolute top-4 right-4 flex size-10 cursor-pointer items-center justify-center rounded-full text-brand-espresso/60 transition-colors hover:bg-brand-cream hover:text-brand-espresso"
            >
              <X aria-hidden="true" className="size-5" />
            </button>

            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-sand text-white">
              <Check aria-hidden="true" className="size-7" strokeWidth={1.8} />
            </div>
            <p className="mt-6 text-[0.6rem] font-bold tracking-[0.2em] text-brand-umber uppercase">
              Bungalow 69 Clifton
            </p>
            <h2
              id="booking-success-title"
              className="mt-3 font-display text-[clamp(2.75rem,7vw,4.5rem)] leading-none font-medium tracking-[-0.045em] text-brand-espresso"
            >
              Enquiry sent
            </h2>
            <p
              id="booking-success-description"
              className="mx-auto mt-5 max-w-sm text-sm leading-6 text-brand-espresso/65"
            >
              Thank you for your enquiry. Our reservations team will review your preferred dates
              and respond shortly.
            </p>
            <button
              type="button"
              onClick={closeSuccessMessage}
              className="mt-8 inline-flex min-h-12 cursor-pointer items-center justify-center rounded-[6px] bg-brand-sand px-10 text-[0.62rem] font-bold tracking-[0.18em] text-white uppercase transition-colors hover:bg-brand-umber"
            >
              Close
            </button>
          </section>
        </div>
      ) : null}
    </>
  );
}
