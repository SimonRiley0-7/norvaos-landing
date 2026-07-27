import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NorvaBot } from './CactusSVG'
import { useCinematic } from '../context/CinematicContext'

// Streaming text component for NORVA responses
function StreamingText({ text }) {
  const [displayed, setDisplayed] = useState('')
  const timerRef = useRef(null)

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const tick = () => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i))
        i++
        timerRef.current = setTimeout(tick, 22)
      }
    }
    tick()
    return () => clearTimeout(timerRef.current)
  }, [text])

  return <>{displayed}<span className="animate-pulse opacity-70">|</span></>
}

export function LiveChatWidget({ theme = 'dark' }) {
  const { liveMessages } = useCinematic()
  const isDark = theme === 'dark'

  return (
    <motion.div
      className="absolute hidden md:block"
      style={{
        top: '15%',
        left: '2%',
        width: 280,
        borderRadius: '1.5rem',
        padding: 16,
        background: isDark ? 'rgba(10,10,10,0.70)' : 'rgba(255,255,255,0.65)',
        backdropFilter: isDark ? 'blur(20px) saturate(160%)' : 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: isDark ? 'blur(20px) saturate(160%)' : 'blur(20px) saturate(180%)',
        border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(123,92,240,0.18)',
        boxShadow: isDark
          ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.5)'
          : 'inset 0 1px 0 rgba(255,255,255,0.9), 0 12px 40px rgba(123,92,240,0.12)',
        zIndex: 10,
      }}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <motion.span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: 'var(--purple-primary)' }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <span
          className="font-mono-jb text-[9px] uppercase tracking-widest"
          style={{ color: 'var(--purple-soft)' }}
        >
          Live Demo
        </span>
      </div>

      {/* Chat thread */}
      <div className="flex flex-col gap-2" style={{ minHeight: 80 }}>
        <AnimatePresence mode="popLayout">
          {liveMessages.length === 0 ? (
            <motion.p
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono-jb text-[10px]"
              style={{ color: isDark ? 'rgba(255,255,255,0.25)' : 'var(--text-secondary)', margin: 0 }}
            >
              Waiting for input...
            </motion.p>
          ) : (
            liveMessages.map((msg, i) =>
              msg.type === 'user' ? (
                <motion.div
                  key={`u-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="self-end font-mono-jb text-xs rounded-lg px-3 py-1.5"
                  style={{
                    background: isDark ? 'var(--purple-subtle-mid)' : 'rgba(237,233,255,0.85)',
                    border: isDark ? '1px solid rgba(123,92,240,0.2)' : '1px solid rgba(123,92,240,0.25)',
                    color: isDark ? 'rgba(255,255,255,0.85)' : 'var(--purple-deep, #5B3FD0)',
                    maxWidth: '90%',
                  }}
                >
                  {msg.text}
                </motion.div>
              ) : (
                <motion.div
                  key={`n-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="flex gap-2 items-start"
                  style={{ maxWidth: '95%' }}
                >
                  <NorvaBot size={14} style={{ flexShrink: 0, marginTop: 2, opacity: 0.8 }} />
                  <p
                    className="font-instrument italic text-sm m-0 leading-snug"
                    style={{ color: isDark ? '#C4B0FA' : 'var(--purple-deep, #5B3FD0)' }}
                  >
                    <StreamingText text={msg.text} />
                  </p>
                </motion.div>
              )
            )
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
