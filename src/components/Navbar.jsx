import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { NorvaLogo } from './CactusSVG'

export function Navbar({ theme }) {
  const { scrollY } = useScroll()
  const scrolled = useTransform(scrollY, [0, 80], [0, 1])

  const darkBg = useTransform(scrolled, v =>
    `rgba(15,15,15,${0.55 + v * 0.3})`
  )
  const lightBg = useTransform(scrolled, v =>
    `rgba(255,255,255,${0.80 + v * 0.15})`
  )
  const blurVal = useTransform(scrolled, v =>
    `blur(${theme === 'dark' ? 16 + v * 8 : 20}px) saturate(160%) brightness(${theme === 'dark' ? 1.08 : 1.0})`
  )

  const bg = theme === 'dark' ? darkBg : lightBg
  const border = theme === 'dark'
    ? 'rgba(255,255,255,0.09)'
    : 'rgba(123,92,240,0.12)'

  return (
    <motion.nav
      className="fixed top-6 left-1/2 z-[9999] flex min-w-[320px] items-center justify-between rounded-full px-6 py-3"
      style={{
        x: '-50%',
        backdropFilter: blurVal,
        WebkitBackdropFilter: blurVal,
        background: bg,
        border: `1px solid ${border}`,
        boxShadow: theme === 'dark'
          ? 'inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.4), 0 20px 60px rgba(0,0,0,0.4)'
          : 'none',
      }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Left: Logo lockup */}
      <NorvaLogo size={22} showName theme={theme} />

      {/* Center: tagline (dark only) */}
      {theme === 'dark' && (
        <motion.span
          className="font-mono-jb text-[9px] uppercase tracking-[0.2em] whitespace-nowrap hidden md:block mx-8"
          style={{ color: 'var(--text-mono)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Autonomous Desktop Intelligence
        </motion.span>
      )}

      {/* Right: live dot + BETA badge */}
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center w-4 h-4">
          <span
            className="absolute w-3 h-3 rounded-full animate-ping"
            style={{ background: 'var(--purple-primary)', opacity: 0.5 }}
          />
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: 'var(--purple-primary)' }}
          />
        </div>
        <span
          className="font-mono-jb text-[9px] tracking-widest rounded-full border px-2 py-0.5"
          style={{
            color: 'var(--purple-soft)',
            borderColor: 'rgba(123,92,240,0.2)',
            background: 'var(--purple-subtle)',
          }}
        >
          BETA
        </span>
      </div>
    </motion.nav>
  )
}
