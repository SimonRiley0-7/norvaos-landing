"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref?: string;
  tag?: string;
  accentColor?: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLDivElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex,
  );

  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};

    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "4.5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "4.5fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items.length, isDesktop]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "w-full max-w-6xl p-2.5 sm:p-4 rounded-[36px]",
        "bg-white/60 backdrop-blur-2xl border border-white/90",
        "shadow-[0_24px_60px_-15px_rgba(23,23,28,0.06),inset_0_2px_4px_rgba(255,255,255,0.95)]",
        className
      )}
      {...props}
    >
      <ul
        className="w-full gap-2.5 sm:gap-3 grid h-[660px] md:h-[580px] transition-[grid-template-columns,grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          ...gridStyle,
          ...(isDesktop
            ? { gridTemplateRows: "1fr" }
            : { gridTemplateColumns: "1fr" }),
        }}
      >
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <li
              key={item.id}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-[24px] select-none",
                "transition-all duration-500 ease-out",
                "border border-white/95",
                "md:min-w-[68px] min-h-0 min-w-0",
                isActive
                  ? "shadow-[0_24px_50px_-12px_rgba(23,23,28,0.18),inset_0_1.5px_2px_rgba(255,255,255,1)] ring-1 ring-black/5"
                  : "shadow-[0_8px_20px_-6px_rgba(23,23,28,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-md hover:scale-[1.005]"
              )}
              onMouseEnter={() => handleInteraction(index)}
              onFocus={() => handleInteraction(index)}
              onClick={() => handleInteraction(index)}
              tabIndex={0}
              data-active={isActive}
            >
              {/* Refractive Liquid Background Artwork */}
              <img
                src={item.imgSrc}
                alt={item.title}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out",
                  isActive
                    ? "scale-105 filter-none brightness-100"
                    : "scale-110 saturate-[0.85] brightness-[0.92] group-hover:brightness-100"
                )}
              />

              {/* Liquid Frosted Glass Overlay */}
              <div
                className={cn(
                  "absolute inset-0 transition-all duration-500",
                  isActive
                    ? "bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                    : "bg-white/40 backdrop-blur-[6px] group-hover:bg-white/25 transition-all"
                )}
              />

              {/* Specular Convex Rim Highlight */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none z-20" />

              {/* COLLAPSED STATE (Desktop Vertical Bar) — Absolute, doesn't interfere with active layout */}
              <div
                className={cn(
                  "absolute inset-0 hidden md:flex flex-col items-center justify-between py-5 px-2 transition-opacity duration-300 z-10 pointer-events-none",
                  isActive ? "opacity-0" : "opacity-100"
                )}
              >
                {/* Top Glass Pebble Icon in Collapsed State */}
                <div className="w-9 h-9 rounded-xl bg-white/85 backdrop-blur-xl border border-white/95 shadow-2xs flex items-center justify-center text-[#17171C]">
                  {item.icon}
                </div>

                {/* Vertical Switzer Title */}
                <div
                  className="flex items-center my-auto"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#17171C] whitespace-nowrap drop-shadow-2xs">
                    {item.title}
                  </span>
                </div>

                {/* Bottom Dot */}
                <span className="w-1.5 h-1.5 rounded-full bg-black/30" />
              </div>

              {/* COLLAPSED STATE (Mobile Horizontal Bar) */}
              <div
                className={cn(
                  "absolute inset-0 flex md:hidden items-center justify-between px-3.5 transition-opacity duration-300 z-10 pointer-events-none",
                  isActive ? "opacity-0" : "opacity-100"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/90 backdrop-blur-xl border border-white/95 shadow-2xs flex items-center justify-center text-[#17171C]">
                    {item.icon}
                  </div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#17171C] drop-shadow-2xs truncate max-w-[210px]">
                    {item.title}
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-black/40" />
              </div>

              {/* ACTIVE STATE: Top Liquid Badge (Pinned at Top-Left with generous breathing room) */}
              {item.tag && (
                <div
                  className={cn(
                    "absolute top-4 sm:top-5 left-4 sm:left-5 z-20 transition-all duration-300",
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  )}
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xl border border-white/95 text-[11px] font-mono uppercase tracking-wider text-[#17171C] shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981] animate-pulse" />
                    {item.tag}
                  </span>
                </div>
              )}

              {/* ACTIVE STATE: Bottom Liquid Glass Card (Pinned at Bottom with zero chance of touching top badge) */}
              <div
                className={cn(
                  "absolute bottom-3.5 sm:bottom-4 inset-x-3.5 sm:inset-x-4 z-20",
                  "p-4 sm:p-5 sm:px-6 rounded-[20px] transition-all duration-500 text-left",
                  "bg-white/92 backdrop-blur-2xl border border-white/95",
                  "shadow-[0_16px_40px_-10px_rgba(0,0,0,0.18),inset_0_1.5px_2px_rgba(255,255,255,1)]",
                  isActive
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6 pointer-events-none"
                )}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF9F7] border border-black/5 flex items-center justify-center text-[#7B5CF0] shadow-2xs">
                    {item.icon}
                  </div>
                  <span className="font-mono text-[11px] text-[#8E8E98] uppercase tracking-wider">
                    Hardware Isolated
                  </span>
                </div>

                <h3
                  className="text-xl sm:text-2xl font-medium text-[#17171C] tracking-tight leading-snug mb-1.5"
                  style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                >
                  {item.title}
                </h3>

                <p className="max-w-xl text-[13px] sm:text-[14px] text-[#5A5A66] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

ExpandingCards.displayName = "ExpandingCards";
