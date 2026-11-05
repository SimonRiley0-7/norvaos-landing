import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  Check,
} from 'lucide-react'

function UserLiquidGlassCard({ current }) {
  return (
    <div
      className="w-full rounded-[30px] sm:rounded-[36px] p-6 sm:p-7 text-left text-white relative overflow-hidden shadow-2xl h-full flex flex-col justify-between"
      style={{
        background: current.bgGradient,
        backdropFilter: 'blur(32px) saturate(210%)',
        WebkitBackdropFilter: 'blur(32px) saturate(210%)',
        border: '1.5px solid rgba(255, 255, 255, 0.65)',
        boxShadow: `
          0 25px 70px -15px ${current.shadowColor},
          0 10px 24px -5px ${current.shadowColor},
          inset 0 2px 2.5px 0 rgba(255, 255, 255, 0.95),
          inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.15)
        `,
      }}
    >
      {/* Dynamic Celestial Sky Shimmer */}
      <div
        className="absolute -top-16 -right-16 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: current.shimmer }}
      />

      {/* Top Specular Rim & Lens Glare */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/30 via-white/5 to-transparent pointer-events-none" />

      {/* Top Header Row with Status & Tag */}
      <div className="relative z-10 flex items-center justify-between gap-3 mb-5 pb-3 border-b border-white/20">
        <span className="text-[12px] font-mono uppercase tracking-wider text-white/90 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
          {current.tag}
        </span>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/25 backdrop-blur-md border border-white/35 text-[11.5px] font-medium text-white shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
          <span>{current.badge}</span>
        </span>
      </div>

      {/* Title & Description (No giant numbers / hrs saved) */}
      <div className="relative z-10 mb-5">
        <h3
          className="text-[25px] sm:text-[28px] font-medium text-white tracking-tight leading-snug mb-2"
          style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
        >
          {current.title}
        </h3>

        <p className="text-[14px] sm:text-[14.5px] text-white/90 font-normal leading-relaxed">
          {current.description}
        </p>
      </div>

      {/* 3 Compact Frosted Glass Capability Chips */}
      <div className="relative z-10 space-y-2">
        {current.features.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2.5 p-2.5 px-3 rounded-xl bg-white/20 hover:bg-white/25 border border-white/30 backdrop-blur-md text-[13px] text-white transition-all shadow-xs"
          >
            <div className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center shrink-0 text-white">
              <Check size={10} strokeWidth={3} />
            </div>
            <span className="leading-tight font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AudienceSection() {
  const [activeUser, setActiveUser] = useState('professionals')

  const userProfiles = {
    professionals: {
      id: 'professionals',
      tabLabel: 'Office Professionals',
      tag: 'Office & Executive',
      title: 'Deep Focus for Office Work',
      description:
        'Eliminate chaotic app switching between Slack, Mail, Finder, and spreadsheets. NORVA perceives your active workspace to triage morning inboxes, recall buried contracts, and draft sensitive replies with zero cloud latency.',
      locationPill: 'Confidential Workspace · 0.00 KB Egress',
      badge: '100% On-Device',
      bgGradient: 'linear-gradient(135deg, #0284C7 0%, #0EA5E9 45%, #38BDF8 85%, #7DD3FC 100%)',
      shimmer: 'radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.45) 0%, transparent 55%)',
      shadowColor: 'rgba(14, 165, 233, 0.35)',
      features: [
        'Daily morning briefings synthesized across Mail, Calendar & Slack',
        'Instant local recall of contracts, NDA PDFs & financial models',
        'Drafts sensitive executive replies directly inside your active apps',
      ],
    },
    students: {
      id: 'students',
      tabLabel: 'Students',
      tag: 'Study & Research',
      title: 'Supercharged Academic Intel',
      description:
        'Master dense coursework and research without costly AI subscriptions. NORVA parses 100+ page textbook PDFs, indexes lecture recordings, and formats citations directly on your Mac, even in airplane mode.',
      locationPill: 'Campus Ready · Works 100% Offline',
      badge: 'Free Forever Offline',
      bgGradient: 'linear-gradient(135deg, #4338CA 0%, #6366F1 45%, #0EA5E9 85%, #38BDF8 100%)',
      shimmer: 'radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.42) 0%, transparent 55%)',
      shadowColor: 'rgba(99, 102, 241, 0.35)',
      features: [
        'Synthesizes 100+ page textbook PDFs & lecture slide decks',
        'Semantic timestamp search across recorded lectures & notes',
        'Auto-formats BibTeX citations & LaTeX formulas without leaving editor',
      ],
    },
  }

  return (
    <section id="audiences" className="py-20 md:py-28 bg-[#FAF9F7] relative border-t border-[#E8E6E1]/70 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sky-200/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10 text-center">
        {/* Section Header */}
        <div className="max-w-[720px] mx-auto mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-black/[0.06] shadow-xs text-[#0284C7] text-[12px] font-mono tracking-wider uppercase mb-4">
            <Sparkles size={13} />
            <span>Built For The Everyday Users</span>
          </div>

          <h2
            className="text-[34px] sm:text-[44px] md:text-[48px] font-medium text-[#111116] tracking-tight leading-[1.08] mb-4"
            style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
          >
            Engineered for the way you work &amp; study.
          </h2>

          <p className="text-[16px] text-[#555562] leading-relaxed max-w-[560px] mx-auto font-normal">
            No cloud subscriptions, zero data exposure, and instant on-device execution for office professionals and students alike.
          </p>
        </div>

        {/* =========================================================
            WHITE LIQUID GLASS HEADER TOGGLE
            ========================================================= */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="relative inline-flex items-center justify-center">
            {/* Ambient Soft Glow Refracting on Canvas */}
            <div className="absolute -inset-2 rounded-full bg-sky-200/30 blur-xl opacity-70 pointer-events-none" />

            {/* Outer White Frosted Liquid Glass Capsule Shell */}
            <div
              className="inline-flex items-center p-1.5 rounded-full relative overflow-hidden transition-all duration-300 shadow-[0_16px_40px_-10px_rgba(23,23,28,0.08)]"
              style={{
                background:
                  'linear-gradient(155deg, rgba(255, 255, 255, 0.90) 0%, rgba(246, 244, 252, 0.75) 100%)',
                backdropFilter: 'blur(28px) saturate(190%)',
                WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                border: '1.5px solid rgba(255, 255, 255, 0.95)',
                boxShadow:
                  '0 18px 45px -10px rgba(23, 23, 28, 0.08), inset 0 2px 2px 0 rgba(255, 255, 255, 1), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.4)',
              }}
            >
              {/* Top Specular Rim */}
              <div className="absolute inset-x-4 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

              {/* Two Tabs: Office Professionals & Students */}
              {[
                { id: 'professionals', label: 'Office Professionals', icon: Briefcase },
                { id: 'students', label: 'Students', icon: GraduationCap },
              ].map((tab) => {
                const isSelected = activeUser === tab.id
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveUser(tab.id)}
                    className={`relative px-3.5 sm:px-8 py-2 sm:py-2.5 rounded-full text-[12.5px] sm:text-[15px] font-medium transition-all duration-200 cursor-pointer select-none flex items-center gap-1.5 sm:gap-2.5 z-10 ${
                      isSelected
                        ? 'text-[#111116]'
                        : 'text-[#5A5A66] hover:text-[#111116] hover:bg-white/40'
                    }`}
                    style={{ fontFamily: "'Switzer', sans-serif" }}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeUserTabIndicator"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid rgba(0, 0, 0, 0.06)',
                          boxShadow:
                            '0 4px 16px rgba(23, 23, 28, 0.08), 0 1px 2px rgba(23, 23, 28, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1)',
                        }}
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}
                    <Icon
                      size={16}
                      className={`relative z-10 transition-colors ${
                        isSelected ? 'text-[#0284C7]' : 'text-[#64748B]'
                      }`}
                    />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* =========================================================
            COMPACT LIQUID GLASS USER CARD (Matching Image 2 Reference)
            ========================================================= */}
        <div className="max-w-[620px] mx-auto overflow-hidden rounded-[30px] sm:rounded-[36px] relative shadow-2xl">
          <div
            className="flex w-[200%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform:
                activeUser === 'professionals' ? 'translateX(0%)' : 'translateX(-50%)',
            }}
          >
            {/* Slide 1: Office Professionals */}
            <div className="w-1/2 shrink-0">
              <UserLiquidGlassCard current={userProfiles.professionals} />
            </div>

            {/* Slide 2: Students */}
            <div className="w-1/2 shrink-0">
              <UserLiquidGlassCard current={userProfiles.students} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AudienceSection
