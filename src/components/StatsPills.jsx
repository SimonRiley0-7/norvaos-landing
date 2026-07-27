import { motion, useSpring, useTransform } from 'framer-motion'

const PILLS = [
  { tech: 'Qwen 1.5B', label: 'fine-tuned locally' },
  { tech: 'LangGraph', label: '5-agent pipeline' },
  { tech: 'mlx-whisper', label: 'Apple Silicon native' },
]

function StatPill({ pill, index, mouseX, mouseY, theme }) {
  const px = useTransform(mouseX, v => v * 0.012 * (typeof window !== 'undefined' ? window.innerWidth : 1200))
  const py = useTransform(mouseY, v => v * -0.008 * (typeof window !== 'undefined' ? window.innerHeight : 800))
  const sx = useSpring(px, { stiffness: 80, damping: 20 })
  const sy = useSpring(py, { stiffness: 80, damping: 20 })

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 + index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        x: sx,
        y: sy,
        borderRadius: 9999,
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        ...(theme === 'dark'
          ? {
              background: 'rgba(15,15,15,0.55)',
              border: '1px solid rgba(255,255,255,0.08)',
            }
          : {
              background: 'rgba(255,255,255,0.60)',
              border: '1px solid rgba(139,92,246,0.15)',
            }),
      }}
    >
      <span
        className="font-mono-jb text-sm font-bold"
        style={{ color: 'var(--purple-soft)' }}
      >
        {pill.tech}
      </span>
      <span
        className="font-geist text-xs whitespace-nowrap"
        style={{ color: 'var(--text-secondary)' }}
      >
        {pill.label}
      </span>
    </motion.div>
  )
}

export function StatsPills({ mouseX, mouseY, theme }) {
  return (
    <div
      className="absolute hidden md:flex flex-col"
      style={{
        top: '18%',
        right: '2%',
        gap: 8,
        zIndex: 10,
      }}
    >
      {PILLS.map((pill, i) => (
        <StatPill
          key={pill.tech}
          pill={pill}
          index={i}
          mouseX={mouseX}
          mouseY={mouseY}
          theme={theme}
        />
      ))}
    </div>
  )
}
