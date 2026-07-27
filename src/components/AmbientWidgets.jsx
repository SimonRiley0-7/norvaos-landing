import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Mail, Calendar, FolderOpen, Terminal } from 'lucide-react'
import { NorvaBot } from './CactusSVG'
import { BorderBeam } from './BorderBeam'

function useParallax(strength = { x: 0.015, y: 0.01 }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })
  const x = useTransform(springX, v => v * strength.x * window.innerWidth)
  const y = useTransform(springY, v => v * strength.y * window.innerHeight)

  const handleMouseMove = e => {
    mouseX.set((e.clientX / window.innerWidth - 0.5) * 2)
    mouseY.set((e.clientY / window.innerHeight - 0.5) * 2)
  }

  return { x, y, handleMouseMove }
}

// Widget 1 — Last Command
function LastCommandWidget({ mouseX, mouseY }) {
  const x = useTransform(mouseX, v => v * -0.015 * (typeof window !== 'undefined' ? window.innerWidth : 1200))
  const y = useTransform(mouseY, v => v * -0.01 * (typeof window !== 'undefined' ? window.innerHeight : 800))
  const springX = useSpring(x, { stiffness: 80, damping: 20 })
  const springY = useSpring(y, { stiffness: 80, damping: 20 })

  return (
    <motion.div
      className="glass group absolute hidden md:block"
      style={{
        top: '15%',
        left: '3%',
        width: 240,
        borderRadius: '1.5rem',
        padding: 18,
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-hidden" style={{ borderRadius: 'inherit' }}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <BorderBeam duration={3} />
        </div>
      </div>

      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: 'var(--purple-primary)' }}
        />
        <span
          className="font-mono-jb text-[9px] uppercase tracking-widest"
          style={{ color: 'var(--purple-soft)' }}
        >
          Last Command
        </span>
      </div>

      {/* Command */}
      <p
        className="font-mono-jb text-xs mb-2"
        style={{ color: 'var(--text-primary)', opacity: 0.7 }}
      >
        "Get me ready for my day"
      </p>

      <hr style={{ borderColor: 'var(--border-subtle)', margin: '8px 0' }} />

      {/* Response */}
      <p className="font-instrument italic text-sm leading-relaxed" style={{ color: 'var(--text-norva)' }}>
        Good morning. 3 meetings, 12 emails.
      </p>

      {/* Timestamp */}
      <p className="font-mono-jb text-[9px] mt-2" style={{ color: 'var(--text-mono)' }}>
        2 seconds ago
      </p>
    </motion.div>
  )
}

