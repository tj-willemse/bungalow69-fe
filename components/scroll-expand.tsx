"use client";

import Image from "next/image";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";
import styles from "./scroll-expand.module.css";

const clamp = (value: number, minimum: number, maximum: number) =>
  value < minimum ? minimum : value > maximum ? maximum : value;

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const progress = clamp((value - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return progress * progress * (3 - 2 * progress);
};

type ScrollExpandProps = Omit<HTMLAttributes<HTMLDivElement>, "title" | "children"> & {
  src: string;
  mediaType?: "image" | "video";
  poster?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function ScrollExpand({
  src,
  mediaType = "image",
  poster = "",
  alt = "",
  title = "",
  scrollHint = "",
  startWidth = 42,
  startHeight = 58,
  startRadius = 6,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  children,
  className = "",
  style,
  ...rest
}: ScrollExpandProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
  });

  useEffect(() => {
    propsRef.current = {
      startWidth,
      startHeight,
      startRadius,
      endRadius,
      mediaZoom,
      scrollDistance,
      holdDistance,
      smoothing,
      overlayScrim,
      useWindowScroll,
      enabled,
    };
  }, [
    enabled,
    endRadius,
    holdDistance,
    mediaZoom,
    overlayScrim,
    scrollDistance,
    smoothing,
    startHeight,
    startRadius,
    startWidth,
    useWindowScroll,
  ]);

  const applyProgress = useCallback((progress: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;

    const options = propsRef.current;
    const eased = smoothstep(0, 1, progress);
    const width = options.startWidth + (100 - options.startWidth) * eased;
    const height = options.startHeight + (100 - options.startHeight) * eased;
    const insetX = Math.max(0, (100 - width) / 2);
    const insetY = Math.max(0, (100 - height) / 2);
    const radius = options.startRadius + (options.endRadius - options.startRadius) * eased;

    frame.style.clipPath = `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`;
    media.style.transform = `scale(${options.mediaZoom + (1 - options.mediaZoom) * eased})`;

    if (scrimRef.current) {
      scrimRef.current.style.opacity = `${options.overlayScrim * eased}`;
    }

    if (titleRef.current) {
      const exit = smoothstep(0.4, 0.88, progress);
      titleRef.current.style.opacity = `${1 - exit}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * exit}px, 0) scale(${1 + 0.06 * exit})`;
    }

    if (hintRef.current) {
      const exit = smoothstep(0, 0.12, progress);
      hintRef.current.style.opacity = `${1 - exit}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * exit}px, 0)`;
    }

    if (overlayRef.current) {
      const entrance = smoothstep(0.68, 1, progress);
      overlayRef.current.style.opacity = `${entrance}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - entrance)}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let current = 0;
    let target = 0;
    let stageHeight = 0;
    let running = false;

    const measure = () => {
      const options = propsRef.current;
      stageHeight = options.useWindowScroll ? window.innerHeight : root.clientHeight;
      if (stageHeight <= 0) return;

      stage.style.height = `${stageHeight}px`;
      track.style.height = `${stageHeight * (1 + Math.max(0, options.scrollDistance) + Math.max(0, options.holdDistance))}px`;

      const width = root.clientWidth || stageHeight;
      stage.style.setProperty("--scroll-expand-title-size", `${clamp(width * 0.075, 28, 96)}px`);
    };

    const readProgress = () => {
      const options = propsRef.current;
      if (!options.enabled) return 1;

      const span = stageHeight * Math.max(0.01, options.scrollDistance);
      if (options.useWindowScroll) {
        return clamp(-track.getBoundingClientRect().top / span, 0, 1);
      }

      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const options = propsRef.current;
      const follow =
        options.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * options.smoothing));
      current += (target - current) * follow;

      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }

      applyProgress(current);
      animationFrame = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!animationFrame) animationFrame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(root);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
    };
  }, [applyProgress, useWindowScroll]);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${useWindowScroll ? "" : styles.scroller} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className={styles.track}>
        <div ref={stageRef} className={styles.stage}>
          <div ref={frameRef} className={styles.frame}>
            {mediaType === "video" ? (
              <video
                ref={(node) => {
                  mediaRef.current = node;
                }}
                className={styles.media}
                src={src}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <Image
                ref={(node) => {
                  mediaRef.current = node;
                }}
                className={styles.media}
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                priority
                draggable={false}
              />
            )}
            <div ref={scrimRef} className={styles.scrim} />
            {children ? (
              <div ref={overlayRef} className={styles.overlay}>
                {children}
              </div>
            ) : null}
          </div>

          {title ? (
            <div ref={titleRef} className={styles.title}>
              {title}
            </div>
          ) : null}

          {scrollHint ? (
            <div ref={hintRef} className={styles.hint}>
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
