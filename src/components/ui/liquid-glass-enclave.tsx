"use client"

import * as React from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { ShieldCheck, HardDrive, Cpu, WifiOff, Lock, Check, Radio, Ban, Database, Activity, ShieldAlert } from "lucide-react"

/**
 * Apple Liquid Glass Enclave Component
 * Inspired by 21st.dev liquid glass architecture:
 * - Dynamic cursor-tracked specular highlight
 * - Multi-layered refractive frosted glass
 * - Ambient hardware security radiance
 * - Live zero-egress packet flatline monitor
 */

export interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  glowColor?: string
  frostedTone?: "light" | "smoked" | "emerald"
}

export function LiquidGlassCard({
  children,
  className = "",
  glowColor = "rgba(123, 92, 240, 0.12)",
  frostedTone = "light",
  ...props
}: LiquidGlassCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const backgroundGradient = useMotionTemplate`
    radial-gradient(
      450px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 255, 255, ${frostedTone === "smoked" ? "0.08" : "0.45"}),
      transparent 70%
    )
  `

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-[32px] transition-all duration-300 ${className}`}
      style={{
        background:
          frostedTone === "smoked"
            ? "linear-gradient(155deg, rgba(22, 24, 34, 0.92) 0%, rgba(14, 16, 24, 0.96) 100%)"
            : frostedTone === "emerald"
            ? "linear-gradient(155deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 244, 0.85) 100%)"
            : "linear-gradient(155deg, rgba(255, 255, 255, 0.94) 0%, rgba(247, 246, 254, 0.82) 100%)",
        backdropFilter: "blur(32px) saturate(200%)",
        WebkitBackdropFilter: "blur(32px) saturate(200%)",
        border:
          frostedTone === "smoked"
            ? "1px solid rgba(255, 255, 255, 0.10)"
            : "1px solid rgba(255, 255, 255, 0.95)",
        boxShadow:
          frostedTone === "smoked"
            ? "0 24px 60px -15px rgba(0, 0, 0, 0.5), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.15)"
            : "0 24px 60px -15px rgba(23, 23, 28, 0.08), 0 4px 14px -4px rgba(23, 23, 28, 0.03), inset 0 1.5px 2px rgba(255, 255, 255, 1)",
      }}
      {...props}
    >
      {/* Specular light tracking layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: backgroundGradient,
        }}
      />

      {/* Top Refractive Rim Specular Line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] z-20"
        style={{
          background:
            frostedTone === "smoked"
              ? "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)"
              : "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.95) 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function LiquidGlassEnclave() {
  const [activeTab, setActiveTab] = React.useState<"enclave" | "airgap">("enclave")

  return (
    <div className="w-full">
      {/* Dynamic Background Refraction Blooms */}
      <div className="relative">
        <div className="absolute -top-12 left-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Master Liquid Glass Enclave Container */}
        <LiquidGlassCard className="p-6 sm:p-10 mb-12" frostedTone="light">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
            {/* =========================================================
                CHAMBER 1: MACOS SECURE HARDWARE ENCLAVE (COL 8)
                ========================================================= */}
            <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 rounded-[24px] bg-gradient-to-br from-white/95 via-white/80 to-[#F6F5FC]/70 border border-white/95 shadow-sm space-y-6">
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/[0.06]">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#17171C] uppercase tracking-wider">
                    macOS Sandboxed Enclave · User Machine
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50/90 px-3 py-1 rounded-full border border-emerald-200/80 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    TCC Protected
                  </span>
                  <span className="text-[11px] font-mono text-[#7B5CF0] bg-white/90 px-3 py-1 rounded-full border border-white shadow-2xs">
                    Hardware Boundary
                  </span>
                </div>
              </div>

              {/* 3 Interactive Liquid Glass Hardware Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* Node 1 */}
                <div className="p-4 rounded-2xl bg-white/85 border border-white shadow-2xs hover:shadow-md hover:bg-white transition-all duration-200 text-left group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-[#8E8E98] uppercase tracking-wider">
                      Execution Core
                    </span>
                    <Cpu size={14} className="text-[#7B5CF0] group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="font-medium text-[14px] text-[#17171C]">
                    Apple Silicon NPU
                  </p>
                  <p className="text-[11px] text-[#5A5A66] mt-1 leading-snug">
                    Direct Metal dispatch · 0ms external latency
                  </p>
                </div>

                {/* Node 2 */}
                <div className="p-4 rounded-2xl bg-white/85 border border-white shadow-2xs hover:shadow-md hover:bg-white transition-all duration-200 text-left group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-[#8E8E98] uppercase tracking-wider">
                      Data Layer
                    </span>
                    <Database size={14} className="text-[#10B981] group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="font-medium text-[14px] text-[#17171C]">
                    Encrypted SQLite DB
                  </p>
                  <p className="text-[11px] text-[#5A5A66] mt-1 leading-snug">
                    Local vector embeddings inside ~/Library
                  </p>
                </div>

                {/* Node 3 */}
                <div className="p-4 rounded-2xl bg-white/85 border border-white shadow-2xs hover:shadow-md hover:bg-white transition-all duration-200 text-left group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-[#8E8E98] uppercase tracking-wider">
                      System Access
                    </span>
                    <Lock size={14} className="text-[#3B82F6] group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="font-medium text-[14px] text-[#17171C]">
                    Native macOS APIs
                  </p>
                  <p className="text-[11px] text-[#5A5A66] mt-1 leading-snug">
                    Explicit ScreenCaptureKit user permission
                  </p>
                </div>
              </div>

              {/* Zero-Egress Network Socket Monitor Bar */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-white/90 to-emerald-500/10 border border-emerald-500/20 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
                    <Activity size={16} />
                  </div>
                  <div>
                    <span className="text-[12px] font-medium text-[#17171C] block">
                      Network Outbound Socket Policy:
                    </span>
                    <span className="text-[11px] text-[#5A5A66]">
                      Hardware-level egress firewall block
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 border border-emerald-500/30 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10B981] animate-pulse" />
                  <span className="font-mono font-bold text-[11px] tracking-wider text-emerald-600">
                    STRICTLY 0.00 KB/s EGRESS
                  </span>
                </div>
              </div>
            </div>

            {/* =========================================================
                CHAMBER 2: EXTERNAL CLOUD COMPARISON (COL 4)
                ========================================================= */}
            <div
              className="lg:col-span-4 p-6 sm:p-8 rounded-[24px] text-white text-left flex flex-col justify-between relative overflow-hidden group"
              style={{
                background: "linear-gradient(155deg, rgba(20, 22, 32, 0.96) 0%, rgba(11, 13, 20, 0.98) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 24px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1.5px 2px rgba(255, 255, 255, 0.15)",
              }}
            >
              {/* Subtle Ambient Red Glow representing Cloud Attack Surface */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-rose-500/10 rounded-full blur-[60px] pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-rose-300 text-[11px] font-mono uppercase tracking-wider mb-3">
                  <Ban size={12} className="text-rose-400" />
                  <span>External Web / Cloud</span>
                </div>

                <h4
                  className="text-[20px] font-medium text-white tracking-tight leading-snug"
                  style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                >
                  No remote relays. No model training on your data.
                </h4>
              </div>

              {/* Frosted Threat Block Badges */}
              <div className="space-y-2.5 my-6 text-[13px] text-[#A1A1AA]">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <span className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                  <span>No cloud vector DBs</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <span className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                  <span>No prompt or keystroke logging</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <span className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                  <span>No subscription telemetry</span>
                </div>
              </div>

              {/* Verification Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#A1A1AA]">
                <span>Open binary inspection</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck size={13} /> Verified
                </span>
              </div>
            </div>
          </div>
        </LiquidGlassCard>
      </div>

      {/* =========================================================
          3 BENTO PILLARS: APPLE LIQUID GLASS TILES
          ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1: Apple Silicon & Metal Acceleration */}
        <LiquidGlassCard
          className="p-7 text-left hover:-translate-y-1.5 transition-all duration-300 group cursor-default"
          frostedTone="light"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7B5CF0]/15 via-white/80 to-[#7B5CF0]/5 border border-white shadow-2xs flex items-center justify-center text-[#7B5CF0] mb-5 group-hover:scale-110 transition-transform">
            <Cpu size={22} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#7B5CF0]/10 border border-[#7B5CF0]/20 text-[#7B5CF0] font-mono text-[11px] uppercase tracking-wider mb-2.5">
            Unified Memory
          </div>
          <h4
            className="font-medium text-[17px] text-[#17171C] mb-2 leading-snug"
            style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
          >
            Apple Silicon & Metal Acceleration
          </h4>
          <p className="text-[14px] text-[#5A5A66] leading-relaxed">
            Model weights are quantized and loaded directly into Unified Memory, leveraging the Neural Engine for 30+ tokens/sec without external GPUs.
          </p>
        </LiquidGlassCard>

        {/* Pillar 2: Local Vector Store & Embeddings */}
        <LiquidGlassCard
          className="p-7 text-left hover:-translate-y-1.5 transition-all duration-300 group cursor-default"
          frostedTone="light"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-white/80 to-emerald-500/5 border border-white shadow-2xs flex items-center justify-center text-emerald-600 mb-5 group-hover:scale-110 transition-transform">
            <HardDrive size={22} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 font-mono text-[11px] uppercase tracking-wider mb-2.5">
            Encrypted At Rest
          </div>
          <h4
            className="font-medium text-[17px] text-[#17171C] mb-2 leading-snug"
            style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
          >
            Local Vector Store & Embeddings
          </h4>
          <p className="text-[14px] text-[#5A5A66] leading-relaxed">
            All document embeddings, search indices, and conversation histories are stored in an encrypted local SQLite database inside ~/Library.
          </p>
        </LiquidGlassCard>

        {/* Pillar 3: Air-Gapped Operation Capable */}
        <LiquidGlassCard
          className="p-7 text-left hover:-translate-y-1.5 transition-all duration-300 group cursor-default"
          frostedTone="light"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/15 via-white/80 to-blue-500/5 border border-white shadow-2xs flex items-center justify-center text-blue-600 mb-5 group-hover:scale-110 transition-transform">
            <WifiOff size={22} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 font-mono text-[11px] uppercase tracking-wider mb-2.5">
            100% Offline
          </div>
          <h4
            className="font-medium text-[17px] text-[#17171C] mb-2 leading-snug"
            style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
          >
            Air-Gapped Operation Capable
          </h4>
          <p className="text-[14px] text-[#5A5A66] leading-relaxed">
            Disconnect Wi-Fi or turn on Airplane Mode. NORVA continues to understand, organize, draft, and automate with 100% functionality.
          </p>
        </LiquidGlassCard>
      </div>
    </div>
  )
}

