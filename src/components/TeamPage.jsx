import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Plus, Copy, Check, Zap, Sparkles, Mail, Globe, ExternalLink } from 'lucide-react'
import { NorvaBrandLockup } from './NorvaLogo'

function LinkedinIcon({ size = 15, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}

const FOUNDERS = [
  {
    name: 'Bhumi Chavan',
    role: 'Co-founder · Product, Design & AI Experience',
    image: '/bhumi.jpg',
    grayscale: true,
    accentColor: '#7B5CF0',
    glowColor: 'rgba(123, 92, 240, 0.35)',
    email: 'act@norvaos.co.in',
    linkedin: 'https://www.linkedin.com/in/bhumi-chavan-4278aa37a/',
    bio: 'Bhumi shapes how Norva feels the second you start using it. From micro-interactions and visual calm to high-level system decisions, she makes autonomous desktop intelligence feel intuitive, transparent, and completely effortless.',
    leads: ['Product Direction', 'UX Architecture', 'Agent Experience'],
    currentStatus: 'Designing Calm Autonomous UX',
  },
  {
    name: 'Shivam Wadatkar',
    role: 'Co-founder · Engineering & Systems',
    image: '/shivam.png',
    grayscale: false,
    accentColor: '#7B5CF0',
    glowColor: 'rgba(123, 92, 240, 0.35)',
    email: 'act@norvaos.co.in',
    linkedin: 'https://www.linkedin.com/in/shivamwadatkar/',
    website: 'https://shivamwadatkar.vercel.app',
    bio: 'Shivam builds the quiet, privacy-first engine behind Norva. He connects local model inference with native OS hooks, obsessed with making automation feel instant without asking you to surrender a single byte of personal data to the cloud.',
    leads: ['System Architecture', 'Local AI Runtimes', 'Platform Engineering'],
    currentStatus: 'Engineering Zero-Cloud Local Systems',
  },
]

export function TeamPage({ onBack }) {
  const [copiedKey, setCopiedKey] = useState(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.title = 'Team · Norva OS'
    return () => {
      document.title = 'NORVA — Autonomous Desktop Intelligence'
    }
  }, [])

  const handleCopyEmail = (name, email) => {
    navigator.clipboard.writeText(email)
    setCopiedKey(name)
    setTimeout(() => {
      setCopiedKey(null)
    }, 2200)
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#17171C] selection:bg-[#7B5CF0]/20 selection:text-[#17171C] overflow-x-hidden">
      {/* Sticky Liquid Glass Header */}
      <header className="sticky top-0 z-40 px-6 py-4 border-b border-[#E8E6E1]/80 backdrop-blur-xl bg-[#FAF9F7]/80">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#5A5A66] hover:text-[#17171C] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Norva</span>
          </button>

          <a href="/" onClick={(e) => { e.preventDefault(); onBack(); }} className="cursor-pointer">
            <NorvaBrandLockup size={26} showWordmark={true} />
          </a>

          <a
            href="mailto:act@norvaos.co.in"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#17171C] text-white text-xs font-medium hover:bg-black transition-all cursor-pointer shadow-xs"
          >
            <Mail size={13} />
            <span>Say Hello</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-[#7B5CF0] text-[13px] font-medium mb-6"
          >
            <Sparkles size={13} />
            <span>The Team Behind Norva OS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#17171C] leading-[1.08] mb-5"
            style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
          >
            Two CS majors.{' '}
            <span
              className="font-serif italic text-[#7B5CF0]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              One shared obsession.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base sm:text-lg text-[#5A5A66] leading-relaxed"
          >
            Engineered by Bhumi &amp; Shivam. We got tired of repetitive chores on the desktop, refused to upload private data to cloud bots, and built the OS-native intelligence layer we wanted for ourselves.
          </motion.p>
        </div>

        {/* =========================================================
            PROFILE CARDS IN APPLE LIQUID GLASS (EXACT SPEC MATCH)
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto mb-24">
          {FOUNDERS.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.14, duration: 0.6 }}
              className="group relative flex flex-col"
            >
              {/* Main Card (Apple Liquid Glass) */}
              <div
                className="relative z-10 rounded-[36px] p-6 sm:p-8 flex flex-col text-center overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
                style={{
                  background:
                    'linear-gradient(155deg, rgba(255, 255, 255, 0.92) 0%, rgba(248, 246, 254, 0.78) 100%)',
                  backdropFilter: 'blur(32px) saturate(190%)',
                  WebkitBackdropFilter: 'blur(32px) saturate(190%)',
                  border: '1px solid rgba(255, 255, 255, 0.95)',
                  boxShadow:
                    '0 24px 60px -12px rgba(123, 92, 240, 0.12), inset 0 2px 2px 0 rgba(255, 255, 255, 1)',
                }}
              >
                {/* Ambient Soft Bottom Glow mirroring the purple accent */}
                <div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-32 rounded-full blur-[48px] pointer-events-none opacity-35"
                  style={{ background: founder.glowColor }}
                />

                {/* Center Squircle User Profile Image Container */}
                <div
                  className="relative mx-auto mb-6 w-52 h-52 sm:w-60 sm:h-60 rounded-[28px] overflow-hidden flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(244, 240, 255, 0.8) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.95)',
                    boxShadow: 'inset 0 2px 4px 0 rgba(255, 255, 255, 1), 0 12px 28px -4px rgba(123, 92, 240, 0.16)',
                  }}
                >
                  {founder.image ? (
                    <>
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className={`w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 ${founder.grayscale ? 'grayscale contrast-[1.05]' : ''}`}
                      />
                      {/* Subtle inner glass overlay rim */}
                      <div className="absolute inset-0 rounded-[28px] pointer-events-none ring-1 ring-inset ring-white/50" />
                    </>
                  ) : (
                    <>
                      {/* Subtle inner radial ambient shine */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#7B5CF0]/10 via-transparent to-white/70 pointer-events-none" />

                      {/* Liquid glass avatar circular frame */}
                      <div
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center relative z-10 shadow-sm"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 235, 254, 0.75) 100%)',
                          border: '1px solid rgba(255, 255, 255, 0.95)',
                          boxShadow: 'inset 0 1px 2px 0 rgba(255, 255, 255, 1), 0 4px 14px -2px rgba(123, 92, 240, 0.15)',
                        }}
                      >
                        <User size={46} className="text-[#7B5CF0] stroke-[1.6]" />
                      </div>
                    </>
                  )}
                </div>

                {/* 3. Name & Subtitle */}
                <h2
                  className="text-[26px] sm:text-[30px] font-semibold text-[#17171C] tracking-tight leading-none mb-2"
                  style={{ fontFamily: "'Switzer', sans-serif" }}
                >
                  {founder.name}
                </h2>
                <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#7B5CF0]/8 border border-[#7B5CF0]/20 text-[#7B5CF0] text-[12.5px] font-medium mb-5 mx-auto">
                  <span>{founder.role}</span>
                </div>

                {/* 4. Bio / Human Narrative */}
                <p className="text-[14px] text-[#4A4A54] leading-relaxed text-left mb-6 font-normal">
                  {founder.bio}
                </p>

                {/* 5. Leads at Norva */}
                <div className="text-left border-t border-[#EAE7E0]/90 pt-5 mb-6">
                  <span className="text-[11px] font-mono-jb uppercase tracking-wider text-[#8A8A96] block mb-2 font-medium">
                    Leads at Norva
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {founder.leads.map((item) => (
                      <span
                        key={item}
                        className="text-[12px] font-medium px-2.5 py-1 rounded-lg bg-white/80 border border-[#E8E6E1] text-[#2E2E35] shadow-2xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 6. Action Buttons & Profile Links */}
                <div className="space-y-2.5 relative z-10">
                  {/* Primary Row: Get in touch & Copy Email */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href="mailto:act@norvaos.co.in"
                      className="group/btn inline-flex items-center justify-center gap-2 py-3 px-3.5 rounded-[18px] text-[13px] font-medium text-[#17171C] transition-all duration-200 active:scale-[0.97] hover:bg-white"
                      style={{
                        background: 'rgba(255, 255, 255, 0.75)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.95)',
                        boxShadow:
                          '0 4px 16px -2px rgba(23, 23, 28, 0.04), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      <Plus size={14} className="text-[#6B6B76] transition-transform group-hover/btn:rotate-90" />
                      <span>Get in Touch</span>
                    </a>

                    <button
                      onClick={() => handleCopyEmail(founder.name, founder.email)}
                      className="inline-flex items-center justify-center gap-2 py-3 px-3.5 rounded-[18px] text-[13px] font-medium text-[#17171C] transition-all duration-200 active:scale-[0.97] hover:bg-white cursor-pointer"
                      style={{
                        background: 'rgba(255, 255, 255, 0.75)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.95)',
                        boxShadow:
                          '0 4px 16px -2px rgba(23, 23, 28, 0.04), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      {copiedKey === founder.name ? (
                        <>
                          <Check size={14} className="text-emerald-600 stroke-[2.5]" />
                          <span className="text-emerald-700 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} className="text-[#6B6B76]" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Secondary Row: LinkedIn Profile & Personal Website (Shivam only) */}
                  <div className={`grid ${founder.website ? 'grid-cols-2' : 'grid-cols-1'} gap-2.5`}>
                    {founder.linkedin && (
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center justify-center gap-2 py-3 px-3.5 rounded-[18px] text-[13px] font-medium text-[#17171C] transition-all duration-200 active:scale-[0.97] hover:bg-white hover:text-[#0A66C2]"
                        style={{
                          background: 'rgba(255, 255, 255, 0.75)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          border: '1px solid rgba(255, 255, 255, 0.95)',
                          boxShadow:
                            '0 4px 16px -2px rgba(23, 23, 28, 0.04), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
                        }}
                      >
                        <LinkedinIcon size={14} className="text-[#0A66C2]" />
                        <span>LinkedIn</span>
                        <ExternalLink size={12} className="text-[#8E8E98] group-hover/link:text-[#0A66C2] transition-colors" />
                      </a>
                    )}

                    {founder.website && (
                      <a
                        href={founder.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center justify-center gap-2 py-3 px-3.5 rounded-[18px] text-[13px] font-medium text-[#17171C] transition-all duration-200 active:scale-[0.97] hover:bg-white hover:text-[#7B5CF0]"
                        style={{
                          background: 'rgba(255, 255, 255, 0.75)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          border: '1px solid rgba(255, 255, 255, 0.95)',
                          boxShadow:
                            '0 4px 16px -2px rgba(23, 23, 28, 0.04), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
                        }}
                      >
                        <Globe size={14} className="text-[#7B5CF0]" />
                        <span>Website</span>
                        <ExternalLink size={12} className="text-[#8E8E98] group-hover/link:text-[#7B5CF0] transition-colors" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* 5. Peeking Layered Bottom Badge (Purple Accent) */}
              <div
                className="relative -mt-4 mx-4 pt-6 pb-3 px-5 rounded-b-[26px] text-center text-[12.5px] font-semibold tracking-wide flex items-center justify-center gap-2 transition-transform duration-300 group-hover:translate-y-1 select-none shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #7B5CF0 0%, #6366F1 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 12px 28px -6px rgba(123, 92, 240, 0.45)',
                }}
              >
                <Zap size={13} className="fill-current text-white" />
                <span>{founder.currentStatus}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Contact CTA */}
        <div
          className="rounded-[32px] p-8 md:p-12 liquid-glass-card text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(246, 243, 254, 0.85) 100%)',
          }}
        >
          <div className="max-w-xl mx-auto space-y-4">
            <h2
              className="text-2xl sm:text-3xl font-medium text-[#17171C] tracking-tight"
              style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
            >
              Want to get in touch with us?
            </h2>
            <p className="text-sm sm:text-base text-[#5A5A66] leading-relaxed">
              We respond to every message personally within 24 hours. Email us directly at{' '}
              <a href="mailto:act@norvaos.co.in" className="font-mono text-[#7B5CF0] font-medium hover:underline">
                act@norvaos.co.in
              </a>.
            </p>
            <div className="pt-2">
              <a
                href="mailto:act@norvaos.co.in"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#17171C] text-white text-sm font-medium hover:bg-black transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Mail size={15} />
                <span>Write to Founders</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8E6E1]/80 py-8 text-center text-xs text-[#8E8E98]">
        <p>© 2026 Norva OS. All rights reserved.</p>
      </footer>
    </div>
  )
}
