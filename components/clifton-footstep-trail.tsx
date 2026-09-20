"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./clifton-footstep-trail.module.css";

const stepCount = 44;

export function CliftonFootstepTrail() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.18 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const steps = Array.from({ length: stepCount }, (_, index) => {
    const progress = index / (stepCount - 1);
    const y = 20 + progress * 280;
    const centreX = 50 + Math.sin(progress * Math.PI * 2 - Math.PI / 2) * 27;
    const tangent = Math.cos(progress * Math.PI * 2 - Math.PI / 2);
    const side = index % 2 === 0 ? -1 : 1;
    const x = centreX + side * 3;
    const rotation = tangent * 28 + side * 7;

    return { index, x, y, rotation, side };
  });

  return (
    <div
      ref={rootRef}
      className={`${styles.frame} ${isVisible ? styles.visible : ""}`}
    >
      <svg
        viewBox="0 0 100 320"
        role="img"
        aria-label="A winding trail of 44 footprints leading to Clifton Fourth Beach"
        className={styles.trail}
      >
        {steps.map(({ index, x, y, rotation, side }) => (
          <g
            key={index}
            className={styles.step}
            style={{ "--step-index": index } as CSSProperties}
            transform={`translate(${x.toFixed(3)} ${y.toFixed(3)}) rotate(${rotation.toFixed(3)}) scale(${side} 1)`}
          >
            <ellipse cx="0" cy="1.8" rx="1.85" ry="2.8" />
            <ellipse cx="0" cy="-1.95" rx="2.3" ry="2.45" />
            <circle cx="-1.7" cy="-4.6" r="0.62" />
            <circle cx="-0.4" cy="-5.05" r="0.7" />
            <circle cx="1" cy="-4.85" r="0.64" />
          </g>
        ))}
      </svg>

      <div className={`${styles.caption} flex items-end gap-5 sm:gap-7`}>
        <p className="font-display text-[clamp(7rem,18vw,15rem)] leading-[0.62] tracking-[-0.07em] text-brand-sand">
          44
        </p>
        <p className="max-w-52 pb-1 text-[0.65rem] leading-5 font-bold tracking-[0.18em] text-brand-umber uppercase sm:pb-2 sm:text-xs">
          Steps from the front door to the sand
        </p>
      </div>
    </div>
  );
}
