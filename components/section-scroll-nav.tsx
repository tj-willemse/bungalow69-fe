"use client";

import { useEffect, useRef, useState } from "react";

type SectionLink = { id: string; label: string };

export function SectionScrollNav({ links, label }: { links: readonly SectionLink[]; label: string }) {
  const [activeId, setActiveId] = useState(links[0]?.id ?? "");
  const navRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-24% 0px -58% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  useEffect(() => {
    let frame = 0;
    const updateUnderline = () => {
      frame = 0;
      const nav = navRef.current;
      const underline = underlineRef.current;
      if (!nav || !underline) return;

      const stickyTop = window.matchMedia("(min-width: 640px)").matches ? 96 : 88;
      const navTop = nav.getBoundingClientRect().top;
      const distance = Math.max(window.innerHeight - stickyTop, 1);
      const progress = Math.min(1, Math.max(0, (window.innerHeight - navTop) / distance));
      underline.style.transform = `scaleX(${progress})`;
      underline.style.opacity = String(Math.min(1, progress * 1.8));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateUnderline);
    };

    updateUnderline();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label={label}
      className="sticky top-[7.25rem] z-[15] bg-white/95 backdrop-blur-sm sm:top-[7.75rem]"
    >
      <div className="mx-auto flex max-w-[1440px] gap-7 overflow-x-auto px-5 py-4 [scrollbar-width:none] sm:px-8 md:justify-center lg:px-12 [&::-webkit-scrollbar]:hidden">
        {links.map((link, index) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`shrink-0 text-[0.6rem] font-bold tracking-[0.18em] uppercase transition-colors duration-200 ${
              activeId === link.id ? "text-brand-sand" : "text-brand-espresso/55 hover:text-brand-sand"
            }`}
          >
            <span className="mr-2 text-[0.5rem] text-brand-sand/70">
              {String(index + 1).padStart(2, "0")}
            </span>
            {link.label}
          </a>
        ))}
      </div>
      <span
        ref={underlineRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand-oyster opacity-0"
      />
    </nav>
  );
}
