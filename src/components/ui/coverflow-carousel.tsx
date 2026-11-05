"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export interface CoverflowSlide {
  src?: string;
  alt: string;
  title?: string;
  subtitle?: string;
  meta?: { label: string; value: string }[];
  tag?: string;
  app?: string;
  badge?: string;
  accentGradient?: string;
  mockup?: React.ReactNode;
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  /** Whether to automatically slide through cards. */
  autoPlay?: boolean;
  /** Milliseconds between automatic slide steps. Defaults to 3000. */
  autoPlayInterval?: number;
  /** Degrees the first neighbour tilts. */
  rotate?: number;
  /** How far the first neighbour recedes, as a fraction of card width. */
  depth?: number;
  /** Viewer distance as a multiple of card width — smaller is a wider lens. */
  perspective?: number;
  /** Exponent on distance. Below 1 the rake eases off as cards travel out. */
  falloff?: number;
  /** Opacity lost per step from the centre. */
  fade?: number;
  /** Any CSS length. Everything else is derived from it, so the rake scales. */
  cardWidth?: string;
  /** Space between cards, as a fraction of card width. */
  gap?: number;
  loop?: boolean;
  showCaption?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  /** Names the carousel for assistive tech. */
  label?: string;
  className?: string;
  cardClassName?: string;
}

export function CoverflowCarousel({
  slides,
  autoPlay = true,
  autoPlayInterval = 3000,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = "clamp(148px, 22vw, 260px)",
  gap = 0.05,
  loop = true,
  showCaption = false,
  showPagination = false,
  showNavigation = false,
  label = "Cover carousel",
  className,
  cardClassName,
}: CoverflowCarouselProps) {
  const count = slides.length;

  const frameRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  /** Fractional card index at the centre. The single source of truth. */
  const posRef = React.useRef(0);
  /** Where the current settle is headed. Stepping off `pos` instead would
      swallow a keypress that lands mid-flight, before the round-off moves. */
  const targetRef = React.useRef(0);
  const widthRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const dragRef = React.useRef<{
    id: number;
    x: number;
    pos: number;
    v: number;
    t: number;
  } | null>(null);

  const [selected, setSelected] = React.useState(0);

  /** Nearest whole card, folded back into 0..count-1. */
  const indexAt = React.useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count],
  );

  // Paint straight to the DOM. Sixty state updates a second would re-render
  // every card for numbers React never needs to see.
  const paint = React.useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      // Fold the distance into the shorter way round the ring. This is the
      // whole looping mechanism — no cloned nodes, no shuffling the DOM.
      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      // Both the tilt and the recession ease off as cards travel out —
      // doubling the distance adds only about half again as much of each.
      // A linear ramp folds the second card shut; this keeps it readable.
      const ramp = Math.pow(distance, falloff);
      // Capped short of edge-on so a far card never turns its back.
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      // A card is teleported across the ring at exactly half a turn out, so it
      // has to be gone by then or the jump is visible.
      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const settle = React.useCallback(
    (target: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      setSelected(indexAt(target));

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        // ponytail: exponential ease-out, not a spring. Swap in a spring only
        // if the settle needs overshoot.
        posRef.current += remaining * 0.16;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint],
  );

  const clamp = React.useCallback(
    (pos: number) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop],
  );

  const goTo = React.useCallback(
    (index: number) => {
      // Take the shorter way round rather than unwinding the whole ring.
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle],
  );

  const nudge = React.useCallback(
    (by: number) => {
      settle(clamp(Math.round(targetRef.current) + by));
    },
    [clamp, settle],
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    // Cards per second, for the throw.
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    // Let a flick carry, but never more than two cards.
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    settle(clamp(Math.round(posRef.current + carried)));
  };

  // Card width drives pitch, depth and perspective, so it is the only thing
  // worth measuring — and only when the box actually changes.
  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const autoPlayCallbackRef = React.useRef<() => void>(() => {});

  React.useEffect(() => {
    autoPlayCallbackRef.current = () => {
      if (dragRef.current) return;
      nudge(1);
    };
  });

  React.useEffect(() => {
    if (!autoPlay || count <= 1) return;

    const timer = setInterval(() => {
      autoPlayCallbackRef.current();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, count]);

  const active = slides[selected];

  return (
    <div
      className={cn("w-full", className)}
      style={{ ["--cf-card" as string]: cardWidth }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nudge(1);
            }
          }}
          // Vertical padding keeps the drop shadows clear of the overflow clip.
          className="cursor-grab overflow-hidden py-10 outline-none ring-ring focus-visible:ring-2 active:cursor-grabbing"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            // Horizontal drag is ours; the page keeps vertical scrolling.
            touchAction: "pan-y",
          }}
        >
          <div
            className="relative select-none"
            style={{
              height: "var(--cf-card)",
              transformStyle: "preserve-3d",
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                className={cn(
                  "absolute left-1/2 top-0 aspect-square overflow-hidden rounded-[28px] will-change-transform group cursor-pointer border border-white/80",
                  cardClassName,
                )}
                style={{
                  width: "var(--cf-card)",
                  boxShadow:
                    "0 24px 60px -12px rgba(23, 23, 28, 0.22), 0 8px 24px -4px rgba(123, 92, 240, 0.15), inset 0 2px 2px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.15)",
                }}
                onClick={() => goTo(index)}
              >
                {/* Real, Crystal-Clear Workflow Image */}
                {slide.src && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    draggable={false}
                    className="h-full w-full select-none object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                )}

                {/* Subtle bottom vignette to ensure text contrast while keeping image 100% visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                {/* Specular Diagonal Sheen across glass */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.05) 35%, transparent 65%)",
                  }}
                />

                {/* Top Specular Edge Line */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-20" />

                {/* Top-Left Frosted Liquid Glass App Badge */}
                {slide.app && (
                  <div
                    className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/50 text-white font-mono text-[11px] shadow-lg select-none"
                    style={{
                      background: "rgba(20, 20, 30, 0.60)",
                      backdropFilter: "blur(20px) saturate(190%)",
                      WebkitBackdropFilter: "blur(20px) saturate(190%)",
                      boxShadow: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="font-medium tracking-wide drop-shadow-xs">{slide.app}</span>
                  </div>
                )}

                {/* Center / Bottom Title: Clean Typography */}
                <div className="absolute inset-x-4 bottom-14 z-20 flex flex-col justify-end text-left pointer-events-none">
                  {slide.tag && (
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white/85 font-medium mb-1 drop-shadow-sm">
                      {slide.tag}
                    </span>
                  )}
                  <p
                    className="text-white text-[19px] sm:text-[21px] font-medium tracking-tight leading-tight drop-shadow-md"
                    style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                  >
                    {slide.title}
                  </p>
                </div>

                {/* Bottom Frosted Liquid Glass Pill (Matching User Reference 'Tbilisi' Widget) */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                  <div
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/50 text-white text-[12px] font-medium shadow-lg"
                    style={{
                      background: "rgba(255, 255, 255, 0.28)",
                      backdropFilter: "blur(20px) saturate(190%)",
                      WebkitBackdropFilter: "blur(20px) saturate(190%)",
                      boxShadow:
                        "0 6px 20px rgba(0, 0, 0, 0.18), inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    <span className="text-white/90 text-[11px]">⚡</span>
                    <span className="drop-shadow-xs">{slide.badge || "100% On-Device"}</span>
                  </div>

                  {slide.meta && slide.meta[0] && (
                    <span className="text-[11px] font-mono text-white/90 drop-shadow-xs font-medium">
                      {slide.meta[0].value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => nudge(-1)}
              className="absolute left-3 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground backdrop-blur transition hover:bg-background"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => nudge(1)}
              className="absolute right-3 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground backdrop-blur transition hover:bg-background"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {showCaption && active?.title && (
        <div
          key={selected}
          className="mt-6 flex flex-col items-center px-6 text-center duration-300 animate-in fade-in"
        >
          <p
            className="text-[20px] sm:text-[22px] font-medium tracking-tight text-[#17171C]"
            style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
          >
            {active.title}
          </p>
          {active.subtitle && (
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#5A5A66] max-w-[560px] leading-relaxed">
              {active.subtitle}
            </p>
          )}
        </div>
      )}

      {showPagination && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selected}
              onClick={() => goTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                index === selected
                  ? "w-7 bg-[#7B5CF0]"
                  : "w-2 bg-[#17171C]/20 hover:bg-[#17171C]/40",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