// Widget 2 — OS Activity Node Graph
function NodeGraphWidget({ mouseX, mouseY }) {
  const x = useTransform(mouseX, v => v * 0.02 * (typeof window !== 'undefined' ? window.innerWidth : 1200))
  const y = useTransform(mouseY, v => v * 0.015 * (typeof window !== 'undefined' ? window.innerHeight : 800))
  const springX = useSpring(x, { stiffness: 80, damping: 20 })
  const springY = useSpring(y, { stiffness: 80, damping: 20 })

  const nodes = [
    { icon: Mail, label: 'Mail', cx: 110, cy: 30, delay: '0ms' },
    { icon: Calendar, label: 'Cal', cx: 190, cy: 100, delay: '300ms' },
    { icon: FolderOpen, label: 'Finder', cx: 110, cy: 170, delay: '600ms' },
    { icon: Terminal, label: 'Term', cx: 30, cy: 100, delay: '900ms' },
  ]

  const centerX = 110
  const centerY = 100

  return (
    <motion.div
      className="absolute hidden md:block"
      style={{
        bottom: '10%',
        right: '2%',
        width: 220,
        height: 220,
        borderRadius: '1.5rem',
        padding: 18,
        background: '#0d0d0d',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg width="184" height="184" viewBox="0 0 220 200" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {nodes.map((n) => (
          <line
            key={n.label}
            x1={centerX + 18} y1={centerY + 18}
            x2={n.cx + 16} y2={n.cy + 16}
            stroke="rgba(123,92,240,0.30)"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="animate-dash-flow"
            style={{ animationDelay: n.delay }}
          />
        ))}
      </svg>

      {/* Center node */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: centerX - 2,
          top: centerY - 2,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'var(--purple-primary)',
          boxShadow: '0 0 24px rgba(123,92,240,0.7), 0 0 48px rgba(123,92,240,0.3)',
        }}
      >
        <span className="font-mono-jb text-[8px] font-bold text-white tracking-wider">NORVA</span>
      </div>

      {/* Surrounding nodes */}
      {nodes.map((n) => (
        <motion.div
          key={n.label}
          className="absolute flex items-center justify-center glass"
          style={{
            left: n.cx,
            top: n.cy,
            width: 32,
            height: 32,
            borderRadius: '50%',
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: parseInt(n.delay) / 1000 }}
        >
          <n.icon size={12} style={{ color: 'var(--purple-soft)' }} />
        </motion.div>
      ))}

      {/* Label */}
      <p
        className="font-mono-jb text-[9px] uppercase tracking-widest text-center absolute bottom-4 left-0 right-0"
        style={{ color: 'var(--text-mono)' }}
      >
        Orchestrating 4 Apps
      </p>
    </motion.div>
  )
}

// Widget 3 — Quick Stats
function QuickStatsWidget({ mouseX, mouseY }) {
  const x = useTransform(mouseX, v => v * 0.018 * (typeof window !== 'undefined' ? window.innerWidth : 1200))
  const y = useTransform(mouseY, v => v * -0.012 * (typeof window !== 'undefined' ? window.innerHeight : 800))
  const springX = useSpring(x, { stiffness: 80, damping: 20 })
  const springY = useSpring(y, { stiffness: 80, damping: 20 })

  const stats = [
    { label: 'Tasks handled', value: 12 },
    { label: 'Apps orchestrated', value: 5 },
    { label: 'Time saved', value: '~40min', isString: true },
  ]

  return (
    <motion.div
      className="glass absolute hidden md:block"
      style={{
        top: '18%',
        right: '3%',
        width: 200,
        borderRadius: '1.5rem',
        padding: 16,
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <p
        className="font-mono-jb text-[9px] uppercase tracking-widest mb-3"
        style={{ color: 'var(--text-mono)' }}
      >
        Today's Activity
      </p>

      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="flex justify-between items-center px-2.5 py-1.5 rounded-full mb-1.5"
          style={{
            background: 'rgba(123,92,240,0.08)',
            border: '1px solid rgba(123,92,240,0.12)',
          }}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6 + i * 0.1 }}
        >
          <span className="font-geist text-xs" style={{ color: 'var(--text-secondary)' }}>
            {stat.label}
          </span>
          <CountUp
            target={stat.isString ? stat.value : stat.value}
            isString={stat.isString}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

function CountUp({ target, isString }) {
  if (isString) {
    return (
      <span className="font-mono-jb text-xs font-bold" style={{ color: 'var(--purple-soft)' }}>
        {target}
      </span>
    )
  }
  return (
    <motion.span
      className="font-mono-jb text-xs font-bold"
      style={{ color: 'var(--purple-soft)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
    >
      {target}
    </motion.span>
  )
}

export function AmbientWidgets() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = e => {
    mouseX.set((e.clientX / window.innerWidth - 0.5) * 2)
    mouseY.set((e.clientY / window.innerHeight - 0.5) * 2)
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      onMouseMove={handleMouseMove}
      style={{ pointerEvents: 'none' }}
    >
      <div style={{ pointerEvents: 'all' }}>
        <LastCommandWidget mouseX={mouseX} mouseY={mouseY} />
        <NodeGraphWidget mouseX={mouseX} mouseY={mouseY} />
        <QuickStatsWidget mouseX={mouseX} mouseY={mouseY} />
      </div>
    </div>
  )
}
