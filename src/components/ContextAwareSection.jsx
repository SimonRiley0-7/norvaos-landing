import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye,
  Sparkles,
  CornerDownLeft,
  ShieldCheck,
  ArrowRight,
  FolderSync,
} from 'lucide-react'
import GlassFolder from '@/components/ui/glass-folder-cards'
import { InteractiveTerminal } from '@/components/ui/interactive-terminal'
import { CodeEditorCard } from '@/components/ui/code-editor-card'

// Official Multi-Color Slack Logo
function SlackOfficialLogo({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 2448 2453" fill="none" className={className}>
      <g clipRule="evenodd" fillRule="evenodd">
        <path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36C5F0" />
        <path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2EB67D" />
        <path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ECB22E" />
        <path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#E01E5A" />
      </g>
    </svg>
  )
}

// Official VS Code Brand Logo
function VsCodeOfficialLogo({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.407-3.34a1.05 1.05 0 0 0-1.425.132L.25 7.026a1.05 1.05 0 0 0 .108 1.55l3.964 3.424L.358 15.42a1.05 1.05 0 0 0-.108 1.55l.963 1.104a1.05 1.05 0 0 0 1.425.132l4.407-3.34 9.46 8.63a1.49 1.49 0 0 0 1.705.29l4.94-2.377A1.5 1.5 0 0 0 24 20.06V3.94a1.5 1.5 0 0 0-.85-1.353zM18 17.5l-6.5-5.5 6.5-5.5v11z" fill="#007ACC" />
    </svg>
  )
}

// macOS Native Finder App Icon
function FinderOfficialIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="5.5" fill="url(#finder-grad)" />
      <path d="M12 4.5v15M8 9.5a1.5 1.5 0 1 0 0 .01M16 9.5a1.5 1.5 0 1 0 0 .01M7.5 14.5c1.2 2 3 3 4.5 3s3.3-1 4.5-3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="finder-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E90FF" />
          <stop offset="1" stopColor="#0051C6" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// macOS Native Terminal App Icon
function TerminalAppIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="5.5" fill="#18181B" />
      <path d="M5 8L10 12L5 16" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="16" x2="19" y2="16" stroke="#A1A1AA" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export function ContextAwareSection() {
  const [activeApp, setActiveApp] = useState('slack')

  const appContexts = [
    {
      id: 'vscode',
      name: 'VS Code',
      tag: 'greet.ts',
      icon: VsCodeOfficialLogo,
      brandColor: '#007ACC',
      bgGradient: 'linear-gradient(155deg, #0284C7 0%, #0369A1 50%, #075985 100%)',
      shimmer: 'radial-gradient(circle at 70% 30%, rgba(56, 189, 248, 0.42) 0%, rgba(99, 102, 241, 0.32) 45%, rgba(14, 165, 233, 0.22) 75%, transparent 100%)',
      shadowColor: 'rgba(2, 132, 199, 0.45)',
      badge: 'greet.ts (L:2)',
      detectedIntent: 'Synthesizing TypeScript string interpolation',
      norvaAssistance: 'Suggested native TypeScript schema + validated string interpolation.',
      actionLabel: 'Apply to Editor',
    },
    {
      id: 'finder',
      name: 'Finder',
      tag: 'Files & Folders',
      icon: FinderOfficialIcon,
      brandColor: '#0284C7',
      bgGradient: 'linear-gradient(155deg, #0369A1 0%, #1D4ED8 45%, #172554 100%)',
      shimmer: 'radial-gradient(circle at 70% 30%, rgba(56, 189, 248, 0.48) 0%, rgba(99, 102, 241, 0.32) 45%, rgba(147, 51, 234, 0.20) 75%, transparent 100%)',
      shadowColor: 'rgba(2, 132, 199, 0.50)',
      badge: '~/Downloads & Documents',
      detectedIntent: 'Autonomous Semantic File Triage & Indexing',
      norvaAssistance: 'Indexed 14 new documents, categorized messy downloads, and prepared client folders.',
      actionLabel: 'Triage with NORVA',
    },
    {
      id: 'slack',
      name: 'Slack',
      tag: 'Team Sync',
      icon: SlackOfficialLogo,
      brandColor: '#4A154B',
      bgGradient: 'linear-gradient(155deg, #4A154B 0%, #36103C 50%, #1E0722 100%)',
      shimmer: 'radial-gradient(circle at 70% 30%, rgba(54, 197, 240, 0.35) 0%, rgba(224, 30, 90, 0.28) 40%, rgba(46, 182, 125, 0.20) 70%, transparent 100%)',
      shadowColor: 'rgba(74, 21, 75, 0.55)',
      badge: '#engineering-sync (3 unread)',
      detectedIntent: 'Teammate asking for local benchmark numbers',
      norvaAssistance: 'Queried on-device test logs and drafted an executive benchmark reply.',
      actionLabel: 'Send Slack Reply',
    },
    {
      id: 'terminal',
      name: 'Terminal',
      tag: 'CLI & Shell',
      icon: TerminalAppIcon,
      brandColor: '#10B981',
      bgGradient: 'linear-gradient(155deg, #181926 0%, #11121C 50%, #0A0B10 100%)',
      shimmer: 'radial-gradient(circle at 70% 30%, rgba(45, 212, 191, 0.32) 0%, rgba(16, 185, 129, 0.22) 45%, rgba(56, 189, 248, 0.16) 75%, transparent 100%)',
      shadowColor: 'rgba(16, 185, 129, 0.35)',
      badge: 'norva — bash (v2.4)',
      detectedIntent: 'Scaffolding on-device agent runtime',
      norvaAssistance: 'Interactive CLI initialization with Apple Neural Engine bindings.',
      actionLabel: 'Launch Terminal',
    },
  ]

  const current = appContexts.find((a) => a.id === activeApp) || appContexts[0]

  return (
    <section id="product" className="pt-12 sm:pt-16 pb-24 sm:pb-32 bg-[#FAF9F7] relative overflow-hidden">
      {/* Dynamic ambient background glow tied to active app */}
      <div
        className="absolute top-1/3 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${current.brandColor} 0%, rgba(56, 189, 248, 0.10) 60%, transparent 80%)`,
        }}
      />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* =========================================================
              LEFT COLUMN (5 COLS): APPLE LIQUID GLASS WHITE DOCK
              ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            {/* Chiclet Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-black/[0.06] shadow-xs text-[#7044EC] text-[12px] font-mono tracking-wider uppercase mb-5 w-fit">
              <Eye size={13} />
              <span>Contextual Desktop Intelligence</span>
            </div>

            {/* Main Heading */}
            <h2
              className="text-[26px] sm:text-[36px] md:text-[40px] font-medium text-[#111116] tracking-tight leading-[1.12] mb-4"
              style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
            >
              A desktop that understands your work.
            </h2>

            {/* Clean, concise subtitle */}
            <p className="text-[15px] sm:text-[16px] text-[#555562] leading-relaxed mb-6 font-normal">
              Natively perceives your active workspaces—never copy-paste context again.
            </p>

            {/* Apple Liquid Glass White Sidebar Menu */}
            <div
              className="rounded-[30px] p-2 space-y-1 transition-all duration-300 relative overflow-hidden"
              style={{
                background: 'linear-gradient(155deg, rgba(255, 255, 255, 0.88) 0%, rgba(246, 244, 252, 0.72) 100%)',
                backdropFilter: 'blur(28px) saturate(190%)',
                WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                border: '1.5px solid rgba(255, 255, 255, 0.95)',
                boxShadow: '0 20px 50px -12px rgba(23, 23, 28, 0.08), inset 0 2px 2px 0 rgba(255, 255, 255, 1), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.4)',
              }}
            >
              {/* Top Specular Rim */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

              {appContexts.map((app) => {
                const Icon = app.icon
                const isSelected = activeApp === app.id
                return (
                  <button
                    key={app.id}
                    onClick={() => setActiveApp(app.id)}
                    className={`w-full text-left p-3.5 px-4 rounded-[18px] transition-all duration-200 flex items-center justify-between cursor-pointer select-none group relative overflow-hidden ${
                      isSelected
                        ? 'bg-white text-[#111116] border border-black/[0.06] shadow-[0_4px_16px_rgba(23,23,28,0.08),0_1px_2px_rgba(23,23,28,0.04)]'
                        : 'text-[#5A5A66] hover:text-[#111116] hover:bg-white/60'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                        <Icon size={19} />
                      </div>

                      <h4
                        className={`text-[15.5px] font-medium tracking-tight truncate leading-tight ${
                          isSelected ? 'text-[#111116]' : 'text-[#4B5563] group-hover:text-[#111116]'
                        }`}
                        style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                      >
                        {app.name}
                      </h4>
                    </div>

                    {isSelected ? (
                      <span
                        className="w-2.5 h-2.5 rounded-full shadow-xs animate-pulse"
                        style={{ backgroundColor: app.brandColor }}
                      />
                    ) : (
                      <ArrowRight size={13} className="text-[#A1A1AA] opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                )
              })}
            </div>

          </div>

          {/* =========================================================
              RIGHT COLUMN (7 COLS): LUXURIOUS APPLE GLASS STAGE
              ========================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div
              className="rounded-[36px] sm:rounded-[42px] p-6 sm:p-9 md:p-10 flex flex-col justify-between text-left min-h-[500px] sm:min-h-[530px] text-white relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                background: current.bgGradient,
                backdropFilter: 'blur(28px) saturate(210%)',
                WebkitBackdropFilter: 'blur(28px) saturate(210%)',
                border: '1.5px solid rgba(255, 255, 255, 0.48)',
                boxShadow: `
                  0 35px 85px -15px ${current.shadowColor},
                  0 12px 30px -5px ${current.shadowColor},
                  inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.90),
                  inset 0 -1px 2px 0 rgba(0, 0, 0, 0.25)
                `,
              }}
            >
              {/* Dynamic Ambient Iridescent Shimmer */}
              <div
                className="absolute -top-16 -right-16 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700"
                style={{ background: current.shimmer }}
              />

              {/* Top: Chiclet Pill & Live Status */}
              <div className="relative z-10 flex items-center justify-between gap-3 pb-5 border-b border-white/15">
                <span className="liquid-glass-lens px-3.5 py-1.5 rounded-full text-[13px] font-medium text-white shadow-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>Live OS Perception</span>
                </span>
                <span className="text-[12px] font-mono text-white/90 bg-white/15 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
                  {current.badge}
                </span>
              </div>

              {/* Center Stage: Interactive Code for VS Code, Glass Folders for Finder, Liquid Glass Capsule for Slack, or Terminal */}
              <AnimatePresence mode="wait">
                {activeApp === 'vscode' ? (
                  /* Code Editor Card Matching Reference Image */
                  <motion.div
                    key="vscode-code-editor-demo"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.28 }}
                    className="relative z-10 my-auto py-2 w-full flex flex-col items-center justify-center"
                  >
                    <CodeEditorCard filename="greet.ts" language="TYPESCRIPT" />
                  </motion.div>
                ) : activeApp === 'finder' ? (
                  <motion.div
                    key="finder-interactive-folders"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.28 }}
                    className="relative z-10 my-auto py-3 w-full space-y-3"
                  >
                    <div className="flex items-center justify-between text-white/90 text-[12px] font-mono pb-1">
                      <span className="flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full border border-white/25 backdrop-blur-md shadow-2xs">
                        <FolderSync size={12} className="text-sky-300" />
                        <span>Tactile File Enclave · Ready to Inspect</span>
                      </span>
                      <span className="text-white/70 hidden sm:inline text-[11px]">
                        Hover to lean · Click to open · + to add
                      </span>
                    </div>

                    {/* 2 Tactile Frosted Glass Folders */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 w-full py-2">
                      <GlassFolder
                        label="Client Deliverables"
                        meta="3 items"
                        tone="light"
                        art="aurora"
                        seed={4}
                        width={235}
                        files={[
                          { name: 'Architecture-RFC.pdf', meta: 'PDF · 1.2 MB' },
                          { name: 'Brand Tokens', meta: 'JSON · 48 KB', art: 'ember' },
                          { name: 'Contract — signed', meta: 'PDF · 840 KB' },
                        ]}
                        action="add"
                      />
                      <GlassFolder
                        label="Archives"
                        meta="4 items"
                        tone="light"
                        art="none"
                        action="more"
                        labelPlacement="top-left"
                        width={235}
                        files={[
                          { name: 'Lookbook 2026', meta: '38 images', art: 'dusk' },
                          { name: 'Invoices Q3', meta: '12 PDFs' },
                          { name: 'Screenshots — Nov', meta: 'PNG · 4.2 MB', art: 'ember' },
                          { name: 'Legal NDA.pdf', meta: 'PDF · 320 KB' },
                        ]}
                        menu={[
                          { label: 'Inspect in Finder' },
                          { label: 'Summarize All with NORVA' },
                          { label: 'Move to Trash', danger: true },
                        ]}
                      />
                    </div>
                  </motion.div>
                ) : activeApp === 'slack' ? (
                  /* Liquid Glass Notification Capsule for Slack */
                  <motion.div
                    key="slack-liquid-glass-notification"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.28 }}
                    className="relative z-10 my-auto py-8 w-full flex flex-col items-center justify-center space-y-4"
                  >
                    {/* Primary Liquid Glass Capsule Notification (Matching Image 7 Reference) */}
                    <div
                      className="w-full max-w-lg p-3.5 sm:p-4 px-5 sm:px-6 rounded-full text-left relative overflow-hidden transition-all duration-300 hover:scale-[1.01] shadow-2xl"
                      style={{
                        background: 'rgba(18, 20, 30, 0.60)',
                        backdropFilter: 'blur(32px) saturate(210%)',
                        WebkitBackdropFilter: 'blur(32px) saturate(210%)',
                        border: '1.5px solid rgba(255, 255, 255, 0.32)',
                        boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.50), inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.45), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.30)',
                      }}
                    >
                      {/* Top Edge Specular Rim */}
                      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

                      <div className="flex items-center gap-4">
                        {/* Slack Official Logo Squircle Icon */}
                        <div className="w-12 h-12 rounded-[18px] bg-[#4A154B] border border-white/25 flex items-center justify-center text-white shrink-0 shadow-md p-2.5">
                          <SlackOfficialLogo size={24} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <div className="flex items-center gap-2 min-w-0">
                              <h4
                                className="text-[15.5px] font-medium text-white tracking-tight truncate leading-snug"
                                style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                              >
                                Sarah Chen
                              </h4>
                              <span className="text-[11px] font-mono text-white/70 bg-white/12 px-2 py-0.5 rounded-md border border-white/10 shrink-0">
                                #engineering-sync
                              </span>
                            </div>
                            <span className="font-mono text-[11.5px] text-white/50 shrink-0">
                              2m ago
                            </span>
                          </div>

                          <p className="text-[13.5px] text-white/85 font-normal truncate">
                            Can you send over the local benchmark numbers for the M3 Neural Engine?
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Live Autonomous NORVA Resolution Pill */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-400/30 bg-emerald-950/30 backdrop-blur-xl shadow-lg text-[12px] text-emerald-200 font-mono">
                      <Sparkles size={13} className="text-emerald-400 animate-pulse" />
                      <span>Queried local test logs: 38 t/s Metal inference · Reply auto-drafted</span>
                    </div>
                  </motion.div>
                ) : activeApp === 'terminal' ? (
                  /* Interactive Typing Terminal Component Matching User Reference Image */
                  <motion.div
                    key="terminal-typing-demo"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.28 }}
                    className="relative z-10 my-auto py-2 w-full flex flex-col items-center justify-center"
                  >
                    <InteractiveTerminal appName="norva" username="guest" />
                  </motion.div>
                ) : (
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="relative z-10 my-auto py-6 space-y-4"
                  >
                    <div
                      className="p-6 sm:p-7 rounded-[26px] relative overflow-hidden"
                      style={{
                        background: 'rgba(255, 255, 255, 0.14)',
                        backdropFilter: 'blur(24px) saturate(190%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(190%)',
                        border: '1.2px solid rgba(255, 255, 255, 0.38)',
                        boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.22), inset 0 1px 1.5px rgba(255, 255, 255, 0.65)',
                      }}
                    >
                      <div className="flex items-center gap-2 text-white/75 text-[11.5px] font-mono uppercase tracking-wider mb-2.5">
                        <Sparkles size={13} className="text-white" />
                        <span>Inferred Intent</span>
                      </div>

                      <p
                        className="text-[22px] sm:text-[26px] font-medium text-white leading-snug tracking-tight mb-3"
                        style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                      >
                        "{current.detectedIntent}"
                      </p>

                      <p className="text-[15px] sm:text-[16px] text-white/85 leading-relaxed font-normal">
                        {current.norvaAssistance}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom: Quick Action Pill & Privacy Guarantee */}
              <div className="relative z-10 pt-5 border-t border-white/15 flex items-center justify-between flex-wrap gap-3">
                <button
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-white/95 text-[#111116] text-[13.5px] font-medium tracking-tight shadow-md flex items-center gap-2 transition-all cursor-pointer select-none group"
                  style={{ fontFamily: "'Switzer', sans-serif" }}
                >
                  <span>{current.actionLabel}</span>
                  <CornerDownLeft
                    size={13}
                    style={{ color: current.brandColor }}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </button>

                <div className="flex items-center gap-1.5 text-[12px] text-white/80 font-mono">
                  <ShieldCheck size={13} className="text-emerald-300" />
                  <span>100% On-Device · Zero Cloud Egress</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
