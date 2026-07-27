import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Shield, Mic, RefreshCw, Activity, Upload } from 'lucide-react'
import { BorderBeam } from './BorderBeam'

const PURPLE_ICON_STYLE = {
  background: 'rgba(123,92,240,0.10)',
  border: '1px solid rgba(123,92,240,0.15)',
  color: '#7B5CF0',
}

function getCardStyle(theme, isHero = false) {
  const isDark = theme === 'dark'
  return {
    background: isDark ? 'rgba(20,20,20,0.80)' : 'rgba(255,255,255,0.65)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: isHero
      ? (isDark ? '1px solid rgba(123,92,240,0.30)' : '1px solid rgba(123,92,240,0.35)')
      : (isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(123,92,240,0.15)'),
    boxShadow: isDark
      ? 'inset 0 1px 0 rgba(255,255,255,0.06)'
      : 'inset 0 1px 0 rgba(255,255,255,0.9), 0 10px 40px rgba(123,92,240,0.08)',
    borderRadius: '2rem',
    padding: 32,
    position: 'relative',
    overflow: 'hidden',
  }
}

const FORGE_LINES = [
  { text: '> norva "build a task manager with React"', type: 'cmd' },
  { text: '[OK] Planner loaded — Qwen 1.5B LoRA',          type: 'ok'  },
  { text: '[OK] Docker Postgres provisioned',               type: 'ok'  },
  { text: '[OK] Scaffolding React + Vite...',               type: 'ok'  },
  { text: '[LIVE] App running at localhost:5173',            type: 'live'},
]

function ForgeTerminal() {
  const [lines, setLines] = useState([])
  const timerRef = useRef(null)

  useEffect(() => {
    let lineIndex = 0

    const showNext = () => {
      if (lineIndex < FORGE_LINES.length) {
        const l = FORGE_LINES[lineIndex]
        setLines(prev => [...prev, l])
        lineIndex++
        timerRef.current = setTimeout(showNext, 600)
      } else {
        // pause, then reset
        timerRef.current = setTimeout(() => {
          setLines([])
          lineIndex = 0
          showNext()
        }, 4000)
      }
    }

    timerRef.current = setTimeout(showNext, 800)
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <div
      style={{
        marginTop: 20,
        background: 'rgba(8,8,8,0.85)',
        borderRadius: '0.75rem',
        padding: '14px 16px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        lineHeight: 1.7,
        minHeight: 100,
      }}
    >
      <AnimatePresence mode="popLayout">
        {lines.map((line, i) => (
          <motion.div
            key={`${i}-${line.text}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              color:
                line.type === 'ok'   ? '#4ADE80' :
                line.type === 'live' ? '#C4B0FA'  :
                '#7B5CF0',
              ...(line.type === 'live' ? {
                animation: 'pulse 1.5s ease-in-out infinite',
              } : {}),
            }}
          >
            {line.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function IconBox({ Icon }) {
  return (
    <div
      style={{
        ...PURPLE_ICON_STYLE,
        width: 48,
        height: 48,
        borderRadius: '0.875rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Icon size={22} color="#7B5CF0" />
    </div>
  )
}

export function BentoCards({ theme = 'dark' }) {
  const heroStyle = getCardStyle(theme, true)
  const cardStyle = getCardStyle(theme, false)

  return (
    <section style={{ padding: '80px 24px 0' }}>
      {/* Section header */}
      <motion.div
        className="flex flex-col items-center text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span
          className="font-mono-jb text-[10px] uppercase tracking-widest mb-3"
          style={{ color: 'var(--text-mono)' }}
        >
          Capabilities
        </span>
        <h2
          className="font-instrument text-4xl font-normal m-0"
          style={{ color: 'var(--text-primary)' }}
        >
          Everything. Locally.
        </h2>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto auto auto',
          gap: 16,
        }}
      >
        {/* ── NORVA ENGINE — hero cell, col 1-2, row 1 ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6, transition: { type: 'spring', stiffness: 200, damping: 18 } }}
          style={{ ...heroStyle, gridColumn: '1 / 3', gridRow: '1' }}
          className="group"
        >
          {/* Permanent BorderBeam — most important card */}
          <BorderBeam duration={3} colorFrom="#7B5CF0" colorTo="#C4B0FA" />

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <IconBox Icon={Zap} />
              <div>
                <p className="font-mono-jb text-[10px] uppercase tracking-widest m-0" style={{ color: '#7B5CF0' }}>01</p>
                <h3 className="font-geist font-semibold text-xl m-0" style={{ color: 'var(--text-primary)' }}>
                  NORVA Engine
                </h3>
              </div>
            </div>
            <span className="font-geist text-sm" style={{ color: 'var(--text-secondary)', maxWidth: 240, textAlign: 'right' }}>
              Full-stack in minutes.
            </span>
          </div>

          <p className="font-geist text-sm mt-3 mb-0" style={{ color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '70%' }}>
            Describe your app. NORVA constructs schemas, provisions Docker containers, writes full-stack code, and launches in your browser — entirely locally.
          </p>

          {/* Mini terminal */}
          <ForgeTerminal />
        </motion.div>

        {/* ── ZERO-CLOUD PRIVACY — col 3, row 1 ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6, transition: { type: 'spring', stiffness: 200, damping: 18 } }}
          style={{ ...cardStyle, gridColumn: '3', gridRow: '1' }}
          className="group"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0 pointer-events-none" style={{ borderRadius: 'inherit' }}>
            <BorderBeam duration={3} colorFrom="#7B5CF0" colorTo="#C4B0FA" />
          </div>
          <div className="flex items-start justify-between mb-4">
            <IconBox Icon={Shield} />
            <span className="font-mono-jb text-[11px] font-bold tracking-widest" style={{ color: 'var(--text-mono)', opacity: 0.5 }}>02</span>
          </div>
          <p className="font-mono-jb text-[10px] uppercase tracking-widest m-0" style={{ color: '#7B5CF0' }}>Your data, your machine.</p>
          <h3 className="font-geist font-semibold text-xl mt-1 mb-2" style={{ color: 'var(--text-primary)' }}>Zero-Cloud Privacy</h3>
          <div style={{ height: 1, background: 'linear-gradient(to right, rgba(123,92,240,0.3), transparent)', marginBottom: 12 }} />
          <p className="font-geist text-sm m-0" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            Files, code, credentials, and prompts never touch a third-party server. Every model runs locally — no tracking, no telemetry.
          </p>
        </motion.div>

        {/* ── ITERATIVE BUILDER — col 1, row 2 ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.10, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6, transition: { type: 'spring', stiffness: 200, damping: 18 } }}
          style={{ ...cardStyle, gridColumn: '1', gridRow: '2' }}
          className="group"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0 pointer-events-none" style={{ borderRadius: 'inherit' }}>
            <BorderBeam duration={3} colorFrom="#7B5CF0" colorTo="#C4B0FA" />
          </div>
          <div className="flex items-start justify-between mb-4">
            <IconBox Icon={RefreshCw} />
            <span className="font-mono-jb text-[11px] font-bold tracking-widest" style={{ color: 'var(--text-mono)', opacity: 0.5 }}>04</span>
          </div>
          <p className="font-mono-jb text-[10px] uppercase tracking-widest m-0" style={{ color: '#7B5CF0' }}>Modify. Improve. Ship.</p>
          <h3 className="font-geist font-semibold text-xl mt-1 mb-2" style={{ color: 'var(--text-primary)' }}>Iterative Builder</h3>
          <div style={{ height: 1, background: 'linear-gradient(to right, rgba(123,92,240,0.3), transparent)', marginBottom: 12 }} />
          <p className="font-geist text-sm m-0" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            Point NORVA at an existing project. It reads your codebase, understands context, and modifies it intelligently.
          </p>
        </motion.div>

        {/* ── LIVE AI ENGINE — col 2, row 2 ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.14, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6, transition: { type: 'spring', stiffness: 200, damping: 18 } }}
          style={{ ...cardStyle, gridColumn: '2', gridRow: '2' }}
          className="group"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0 pointer-events-none" style={{ borderRadius: 'inherit' }}>
            <BorderBeam duration={3} colorFrom="#7B5CF0" colorTo="#C4B0FA" />
          </div>
          <div className="flex items-start justify-between mb-4">
            <IconBox Icon={Activity} />
            <span className="font-mono-jb text-[11px] font-bold tracking-widest" style={{ color: 'var(--text-mono)', opacity: 0.5 }}>05</span>
          </div>
          <p className="font-mono-jb text-[10px] uppercase tracking-widest m-0" style={{ color: '#7B5CF0' }}>Zero-latency automation.</p>
          <h3 className="font-geist font-semibold text-xl mt-1 mb-2" style={{ color: 'var(--text-primary)' }}>Live AI Engine</h3>
          <div style={{ height: 1, background: 'linear-gradient(to right, rgba(123,92,240,0.3), transparent)', marginBottom: 12 }} />
          <p className="font-geist text-sm m-0" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            Hooks directly into macOS Accessibility APIs. Reads and controls any app on your desktop in real time.
          </p>
        </motion.div>

        {/* ── 1-CLICK PUBLISH — col 3, row 2 ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6, transition: { type: 'spring', stiffness: 200, damping: 18 } }}
          style={{ ...cardStyle, gridColumn: '3', gridRow: '2' }}
          className="group"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0 pointer-events-none" style={{ borderRadius: 'inherit' }}>
            <BorderBeam duration={3} colorFrom="#7B5CF0" colorTo="#C4B0FA" />
          </div>
          <div className="flex items-start justify-between mb-4">
            <IconBox Icon={Upload} />
            <span className="font-mono-jb text-[11px] font-bold tracking-widest" style={{ color: 'var(--text-mono)', opacity: 0.5 }}>06</span>
          </div>
          <p className="font-mono-jb text-[10px] uppercase tracking-widest m-0" style={{ color: '#7B5CF0' }}>Done. Pushed. Live.</p>
          <h3 className="font-geist font-semibold text-xl mt-1 mb-2" style={{ color: 'var(--text-primary)' }}>1-Click Publish</h3>
          <div style={{ height: 1, background: 'linear-gradient(to right, rgba(123,92,240,0.3), transparent)', marginBottom: 12 }} />
          <p className="font-geist text-sm m-0" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            Seamless GitHub OAuth flow. NORVA pushes your finished project to a new repo the moment it's done.
          </p>
        </motion.div>

        {/* ── VOICE INTELLIGENCE — col 1-3, row 3 (full width) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.22, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4, transition: { type: 'spring', stiffness: 200, damping: 18 } }}
          style={{ ...cardStyle, gridColumn: '1 / 4', gridRow: '3', display: 'flex', alignItems: 'center', gap: 48 }}
          className="group"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0 pointer-events-none" style={{ borderRadius: 'inherit' }}>
            <BorderBeam duration={3} colorFrom="#7B5CF0" colorTo="#C4B0FA" />
          </div>

          {/* Left: icon + number */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <IconBox Icon={Mic} />
            <span className="font-mono-jb text-[11px] font-bold tracking-widest" style={{ color: 'var(--text-mono)', opacity: 0.5 }}>03</span>
          </div>

          {/* Center: text */}
          <div className="flex-1">
            <p className="font-mono-jb text-[10px] uppercase tracking-widest m-0" style={{ color: '#7B5CF0' }}>Speak. It listens.</p>
            <h3 className="font-geist font-semibold text-xl mt-1 mb-2" style={{ color: 'var(--text-primary)' }}>Voice Intelligence</h3>
            <p className="font-geist text-sm m-0" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              mlx-whisper transcribes locally on Apple Silicon at blazing speed. No cloud roundtrip, no latency. Your words become actions instantly.
            </p>
          </div>

          {/* Right: waveform decoration */}
          <div className="flex items-center gap-1 flex-shrink-0" style={{ height: 40 }}>
            {[0.4, 0.7, 1.0, 0.6, 0.9, 0.5, 0.8, 0.3, 0.7, 0.4].map((h, i) => (
              <motion.div
                key={i}
                style={{
                  width: 3,
                  borderRadius: 4,
                  background: 'rgba(123,92,240,0.5)',
                }}
                animate={{ height: [h * 32, h * 8, h * 32] }}
                transition={{ duration: 1.2, delay: i * 0.12, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
