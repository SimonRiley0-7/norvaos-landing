import { motion } from 'framer-motion'
import { Zap, Shield, Mic, RefreshCw, Activity, Upload } from 'lucide-react'
import { BorderBeam } from './BorderBeam'

const CARDS = [
  {
    num: '01',
    icon: Zap,
    title: 'NORVA Engine',
    tagline: 'Full-stack in minutes.',
    body: 'Describe your app. NORVA constructs schemas, provisions Docker containers, writes full-stack code, and launches in your browser — entirely locally.',
    accent: 'rgba(123, 92, 240, 0.9)',
    glow: 'rgba(123, 92, 240, 0.35)',
    pattern: 'forge',
  },
  {
    num: '02',
    icon: Shield,
    title: 'Zero-Cloud Privacy',
    tagline: 'Your data, your machine.',
    body: 'Files, code, credentials, and prompts never touch a third-party server. Every model runs locally — no tracking, no telemetry, no limits.',
    accent: 'rgba(52, 211, 153, 0.9)',
    glow: 'rgba(52, 211, 153, 0.25)',
    pattern: 'shield',
  },
  {
    num: '03',
    icon: Mic,
    title: 'Voice Intelligence',
    tagline: 'Speak. It listens.',
    body: 'mlx-whisper transcribes locally on Apple Silicon at blazing speed. No cloud roundtrip, no latency. Your words become actions instantly.',
    accent: 'rgba(251, 146, 60, 0.9)',
    glow: 'rgba(251, 146, 60, 0.25)',
    pattern: 'mic',
  },
  {
    num: '04',
    icon: RefreshCw,
    title: 'Iterative Builder',
    tagline: 'Modify. Improve. Ship.',
    body: 'Point NORVA at an existing project and ask for changes. It reads your entire codebase, understands context, and modifies it intelligently.',
    accent: 'rgba(196, 176, 250, 0.9)',
    glow: 'rgba(196, 176, 250, 0.25)',
    pattern: 'refresh',
  },
  {
    num: '05',
    icon: Activity,
    title: 'Live AI Engine',
    tagline: 'Zero-latency automation.',
    body: 'Hooks directly into macOS Accessibility APIs. Reads and controls any app on your desktop in real time — no browser extensions required.',
    accent: 'rgba(96, 165, 250, 0.9)',
    glow: 'rgba(96, 165, 250, 0.25)',
    pattern: 'activity',
  },
  {
    num: '06',
    icon: Upload,
    title: '1-Click Publish',
    tagline: 'Done. Pushed. Live.',
    body: 'Seamless GitHub OAuth flow. The moment NORVA finishes building, it pushes your project to a new repo — ready to deploy or share.',
    accent: 'rgba(244, 114, 182, 0.9)',
    glow: 'rgba(244, 114, 182, 0.25)',
    pattern: 'upload',
  },
]

// Decorative mini pattern inside each card's icon area
function CardPattern({ pattern, accent }) {
  if (pattern === 'forge') {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ position: 'absolute', right: 12, bottom: 12, opacity: 0.12 }}>
        <polygon points="32,4 60,52 4,52" stroke={accent} strokeWidth="2" fill="none" />
        <polygon points="32,16 50,48 14,48" stroke={accent} strokeWidth="1.5" fill="none" />
      </svg>
    )
  }
  if (pattern === 'shield') {
    return (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ position: 'absolute', right: 12, bottom: 12, opacity: 0.12 }}>
        <path d="M28 4L8 12v16c0 12 8.67 23.2 20 26 11.33-2.8 20-14 20-26V12L28 4z" stroke={accent} strokeWidth="2" fill="none" />
        <path d="M28 12L16 18v10c0 7.33 5.33 14.2 12 16 6.67-1.8 12-8.67 12-16V18L28 12z" stroke={accent} strokeWidth="1.5" fill="none" />
      </svg>
    )
  }
  if (pattern === 'mic') {
    return (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ position: 'absolute', right: 12, bottom: 12, opacity: 0.12 }}>
        <rect x="20" y="4" width="16" height="28" rx="8" stroke={accent} strokeWidth="2" fill="none" />
        <path d="M10 28c0 9.94 8.06 18 18 18s18-8.06 18-18" stroke={accent} strokeWidth="2" strokeLinecap="round" fill="none" />
        <line x1="28" y1="46" x2="28" y2="56" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="56" x2="36" y2="56" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  // Default: concentric rings
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ position: 'absolute', right: 12, bottom: 12, opacity: 0.10 }}>
      <circle cx="32" cy="32" r="28" stroke={accent} strokeWidth="1.5" />
      <circle cx="32" cy="32" r="18" stroke={accent} strokeWidth="1.5" />
      <circle cx="32" cy="32" r="8" stroke={accent} strokeWidth="1.5" />
    </svg>
  )
}

export function CapabilityCards() {
  return (
    <section style={{ marginTop: 80, padding: '0 24px' }}>
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

      <style>{`
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) { .cards-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 580px) { .cards-grid { grid-template-columns: 1fr; } }

        .cap-card {
          position: relative;
          border-radius: 1.75rem;
          padding: 28px;
          overflow: hidden;
          cursor: default;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .cap-card:hover { transform: translateY(-6px); }
        .cap-card-beam { opacity: 0; transition: opacity 0.4s ease; }
        .cap-card:hover .cap-card-beam { opacity: 1; }
      `}</style>

      <div className="cards-grid">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            className="cap-card glass"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* BorderBeam on hover */}
            <div className="cap-card-beam absolute inset-0 pointer-events-none" style={{ borderRadius: 'inherit' }}>
              <BorderBeam duration={3} colorFrom={card.accent} colorTo="transparent" />
            </div>

            {/* Decorative background pattern */}
            <CardPattern pattern={card.pattern} accent={card.accent} />

            {/* Subtle radial accent glow inside card */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 85% 110%, ${card.glow} 0%, transparent 60%)`,
                borderRadius: 'inherit',
              }}
            />

            {/* Card number */}
            <div className="flex items-start justify-between mb-5">
              {/* Icon pill */}
              <div
                className="flex items-center justify-center rounded-2xl"
                style={{
                  width: 48,
                  height: 48,
                  background: `linear-gradient(135deg, ${card.accent.replace('0.9', '0.15')} 0%, ${card.accent.replace('0.9', '0.06')} 100%)`,
                  border: `1px solid ${card.accent.replace('0.9', '0.25')}`,
                  boxShadow: `0 0 20px ${card.glow}`,
                }}
              >
                <card.icon size={22} style={{ color: card.accent.replace('0.9', '1') }} />
              </div>

              {/* Number tag */}
              <span
                className="font-mono-jb text-[11px] font-bold tracking-widest"
                style={{ color: 'var(--text-mono)', opacity: 0.5 }}
              >
                {card.num}
              </span>
            </div>

            {/* Tagline */}
            <p
              className="font-mono-jb text-[10px] uppercase tracking-widest mb-1"
              style={{ color: card.accent.replace('0.9', '0.8'), margin: 0 }}
            >
              {card.tagline}
            </p>

            {/* Title */}
            <h3
              className="font-geist font-semibold text-xl mt-1 mb-3"
              style={{ color: 'var(--text-primary)', margin: '4px 0 12px' }}
            >
              {card.title}
            </h3>

            {/* Separator */}
            <div
              style={{
                height: 1,
                background: `linear-gradient(to right, ${card.accent.replace('0.9', '0.3')}, transparent)`,
                marginBottom: 14,
              }}
            />

            {/* Body */}
            <p
              className="font-geist text-sm leading-relaxed m-0"
              style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}
            >
              {card.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
