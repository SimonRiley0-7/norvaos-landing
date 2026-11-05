import React from 'react'
import { motion } from 'framer-motion'
import {
  Code2,
  FileText,
  Folder,
  Check,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Activity,
  ShieldCheck,
} from 'lucide-react'
import { LiquidGlassCard } from './ui/liquid-weather-glass'

export function CapabilityStrip() {
  return (
    <section id="capabilities" className="py-20 md:py-28 relative overflow-hidden bg-[#FAF9F7]">
      {/* Background Ambient Liquid Atmosphere */}
      <div className="absolute -top-24 left-1/4 w-[650px] h-[450px] bg-gradient-to-tr from-[#7B5CF0]/18 via-[#38BDF8]/16 to-[#A855F7]/12 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-[650px] h-[450px] bg-gradient-to-bl from-[#38BDF8]/16 via-[#7B5CF0]/14 to-[#10B981]/12 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 md:px-10 relative z-10">
        {/* =========================================================
            HEADER: SWITZER MEDIUM TYPOGRAPHY
            ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16 pb-6 border-b border-[#E8E6E1]/70">
          <div className="max-w-[700px] text-left">
            <h2
              className="text-[38px] sm:text-[46px] md:text-[52px] font-medium text-[#1D1D24] tracking-tight leading-[1.06]"
              style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
            >
              Engineered for the way<br className="hidden sm:inline" /> you work on Mac.
            </h2>
          </div>
          <p className="text-[15px] sm:text-[16px] text-[#5A5A66] max-w-[440px] text-left leading-relaxed">
            Not a chatbot in a browser tab. NORVA runs in background memory, perceiving your active screen context and executing multi-step tasks across your local system.
          </p>
        </div>

        {/* =========================================================
            LIQUID GLASS DESKTOP CANVAS CONTAINER
            Inspired by 21st.dev liquid-weather-glass layout
            ========================================================= */}
        <div
          className="p-4 sm:p-7 lg:p-9 w-full rounded-[36px] overflow-hidden border border-white/80 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.22)] relative"
          style={{
            background:
              'linear-gradient(135deg, rgba(20, 24, 45, 0.45) 0%, rgba(10, 14, 25, 0.65) 100%), url("https://cdn.21st.dev/assets/mirror/4a/4a99278e8c5748e31f83496f8ca5d71d5d5e57ea94fd46b8388ee1031e963cfc.jpg") center / cover no-repeat',
          }}
        >
          {/* Subtle Stage Specular Top Rim */}
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-10" />

          {/* Grid Layout of Tactile Liquid Glass Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
            {/* =======================================================
                TOP SUMMARY BAR: HORIZONTAL SYSTEM RADAR
                ======================================================= */}
            <LiquidGlassCard
              shadowIntensity="sm"
              borderRadius="24px"
              glowIntensity="sm"
              blurIntensity="xl"
              draggable={true}
              className="lg:col-span-3 p-4 sm:p-5 text-white bg-white/[0.12] border border-white/30 backdrop-blur-2xl shadow-xl select-none"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xs">
                    <svg viewBox="0 0 170 170" width="14" height="17" fill="white">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.31-7.07-10.74-12.63-23.75-16.68-39.02-4.05-15.28-4.5-29.21-1.35-41.81 3.15-12.6 8.92-22.75 17.3-30.45 8.38-7.7 18.06-11.66 29.04-11.88 4.8 0 10.15 1.25 16.05 3.75 5.91 2.5 9.77 3.75 11.59 3.75.98 0 5.06-1.36 12.24-4.08 7.18-2.72 13.53-3.83 19.06-3.33 14.15 1.09 25.42 6.74 33.8 16.96-12.39 7.5-18.42 17.83-18.1 30.98.33 10.33 4.29 18.91 11.9 25.75 7.6 6.84 16.79 10.75 27.57 11.75-2.61 8.04-5.98 16.2-10.12 24.49zM119.22 33.52c0-7.39 2.66-14.4 7.99-21.03 5.33-6.63 12.01-11.3 20.03-14.01-.11 1.09-.16 2.07-.16 2.94 0 7.39-2.83 14.73-8.49 22.02-5.65 7.28-12.55 11.74-20.7 13.38-.22-1.09-.33-2.17-.33-3.3z" />
                    </svg>
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[14px] text-white">
                        macOS Unified Perception Engine
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] animate-pulse" />
                    </div>
                    <span className="text-[11.5px] text-white/70 font-mono">
                      Runs 100% locally on Apple Silicon Neural Engine
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white/90 font-mono">
                    <Activity size={12} className="text-emerald-400" />
                    &lt; 40ms Resolution
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white/90 font-mono">
                    <ShieldCheck size={12} className="text-sky-400" />
                    Air-Gapped Operation
                  </span>
                </div>
              </div>
            </LiquidGlassCard>

            {/* =======================================================
                CARD 1: AMBIENT CONTEXT RADAR (PERCEPTION)
                ======================================================= */}
            <LiquidGlassCard
              shadowIntensity="md"
              borderRadius="28px"
              glowIntensity="sm"
              blurIntensity="xl"
              draggable={true}
              className="p-6 sm:p-7 text-white bg-white/[0.13] border border-white/30 backdrop-blur-2xl shadow-2xl flex flex-col justify-between text-left select-none"
            >
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/35 flex items-center justify-center text-white shadow-2xs">
                    {/* Apple Context Radar Glyph */}
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" className="text-white drop-shadow-sm">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" strokeDasharray="2 2.5" />
                      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.75" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.95" />
                      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
                      <path d="M12 3 A9 9 0 0 1 21 12" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20 border border-white/30 text-[11.5px] font-semibold tracking-wide text-white shadow-xs">
                    Perception
                  </span>
                </div>

                <h3
                  className="text-[22px] sm:text-[24px] font-medium text-white tracking-tight leading-snug mb-2"
                  style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                >
                  Ambient Context Radar
                </h3>
                <p className="text-[14px] text-white/80 leading-relaxed font-normal">
                  Silently maps your open windows, git branches, and documents so you never have to explain context again.
                </p>
              </div>

              {/* Inner Traffic Light Stage */}
              <div className="w-full rounded-2xl p-4 bg-black/25 border border-white/20 backdrop-blur-xl shadow-inner">
                {/* Traffic Lights */}
                <div className="flex items-center gap-1.5 pb-2.5 mb-2.5 border-b border-white/15">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-2xs" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-2xs" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-2xs" />
                </div>

                <div className="space-y-2 text-[12.5px]">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/15 border border-white/20">
                    <div className="flex items-center gap-2">
                      <Code2 size={13} className="text-white" />
                      <span className="font-semibold text-white">VS Code · main</span>
                    </div>
                    <span className="text-[11px] font-semibold text-white bg-white/25 px-2 py-0.5 rounded-md">
                      In Focus
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 border border-white/15">
                    <div className="flex items-center gap-2">
                      <FileText size={13} className="text-white/80" />
                      <span className="font-medium text-white/90">Figma · Design Tokens</span>
                    </div>
                    <span className="text-[11px] text-white/70">Reading</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 border border-white/15">
                    <div className="flex items-center gap-2">
                      <Folder size={13} className="text-white/80" />
                      <span className="font-medium text-white/90">Finder · 14 files</span>
                    </div>
                    <span className="text-[11px] text-white/70">Indexed</span>
                  </div>
                </div>
              </div>
            </LiquidGlassCard>

            {/* =======================================================
                CARD 2: UNIFIED MEMORY CORE (ON-DEVICE APPLE SILICON)
                ======================================================= */}
            <LiquidGlassCard
              shadowIntensity="md"
              borderRadius="28px"
              glowIntensity="sm"
              blurIntensity="xl"
              draggable={true}
              className="p-6 sm:p-7 text-white bg-white/[0.13] border border-white/30 backdrop-blur-2xl shadow-2xl flex flex-col justify-between text-left select-none"
            >
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/35 flex items-center justify-center text-white shadow-2xs">
                    {/* Apple Silicon Neural Core Die Glyph */}
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" className="text-white drop-shadow-sm">
                      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" stroke="currentColor" strokeWidth="1.5" fill="rgba(255, 255, 255, 0.12)" />
                      <rect x="6.8" y="6.8" width="10.4" height="10.4" rx="2" stroke="currentColor" strokeWidth="1" strokeOpacity="0.45" />
                      <path
                        d="M13.2 14.8c-.28.32-.61.6-.96.84-.36.24-.73.36-1.12.36-.29 0-.64-.06-1.04-.18-.4-.12-.76-.18-1.07-.18-.32 0-.69.06-1.12.18-.43.12-.77.19-1.04.2-.34.01-.71-.11-1.11-.35-.29-.18-.58-.45-.87-.82-.55-.69-.98-1.52-1.28-2.48-.3-1.02-.34-1.99-.13-2.92.17-.79.52-1.44 1.05-1.95.53-.51 1.15-.77 1.86-.78.36 0 .78.08 1.25.24.47.16.78.24.92.24.1 0 .39-.08.87-.24.48-.16.92-.24 1.33-.23.68.04 1.28.24 1.8.61.37.26.66.59.88.99-.86.52-1.28 1.24-1.26 2.16.02.72.3 1.32.84 1.8.54.48 1.19.75 1.95.82-.16.48-.37.96-.64 1.44-.27.48-.52.92-.76 1.31zM12.1 8.3c0-.46.16-.9.48-1.32.32-.42.75-.72 1.29-.9.03.11.05.21.05.3 0 .47-.16.92-.48 1.35-.32.43-.75.72-1.29.87-.02-.1-.05-.2-.05-.3z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20 border border-white/30 text-[11.5px] font-semibold tracking-wide text-white flex items-center gap-1.5 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    On-Device
                  </span>
                </div>

                <h3
                  className="text-[22px] sm:text-[24px] font-medium text-white tracking-tight leading-snug mb-2"
                  style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                >
                  Unified Memory Core
                </h3>
                <p className="text-[14px] text-white/80 leading-relaxed font-normal">
                  Model weights load directly into Apple Silicon Unified Memory. Zero API bills, zero server latency, and complete air-gapped security.
                </p>
              </div>

              {/* Inner Apple Silicon Specs Stage */}
              <div className="w-full rounded-2xl p-4 bg-black/25 border border-white/20 backdrop-blur-xl shadow-inner">
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/15">
                  <div className="flex items-center gap-1.5">
                    <Cpu size={14} className="text-white" />
                    <span className="text-[12.5px] font-semibold text-white">Apple Neural Engine</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-300 bg-white/15 px-2 py-0.5 rounded-md">
                    100% On-Device
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-white/15 border border-white/20 text-left">
                    <span className="text-[10px] font-mono text-white/70 uppercase block tracking-wider">Inference</span>
                    <span className="text-[22px] font-mono font-medium text-white block mt-0.5">38 t/s</span>
                    <span className="text-[10.5px] text-emerald-300 font-medium block">Metal dispatch</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/15 border border-white/20 text-left">
                    <span className="text-[10px] font-mono text-white/70 uppercase block tracking-wider">Memory</span>
                    <span className="text-[22px] font-mono font-medium text-white block mt-0.5">&lt; 28 MB</span>
                    <span className="text-[10.5px] text-emerald-300 font-medium block">Zero Electron</span>
                  </div>
                </div>
              </div>
            </LiquidGlassCard>

            {/* =======================================================
                CARD 3: MULTI-STEP COORDINATION (AUTOMATION)
                ======================================================= */}
            <LiquidGlassCard
              shadowIntensity="md"
              borderRadius="28px"
              glowIntensity="sm"
              blurIntensity="xl"
              draggable={true}
              className="p-6 sm:p-7 text-white bg-white/[0.13] border border-white/30 backdrop-blur-2xl shadow-2xl flex flex-col justify-between text-left select-none"
            >
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/35 flex items-center justify-center text-white shadow-2xs">
                    {/* Apple Shortcuts Glyph */}
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" className="text-white drop-shadow-sm">
                      <rect x="3.2" y="7.2" width="12" height="7.6" rx="3.8" transform="rotate(-32 9.2 11)" stroke="currentColor" strokeWidth="1.5" fill="rgba(255, 255, 255, 0.22)" />
                      <rect x="8.8" y="7.2" width="12" height="7.6" rx="3.8" transform="rotate(32 14.8 11)" stroke="currentColor" strokeWidth="1.5" fill="rgba(255, 255, 255, 0.34)" />
                      <circle cx="12" cy="11" r="1.4" fill="white" />
                    </svg>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20 border border-white/30 text-[11.5px] font-semibold tracking-wide text-white shadow-xs">
                    Automation
                  </span>
                </div>

                <h3
                  className="text-[22px] sm:text-[24px] font-medium text-white tracking-tight leading-snug mb-2"
                  style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                >
                  Multi-Step Coordination
                </h3>
                <p className="text-[14px] text-white/80 leading-relaxed font-normal">
                  From a single natural intent, NORVA sequences file triage, updates code, drafts communications, and confirms execution.
                </p>
              </div>

              {/* Inner 3-Step Action Checklist */}
              <div className="w-full rounded-2xl p-3.5 bg-black/25 border border-white/20 backdrop-blur-xl shadow-inner space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/15 border border-white/20 text-[12px]">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-white/85" />
                    <span className="text-white font-medium">Triage 14 desktop files</span>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-white/25 border border-white/40 flex items-center justify-center text-white">
                    <Check size={11} strokeWidth={2.5} />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/15 border border-white/20 text-[12px]">
                  <div className="flex items-center gap-2">
                    <Code2 size={14} className="text-white/85" />
                    <span className="text-white font-medium">Extract CSS design tokens</span>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-white/25 border border-white/40 flex items-center justify-center text-white">
                    <Check size={11} strokeWidth={2.5} />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/15 border border-white/20 text-[12px]">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-md bg-[#4A154B] flex items-center justify-center text-[10px] text-white font-bold">
                      #
                    </div>
                    <span className="text-white font-medium">Post summary to Slack thread</span>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-white/25 border border-white/40 flex items-center justify-center text-white">
                    <Check size={11} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </LiquidGlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}
