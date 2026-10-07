"use client";

import { Mail, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

const contactButtonClass =
  "flex size-14 items-center justify-center rounded-full border border-white/15 shadow-[0_12px_35px_rgba(52,42,35,0.24)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 sm:size-15";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-5 bottom-5 z-[70] flex flex-col items-end gap-3 sm:right-8 sm:bottom-8">
      <div
        id="contact-options"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`flex flex-col gap-3 transition-[opacity,transform] duration-300 ease-out ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
      >
        <a
          href={`mailto:${siteConfig.contactEmail}`}
          aria-label="Email Bungalow 69"
          title="Email"
          className={`${contactButtonClass} bg-brand-ivory text-brand-espresso hover:bg-brand-cream`}
        >
          <Mail aria-hidden="true" className="size-6" strokeWidth={1.8} />
        </a>

        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Follow Bungalow 69 on Instagram"
          title="Instagram"
          className={`${contactButtonClass} bg-brand-sand text-white hover:bg-brand-umber`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
          </svg>
        </a>

        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Contact Bungalow 69 on WhatsApp"
          title="WhatsApp"
          className={`${contactButtonClass} bg-brand-umber text-white hover:bg-brand-sand`}
        >
          <MessageCircle aria-hidden="true" className="size-6" strokeWidth={1.8} />
        </a>
      </div>

      <button
        type="button"
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
        aria-expanded={isOpen}
        aria-controls="contact-options"
        onClick={() => setIsOpen((current) => !current)}
        className={`${contactButtonClass} cursor-pointer bg-brand-espresso text-white hover:bg-brand-umber`}
      >
        <span className="relative flex size-7 items-center justify-center">
          <MessageCircle
            aria-hidden="true"
            className={`absolute size-7 transition-[opacity,transform] duration-300 ${
              isOpen ? "rotate-45 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
            strokeWidth={1.8}
          />
          <X
            aria-hidden="true"
            className={`absolute size-7 transition-[opacity,transform] duration-300 ${
              isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-45 scale-75 opacity-0"
            }`}
            strokeWidth={1.8}
          />
        </span>
      </button>
    </div>
  );
}
