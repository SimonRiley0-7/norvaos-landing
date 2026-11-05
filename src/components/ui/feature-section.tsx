"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// Compatible image component for standard React / Vite environments
function Image({
  src,
  alt,
  className,
  width,
  height,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={src}
      alt={alt || ""}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      {...props}
    />
  )
}

export interface Feature {
  step: string
  title?: string
  content: string
  image: string
  badge?: string
  metric?: string
}

export interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
  imageHeight?: string
}

export function FeatureSteps({
  features,
  className,
  title,
  autoPlayInterval = 3500,
  imageHeight,
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, features.length, autoPlayInterval])

  return (
    <div className={cn("p-4 sm:p-8 md:p-10", className)}>
      <div className="max-w-7xl mx-auto w-full">
        {title && (
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-medium mb-10 text-center tracking-tight text-[#17171C]"
            style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
          >
            {title}
          </h2>
        )}

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Left Column: Feature Stepper List */}
          <div className="order-2 md:order-1 space-y-3 sm:space-y-3.5 text-left w-full">
            {features.map((feature, index) => {
              const isActive = index === currentFeature
              return (
                <motion.div
                  key={index}
                  className={cn(
                    "flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-[20px] cursor-pointer select-none transition-all duration-300 relative overflow-hidden",
                    isActive
                      ? "bg-white/80 border border-white shadow-[0_10px_28px_-8px_rgba(123,92,240,0.18),inset_0_2px_2px_0_rgba(255,255,255,1)]"
                      : "bg-white/35 hover:bg-white/60 border border-white/60 hover:-translate-y-0.5"
                  )}
                  style={{
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  }}
                  onClick={() => {
                    setCurrentFeature(index)
                    setProgress(0)
                  }}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: isActive ? 1 : 0.65 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Subtle active glow border */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFeatureGlow"
                      className="absolute inset-0 rounded-[20px] border-2 border-[#7B5CF0]/40 pointer-events-none"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Indicator Icon Circle */}
                  <motion.div
                    className={cn(
                      "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 shrink-0 transition-transform duration-300 relative z-10",
                      isActive
                        ? "bg-[#7B5CF0] border-[#7B5CF0] text-white scale-105 shadow-[0_4px_14px_-2px_rgba(123,92,240,0.45),inset_0_1px_1px_rgba(255,255,255,0.7)]"
                        : "bg-white/85 border-[#C4B0FA]/50 text-[#5A5A66]"
                    )}
                  >
                    {index <= currentFeature ? (
                      <span className="text-xs sm:text-sm font-bold">✓</span>
                    ) : (
                      <span className="text-xs sm:text-sm font-semibold">{index + 1}</span>
                    )}
                  </motion.div>

                  {/* Content Area */}
                  <div className="flex-1 min-w-0 relative z-10">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-mono text-[10.5px] font-semibold tracking-wider text-[#7B5CF0] uppercase">
                        {feature.step}
                      </span>
                      {feature.metric && (
                        <span className="font-mono text-[10.5px] px-2 py-0.5 rounded-full bg-[#7B5CF0]/10 text-[#7B5CF0] font-medium">
                          {feature.metric}
                        </span>
                      )}
                    </div>
                    <h3
                      className={cn(
                        "text-[16px] sm:text-[17px] font-medium tracking-tight transition-colors",
                        isActive ? "text-[#17171C]" : "text-[#3A3A46]"
                      )}
                      style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                    >
                      {feature.title || feature.step}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-[#5A5A66] mt-0.5 leading-snug">
                      {feature.content}
                    </p>

                    {/* Progress line inside active step */}
                    {isActive && (
                      <div className="w-full h-1 bg-[#7B5CF0]/15 rounded-full overflow-hidden mt-2.5">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#7B5CF0] to-[#A855F7] rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Right Column: Liquid Glass Visual Showcase Card */}
          <div
            className={cn(
              "order-1 md:order-2 relative w-full h-[250px] xs:h-[300px] sm:h-[380px] md:h-[440px] overflow-hidden rounded-[26px] sm:rounded-[36px] shadow-2xl border border-white/90",
              imageHeight
            )}
            style={{
              background: "linear-gradient(155deg, rgba(255, 255, 255, 0.85) 0%, rgba(246, 244, 254, 0.70) 100%)",
              backdropFilter: "blur(32px) saturate(200%)",
              WebkitBackdropFilter: "blur(32px) saturate(200%)",
              boxShadow:
                "0 30px 80px -20px rgba(23, 23, 28, 0.12), inset 0 2px 2px 0 rgba(255, 255, 255, 1), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.08)",
            }}
          >
            {/* Specular Edge Highlights */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-20" />
            <div className="absolute inset-y-0 left-0 w-[1.5px] bg-gradient-to-b from-white/80 via-transparent to-transparent pointer-events-none z-20" />

            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-[32px] sm:rounded-[36px] overflow-hidden"
                      initial={{ y: 70, opacity: 0, rotateX: -12 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -70, opacity: 0, rotateX: 12 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.title || feature.step}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out transform scale-105"
                      />
                      {/* Frosted glass gradient vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10 pointer-events-none" />

                      {/* Top Step Pill Badge */}
                      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/35 text-white font-mono text-xs tracking-wider uppercase shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                        <span>{feature.step}</span>
                        {feature.title && <span className="text-white/70">· {feature.title}</span>}
                      </div>

                      {/* Bottom Liquid Glass Information Pill (Inspired by Apple liquid glass widget) */}
                      {feature.badge && (
                        <div
                          className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 p-4 rounded-[22px] border border-white/40 flex items-center justify-between text-white shadow-xl"
                          style={{
                            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)",
                            backdropFilter: "blur(24px) saturate(180%)",
                            WebkitBackdropFilter: "blur(24px) saturate(180%)",
                            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)",
                          }}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center shrink-0 border border-white/30">
                              <span className="text-sm font-bold text-white">⚡</span>
                            </div>
                            <div className="truncate">
                              <p className="text-[11px] font-mono uppercase tracking-wider text-white/75 leading-none mb-1">
                                Runtime Guarantee
                              </p>
                              <p className="text-sm sm:text-base font-medium text-white truncate">
                                {feature.badge}
                              </p>
                            </div>
                          </div>

                          {feature.metric && (
                            <div className="text-right shrink-0 pl-3 border-l border-white/20">
                              <p className="text-[10px] font-mono uppercase tracking-wider text-white/75 leading-none mb-1">
                                Verified
                              </p>
                              <p className="font-mono text-sm sm:text-base font-semibold text-[#A7F3D0]">
                                {feature.metric}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureSteps
