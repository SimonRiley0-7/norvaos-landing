import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { Sparkles } from 'lucide-react'

import { Background } from './components/Background'
import { Navbar } from './components/Navbar'
import { PromptBox } from './components/PromptBox'
import { OSWindow } from './components/OSWindow'
import { BentoCards } from './components/BentoCards'
import { WaitlistCTA } from './components/WaitlistCTA'
import { Footer } from './components/Footer'
import { NorvaBot } from './components/CactusSVG'
import { LiveChatWidget } from './components/LiveChatWidget'
import { HeroBeams } from './components/HeroBeams'
import { StatsPills } from './components/StatsPills'
import { StatsBar } from './components/StatsBar'
import { TeamSection } from './components/TeamSection'
import { CinematicProvider } from './context/CinematicContext'

export default function App() {
  const [theme, setTheme] = useState('dark')
  const waitlistRef = useRef(null)

  // Mouse position for parallax widgets
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = e => {
    mouseX.set((e.clientX / window.innerWidth) - 0.5)
    mouseY.set((e.clientY / window.innerHeight) - 0.5)
  }

  const handleThemeSwitch = useCallback(newTheme => {
    document.documentElement.className = newTheme
    setTheme(newTheme)
  }, [])

  const scrollToWaitlist = useCallback(() => {
    waitlistRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  return (
    <CinematicProvider>
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ position: 'relative', minHeight: '100vh' }}
        >
          {/* Fixed background layers */}
          <Background theme={theme} />

          {/* Navbar — z-index 9999, always on top */}
          <Navbar theme={theme} />

          {/* Main content */}
          <main style={{ position: 'relative', zIndex: 1 }}>

            {/* ====================================================
                HERO SECTION
            ==================================================== */}
            <section
              className="relative flex flex-col items-center justify-center"
              onMouseMove={handleMouseMove}
              style={{
                minHeight: '100vh',
                gap: 32,
                paddingTop: 120,
                paddingBottom: 60,
                paddingLeft: 24,
                paddingRight: 24,
              }}
            >
              {/* Animated beam lines — z-index 1, behind content */}
              <HeroBeams theme={theme} />

              {/* Hero content — z-index 10 */}
              <div
                className="relative flex flex-col items-center w-full"
                style={{ zIndex: 10, gap: 32, maxWidth: 1200 }}
              >
                {/* Live chat widget — absolute left */}
                <LiveChatWidget theme={theme} />

                {/* Stats pills — absolute right */}
                <StatsPills mouseX={mouseX} mouseY={mouseY} theme={theme} />

                {/* Cinematic badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-2 rounded-full px-4 py-1.5"
                  style={{
                    background: theme === 'dark' ? 'rgba(123,92,240,0.08)' : 'rgba(237,233,255,0.8)',
                    border: theme === 'dark' ? '1px solid rgba(123,92,240,0.20)' : '1px solid rgba(196,176,250,0.5)',
                  }}
                >
                  <Sparkles size={12} style={{ color: 'var(--purple-primary)' }} />
                  <span className="font-mono-jb text-[10px] uppercase tracking-widest" style={{ color: 'var(--purple-soft)' }}>
                    Autonomous Desktop Intelligence
                  </span>
                </motion.div>

                {/* Hero headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7, type: 'spring', stiffness: 100, damping: 20 }}
                  className="font-instrument text-center m-0"
                  style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 1.05, color: theme === 'dark' ? 'var(--text-primary)' : '#000000' }}
                >
                  Your desktop,<br />
                  finally.
                </motion.h1>

                {/* Hero subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="font-geist text-xl text-center m-0"
                  style={{ color: 'var(--text-secondary)', maxWidth: 480 }}
                >
                  One prompt. Your entire desktop, handled.
                </motion.p>

                {/* Prompt box + conversation + chips + marquee */}
                <div style={{ width: '100%', maxWidth: 680 }}>
                  <PromptBox
                    theme={theme}
                    onThemeSwitch={handleThemeSwitch}
                    onScrollToWaitlist={scrollToWaitlist}
                  />
                </div>
              </div>

              {/* NorvaBot mascot — fixed corner */}
              <motion.div
                className="fixed bottom-8 right-8 cursor-pointer hidden md:block"
                style={{ zIndex: 9990 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
                whileHover={{ scale: 1.15 }}
              >
                <NorvaBot
                  size={36}
                  style={{ opacity: theme === 'dark' ? 0.28 : 0.4, transition: 'opacity 200ms' }}
                  glow={false}
                />
              </motion.div>
            </section>

            {/* ====================================================
                STATS BAR — between hero and OS window (FIX 2: no dead space)
            ==================================================== */}
            <StatsBar theme={theme} />

            {/* ====================================================
                OS WINDOW SECTION
            ==================================================== */}
            <div style={{ padding: '40px 24px 0' }}>
              <OSWindow theme={theme} />
            </div>

            {/* ====================================================
                BENTO CARDS (replaces CapabilityCards)
            ==================================================== */}
            <BentoCards theme={theme} />

            {/* ====================================================
                TEAM SECTION (Founders)
            ==================================================== */}
            <TeamSection theme={theme} />

            {/* ====================================================
                WAITLIST CTA
            ==================================================== */}
            <div ref={waitlistRef}>
              <WaitlistCTA theme={theme} />
            </div>

            {/* ====================================================
                FOOTER
            ==================================================== */}
            <Footer />
          </main>
        </motion.div>
      </AnimatePresence>
    </CinematicProvider>
  )
}
