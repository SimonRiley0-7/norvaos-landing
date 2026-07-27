import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Folder, Mail, Code } from 'lucide-react'
import { BorderBeam } from './BorderBeam'

const TABS = [
  {
    id: 'files',
    label: 'Files & System',
    icon: Folder,
    headline: 'Organize everything, instantly.',
    body: 'NORVA finds, organizes, and parses your local files automatically using native Finder APIs.',
    bullets: [
      'Scans and categorizes any directory',
      'Moves files intelligently by project context',
      'Integrates with native macOS Finder APIs',
    ],
    terminal: [
      '> norva "clear downloads and archive PDFs by project"',
      '[OK] Scanning ~/Downloads... 47 files found',
      '[OK] Identified 12 PDFs — categorizing by project name',
      '[OK] Moving files to ~/Projects/[project-name]/docs/',
      '[OK] 35 misc files moved to Trash',
      '[DONE] Downloads folder: 47 → 0 files in 3.2s',
    ],
  },
  {
    id: 'comm',
    label: 'Communication',
    icon: Mail,
    headline: 'Your inbox. Already handled.',
    body: 'Draft replies, summarize threads, and send emails — all from one prompt.',
    bullets: [
      'Reads email context and tone automatically',
      'Drafts replies matching your writing style',
      'Opens Mail app for final review before send',
    ],
    terminal: [
      "> norva \"draft a reply to Shivam's email about the deadline\"",
      '[OK] Reading latest email from Shivam Mehta...',
      '[OK] Context: project deadline moved to Friday',
      '[OK] Drafting reply in your tone...',
      '[READY] Reply drafted — opening Mail for review',
    ],
  },
  {
    id: 'dev',
    label: 'Dev Workflow',
    icon: Code,
    headline: 'Build full-stack apps. In minutes.',
    body: 'NORVA architects, codes, provisions databases, and launches your app — entirely locally.',
    bullets: [
      'Generates full architecture plans before coding',
      'Provisions Docker containers automatically',
      'Runs headless browser tests before delivery',
    ],
    terminal: [
      '> norva "build a kanban board with React and Postgres"',
      '[OK] Planner model loaded — Qwen 1.5B LoRA',
      '[OK] Architecture plan generated — 8 components',
      '[OK] Docker Postgres container provisioned on :5432',
      '[OK] Scaffolding React + Vite + Tailwind...',
      '[OK] Writing API routes and schema...',
      '[OK] Headless browser test — PASSED',
      '[LIVE] App running at localhost:5173',
    ],
  },
]

function TermLine({ line }) {
  const isLive = line.startsWith('[LIVE]')
  const isOk = line.startsWith('[OK]')
  const isDone = line.startsWith('[DONE]') || line.startsWith('[READY]')
  const isCmd = line.startsWith('>')

  return (
    <div
      className={`font-mono-jb text-xs leading-relaxed ${
        isCmd
          ? 'term-cmd'
          : isLive
          ? 'term-live animate-pulse'
          : isOk
          ? 'term-ok'
          : isDone
          ? 'term-done'
          : 'opacity-60'
      }`}
      style={{ color: isCmd ? 'var(--purple-soft)' : undefined }}
    >
      {line}
    </div>
  )
}

export function OSWindow({ theme = 'dark' }) {
  const [activeTab, setActiveTab] = useState('files')
  const tab = TABS.find(t => t.id === activeTab)

  const isDark = theme === 'dark'

  return (
    <section className="mt-20 md:mt-[120px]">
      {/* Section label */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
        <p
          className="font-mono-jb text-[10px] uppercase tracking-widest whitespace-nowrap"
          style={{ color: 'var(--text-mono)' }}
        >
          What NORVA Can Do
        </p>
        <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
      </div>

      {/* OS Window */}
      <div
        className="relative mx-auto"
        style={{
          maxWidth: 1000,
          borderRadius: '2.5rem',
          /* NO overflow:hidden — kills Safari backdrop-filter */
          background: isDark ? 'rgba(12,12,12,0.75)' : 'rgba(255,255,255,0.75)',
          backdropFilter: isDark ? 'blur(24px) saturate(140%)' : 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: isDark ? 'blur(24px) saturate(140%)' : 'blur(24px) saturate(160%)',
          border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(123,92,240,0.12)',
          boxShadow: isDark
            ? 'inset 0 1px 0 rgba(255,255,255,0.06), 0 40px 120px rgba(0,0,0,0.7)'
            : '0 20px 60px rgba(123,92,240,0.10)',
        }}
      >
        {/* Toolbar */}
        <div
          className="flex items-center px-5"
          style={{
            height: 48,
            borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(123,92,240,0.10)',
          }}
        >
          {/* macOS Window Controls */}
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F56', opacity: 0.85 }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E', opacity: 0.85 }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#27C93F', opacity: 0.85 }} />
          </div>

          {/* Center title */}
          <div className="flex-1 flex justify-center">
            <span
              className="font-mono-jb text-[11px] tracking-wider"
              style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'var(--text-secondary)' }}
            >
              NORVA_OS v0.1-beta
            </span>
          </div>

          {/* NORVA badge */}
          <span
            className="font-mono-jb text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
            style={{
              background: 'var(--purple-subtle)',
              borderColor: 'rgba(123,92,240,0.25)',
              color: 'var(--purple-soft)',
            }}
          >
            NORVA
          </span>
        </div>

        <div
          className="flex px-4 md:px-6 gap-0 overflow-x-auto"
          style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(123,92,240,0.10)', scrollbarWidth: 'none' }}
        >
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="font-geist text-xs md:text-sm px-4 md:px-5 py-3 cursor-pointer transition-all relative flex items-center gap-2 whitespace-nowrap"
              style={{
                background: 'transparent',
                borderStyle: 'none',
                color: activeTab === t.id
                  ? isDark ? 'rgba(255,255,255,0.95)' : 'var(--text-primary)'
                  : isDark ? 'rgba(255,255,255,0.40)' : 'var(--text-secondary)',
              }}
            >
              <t.icon size={15} style={{ color: activeTab === t.id ? '#7B5CF0' : 'currentColor', opacity: activeTab === t.id ? 1 : 0.6 }} />
              {t.label}
              {activeTab === t.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: '#7B5CF0', boxShadow: '0 0 12px rgba(123,92,240,0.6)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="grid gap-6 md:gap-8 p-6 md:p-8"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
          >
            {/* Left column */}
            <div className="flex flex-col gap-4">
              <div
                className="w-fit rounded-xl p-3"
                style={{ background: 'var(--purple-subtle)', border: '1px solid var(--purple-subtle-mid)' }}
              >
                <tab.icon size={20} style={{ color: '#7B5CF0' }} />
              </div>

              <h3
                className="font-instrument text-3xl leading-tight m-0"
                style={{ color: isDark ? '#F0F0F0' : 'var(--text-primary)' }}
              >
                {tab.headline}
              </h3>

              <p
                className="font-geist text-base leading-relaxed m-0"
                style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'var(--text-secondary)' }}
              >
                {tab.body}
              </p>

              <ul className="list-none m-0 p-0 space-y-2">
                {tab.bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: '#7B5CF0' }}
                    />
                    <span className="font-geist text-sm" style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'var(--text-secondary)' }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column — terminal */}
            <div
              className="relative rounded-2xl p-5 flex flex-col gap-1"
              style={{
                background: '#0a0a0a',
                border: '1px solid rgba(255,255,255,0.06)',
                minHeight: 240,
              }}
            >
              <BorderBeam duration={5} />
              {tab.terminal.map((line, i) => (
                <TermLine key={i} line={line} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
