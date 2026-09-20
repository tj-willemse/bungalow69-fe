"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type SubmissionState = "idle" | "submitting" | "success" | "error";

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-[6px] border border-brand-oyster bg-white px-4 text-sm text-brand-espresso outline-none transition-colors placeholder:text-brand-espresso/35 focus:border-brand-sand";

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
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
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
          <select required name="adults" defaultValue="2" className={fieldClassName}>
            {[1, 2, 3, 4, 5, 6].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </label>
        <label className="text-[0.62rem] font-bold tracking-[0.16em] text-brand-umber uppercase">
          Children
          <select name="children" defaultValue="0" className={fieldClassName}>
            {[0, 1, 2].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
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
            const unavailable = date < today;
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
          Select an arrival date, then choose your departure date. Availability will be connected to Airbnb later.
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
        {submissionState === "submitting" ? "Sending request…" : "Request to book"}
      </button>

      {responseMessage ? (
        <p
          role="status"
          className={`text-sm leading-6 ${
            submissionState === "success" ? "text-brand-umber" : "text-red-700"
          }`}
        >
          {responseMessage}
        </p>
      ) : null}
    </form>
  );
}
