import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { NorvaBot } from './CactusSVG'
import { BorderBeam } from './BorderBeam'
import { SCENARIOS, PLACEHOLDER_CYCLE, getResponse } from '../data/responses'
import { useCinematic } from '../context/CinematicContext'
import { Marquee } from './Marquee'

const CHIPS = [
  'What can you do?',
  'Get me ready for my day',
  'Download NORVA',
  'Join the waitlist',
]

// ── Terminal line
function TerminalLine({ line, delay }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  if (!visible) return null
  const isLive = line.startsWith('[LIVE]')
  const isOk = line.startsWith('[OK]')
  const isDone = line.startsWith('[DONE]') || line.startsWith('[READY]')
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={`font-mono-jb text-xs leading-relaxed ${isLive ? 'term-live animate-pulse' : isOk ? 'term-ok' : isDone ? 'term-done' : 'term-cmd'
        }`}
    >
      {line}
    </motion.div>
  )
}

// ── NORVA response bubble
function ResponseBubble({ message }) {
  const [displayed, setDisplayed] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [termLines, setTermLines] = useState([])
  const timerRef = useRef(null)

  useEffect(() => {
    let i = 0
    const text = message.text
    const tick = () => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i))
        i++
        timerRef.current = setTimeout(tick, 28)
      } else {
        if (message.terminal) setTermLines(message.terminal)
        setTimeout(() => setShowCursor(false), 2000)
      }
    }
    tick()
    return () => clearTimeout(timerRef.current)
  }, [message.text])

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -6, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className="glass flex gap-3 max-w-[85%] self-start"
      style={{ borderRadius: '1.25rem 1.25rem 1.25rem 0.25rem', padding: '14px 18px' }}
    >
      <NorvaBot size={20} style={{ opacity: 0.8, flexShrink: 0, marginTop: 3 }} />
      <div>
        {message.list ? (
          <div className="font-instrument italic text-[17px] leading-relaxed" style={{ color: 'var(--text-norva)' }}>
            <p style={{ margin: 0 }}>{displayed}{showCursor && <span className="animate-pulse">|</span>}</p>
            {displayed === message.text && (
              <ul className="mt-2 space-y-1 list-none p-0">
                {message.list.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }} className="flex gap-2 items-start text-sm"
                    style={{ color: 'var(--text-norva)' }}>
                    <span style={{ color: 'var(--purple-primary)', marginTop: 3 }}>▸</span>{item}
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <p className="font-instrument italic text-[17px] leading-relaxed m-0" style={{ color: 'var(--text-norva)' }}>
            {displayed}{showCursor && <span className="animate-pulse">|</span>}
          </p>
        )}
        <AnimatePresence>
          {termLines.length > 0 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 rounded-xl p-4 space-y-1"
              style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.08)' }}>
              {termLines.map((line, i) => <TerminalLine key={i} line={line} delay={i * 220} />)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ── User message bubble
function UserBubble({ text }) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -6, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className="font-mono-jb self-end max-w-[80%] text-[13px]"
      style={{
        background: 'var(--purple-subtle-mid)',
        border: '1px solid rgba(123,92,240,0.20)',
        borderRadius: '1.25rem 1.25rem 0.25rem 1.25rem',
        padding: '10px 16px',
        color: 'var(--text-primary)',
      }}
    >
      {text}
    </motion.div>
  )
}

// ── Processing dots
function ProcessingDots() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex items-center gap-3 self-start" style={{ paddingLeft: 8 }}>
      <NorvaBot size={20} style={{ opacity: 0.8 }} />
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 items-center">
          {[0, 1, 2].map(i => (
            <motion.span key={i} className="font-mono-jb text-base" style={{ color: 'var(--text-mono)' }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.9, delay: i * 0.15, repeat: Infinity }}>_</motion.span>
          ))}
        </div>
        <span className="font-mono-jb text-[10px]" style={{ color: 'var(--text-mono)' }}>NORVA is thinking...</span>
      </div>
    </motion.div>
  )
}

// ── Fade-out separator shown between cinematic cycles
function CycleDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      exit={{ opacity: 0, scaleX: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-3 w-full"
      style={{ transformOrigin: 'center' }}
    >
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, var(--border-subtle))' }} />
      <span className="font-mono-jb text-[9px] uppercase tracking-widest" style={{ color: 'var(--text-mono)' }}>
        · · ·
      </span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, var(--border-subtle))' }} />
    </motion.div>
  )
}

export function PromptBox({ theme, onThemeSwitch, onScrollToWaitlist }) {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [conversation, setConversation] = useState([])
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [beamDuration, setBeamDuration] = useState(4)

  const [isAcknowledging, setIsAcknowledging] = useState(false)

  const inputRef = useRef(null)
  const scenarioRef = useRef(0)
  const timersRef = useRef([])
  const pauseTimerRef = useRef(null)
  const isPausedRef = useRef(false)
  const typeIntervalRef = useRef(null)
  const isCinematicTypingRef = useRef(false)

  // Placeholder rotation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFocused && inputValue === '') {
        setPlaceholderIndex(i => (i + 1) % PLACEHOLDER_CYCLE.length)
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [isFocused, inputValue])

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  const addTimer = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay)
    timersRef.current.push(id)
    return id
  }, [])

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return
    const response = getResponse(text)

    // Intercept download action to detect OS
    if (response.action === 'downloadNorva') {
      const platform = navigator.userAgent.toLowerCase()
      if (platform.includes('mac')) {
        response.text = "Downloading NORVA for Mac..."
        response.downloadUrl = "https://github.com/SimonRiley0-7/landingpage-install/releases/download/v1.0.0/NORVA-1.0.0-arm64.dmg"
      } else if (platform.includes('win')) {
        response.text = "Downloading NORVA for Windows..."
        response.downloadUrl = "https://github.com/SimonRiley0-7/landingpage-install/releases/download/v1.0.0/NORVA.Setup.1.0.0.exe"
      } else {
        response.text = "NORVA is currently only available for Mac and Windows. Join the waitlist for updates!"
        response.action = 'showEmailInput'
      }
    }

    setConversation(prev => [...prev, { type: 'user', text }])
    setInputValue('')

    // Brief acknowledgment state (300ms flash)
    setIsAcknowledging(true)
    setBeamDuration(1.2)
    setTimeout(() => {
      setIsAcknowledging(false)
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setBeamDuration(4)
        setConversation(prev => [...prev, { type: 'norva', message: response }])

        // Execute side effects AFTER the message is shown
        if (response.action === 'switchTheme') {
          onThemeSwitch(response.theme)
        }

        if (response.action === 'showEmailInput') {
          // Calculate typing duration based on text length (28ms per char)
          const typeDuration = (response.text?.length || 0) * 28
          setTimeout(() => {
            onScrollToWaitlist()
          }, typeDuration + 400) // Scroll smoothly after finishing typing
        }

        if (response.action === 'downloadNorva') {
          const typeDuration = (response.text?.length || 0) * 28
          setTimeout(() => {
            // Track the download silently in the background
            fetch('/api/download', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ platform: response.downloadUrl.includes('.dmg') ? 'mac' : 'windows' }),
            }).catch(() => {}) // Fire-and-forget, never block the download

            const link = document.createElement('a');
            link.href = response.downloadUrl;
            link.download = "";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, typeDuration + 400)
        }
      }, 900)
    }, 300)
  }, [onThemeSwitch, onScrollToWaitlist])

  // Cinematic loop — each run is self-contained with no stale closures
  const { addLiveMessage = () => { }, clearLiveMessages = () => { } } = useCinematic() || {}

  const runScenario = useCallback((scenarioIndex) => {
    if (isPausedRef.current) return
    scenarioRef.current = scenarioIndex
    const scenario = SCENARIOS[scenarioIndex % SCENARIOS.length]
    const response = scenario.response || getResponse(scenario.responseKey || scenario.prompt)
    const prompt = scenario.prompt

    // Auto-type into prompt
    let charIndex = 0
    isCinematicTypingRef.current = true
    typeIntervalRef.current = setInterval(() => {
      if (isPausedRef.current) {
        clearInterval(typeIntervalRef.current)
        isCinematicTypingRef.current = false
        return
      }
      charIndex++
      setInputValue(prompt.slice(0, charIndex))
      if (charIndex >= prompt.length) {
        clearInterval(typeIntervalRef.current)
        isCinematicTypingRef.current = false

        // Send after brief pause
        addTimer(() => {
          if (isPausedRef.current) return
          setConversation(prev => [...prev, { type: 'user', text: prompt }])
          addLiveMessage({ type: 'user', text: prompt })
          setInputValue('')
          setIsProcessing(true)
          setBeamDuration(1.2)

          // NORVA responds
          addTimer(() => {
            if (isPausedRef.current) return
            setIsProcessing(false)
            setBeamDuration(4)
            setConversation(prev => [...prev, { type: 'norva', message: response }])
            addLiveMessage({ type: 'norva', text: response.text || '' })

            // Pause to read, then fade out gracefully
            addTimer(() => {
              if (isPausedRef.current) return

              // Show divider, then fade whole thread
              setIsFadingOut(true)
              addTimer(() => {
                if (isPausedRef.current) return
                setConversation([])
                clearLiveMessages()
                setIsFadingOut(false)

                // Restart with next scenario
                addTimer(() => {
                  if (!isPausedRef.current) runScenario(scenarioIndex + 1)
                }, 1200)
              }, 1000) // fade duration
            }, 7000) // reading pause
          }, 1800)
        }, 400)
      }
    }, 60)
  }, [addTimer])

  // Start cinematic on mount
  useEffect(() => {
    const t = setTimeout(() => runScenario(0), 2000)
    return () => {
      clearTimeout(t)
      clearAllTimers()
    }
  }, []) // eslint-disable-line

  const pauseCinematic = useCallback(() => {
    isPausedRef.current = true
    clearAllTimers()
    clearInterval(typeIntervalRef.current)
    clearTimeout(pauseTimerRef.current)
  }, [clearAllTimers])

  const resumeCinematic = useCallback(() => {
    clearTimeout(pauseTimerRef.current)
    pauseTimerRef.current = setTimeout(() => {
      isPausedRef.current = false
      setConversation([])
      runScenario(scenarioRef.current)
    }, 8000)
  }, [runScenario])

  const handleInputChange = e => {
    const val = e.target.value
    setInputValue(val)
    isCinematicTypingRef.current = false
    pauseCinematic()
    if (val.length === 0) {
      resumeCinematic()
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    pauseCinematic()
    if (isCinematicTypingRef.current) {
      setInputValue('')
      isCinematicTypingRef.current = false
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (inputValue.length === 0) {
      resumeCinematic()
    }
  }

  const handleChipClick = chip => {
    isPausedRef.current = true
    clearAllTimers()
    setInputValue(chip)
    setTimeout(() => {
      sendMessage(chip)
    }, 300)
  }

  const handleSubmit = () => {
    if (!inputValue.trim()) return
    isPausedRef.current = true
    clearAllTimers()
    sendMessage(inputValue)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') handleSubmit()
  }

  const hasContent = inputValue.trim().length > 0

  // Light-mode-aware chip styles
  const chipStyle = {
    background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
    border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(123,92,246,0.15)',
    color: theme === 'dark' ? 'rgba(255,255,255,0.45)' : 'var(--text-secondary)',
    backdropFilter: theme === 'light' ? 'blur(12px)' : undefined,
  }

  const chipHoverIn = e => {
    e.currentTarget.style.borderColor = 'rgba(123,92,240,0.4)'
    e.currentTarget.style.color = theme === 'dark' ? 'rgba(255,255,255,0.85)' : 'var(--purple-deep, #5B3FD0)'
    e.currentTarget.style.background = theme === 'dark' ? 'rgba(123,92,240,0.1)' : 'var(--bg-tinted, rgba(237,233,255,0.6))'
  }
  const chipHoverOut = e => {
    e.currentTarget.style.borderColor = chipStyle.border.replace('1px solid ', '')
    e.currentTarget.style.color = chipStyle.color
    e.currentTarget.style.background = chipStyle.background
  }

  return (
    <div className="w-full flex flex-col items-center gap-4" style={{ maxWidth: 680 }}>

      {/* ── Conversation thread */}
      <AnimatePresence>
        {conversation.length > 0 && (
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: isFadingOut ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isFadingOut ? 0.8 : 0.3, ease: 'easeInOut' }}
            className="w-full flex flex-col gap-3"
            style={{ maxHeight: '380px', overflowY: 'auto' }}
          >
            <AnimatePresence mode="popLayout">
              {conversation.map((item, i) =>
                item.type === 'user'
                  ? <UserBubble key={i} text={item.text} />
                  : <ResponseBubble key={i} message={item.message} />
              )}
            </AnimatePresence>

            {isFadingOut && <CycleDivider />}

            <AnimatePresence>
              {isProcessing && (
                <motion.div key="proc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ProcessingDots />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Prompt box */}
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ borderRadius: '1.75rem', boxShadow: '0 0 60px rgba(123,92,240,0.15)' }}
      >
        <div
          style={{
            borderRadius: '1.75rem',
            padding: '16px 20px',
            background: theme === 'dark' ? 'var(--bg-glass)' : 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(24px) saturate(160%) brightness(1.08)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%) brightness(1.08)',
            border: isAcknowledging
              ? '1px solid #7B5CF0'
              : `1px solid ${isFocused ? (theme === 'dark' ? 'var(--border-focus)' : '#7B5CF0') : (theme === 'dark' ? 'var(--border-glass)' : 'rgba(123,92,240,0.15)')}`,
            boxShadow: isAcknowledging
              ? '0 0 20px rgba(123,92,240,0.3)'
              : isFocused
                ? (theme === 'dark' ? '0 0 0 3px rgba(123,92,240,0.15), 0 0 50px rgba(123,92,240,0.12), var(--inset-top), var(--shadow-glass)' : '0 0 0 3px rgba(123,92,240,0.12), 0 0 40px rgba(123,92,240,0.10)')
                : (theme === 'dark' ? 'var(--inset-top), var(--inset-bottom), var(--shadow-glass)' : '0 8px 40px rgba(123,92,240,0.12), inset 0 1px 0 rgba(255,255,255,1.0)'),
            transition: 'box-shadow 200ms ease, border-color 200ms ease',
            position: 'relative',
          }}
        >
          <BorderBeam duration={beamDuration} />
          <div className="flex items-center gap-3">
            {/* Mascot */}
            <motion.div animate={{ scale: isFocused ? 1.05 : 0.95 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
              <NorvaBot size={20} style={{ opacity: isFocused ? 1 : 0.4, transition: 'opacity 200ms ease', flexShrink: 0 }} />
            </motion.div>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={PLACEHOLDER_CYCLE[placeholderIndex]}
              className="font-mono-jb flex-1 bg-transparent border-none outline-none text-[14px]"
              style={{ color: 'var(--text-primary)', caretColor: 'var(--purple-primary)' }}
            />

            {/* Send button */}
            <motion.button
              onClick={handleSubmit}
              whileTap={{ scale: 0.92 }}
              animate={{
                background: hasContent ? 'var(--purple-primary)' : 'var(--purple-subtle)',
                boxShadow: hasContent ? '0 0 20px rgba(123,92,240,0.4)' : 'none',
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '1px solid var(--border-subtle)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0,
              }}
            >
              <ArrowUp size={16} color="white" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ── Suggestion chips */}
      <motion.div className="flex flex-wrap justify-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        {CHIPS.map((chip, i) => (
          <motion.button
            key={chip}
            onClick={() => handleChipClick(chip)}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className="font-geist rounded-full px-4 py-1.5 text-xs font-medium cursor-pointer transition-all"
            style={chipStyle}
            onMouseEnter={chipHoverIn}
            onMouseLeave={chipHoverOut}
          >
            {chip}
          </motion.button>
        ))}
      </motion.div>

      {/* ── /help hint */}
      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="font-mono-jb text-[10px] tracking-wider text-center m-0"
        style={{ color: 'var(--text-mono)' }}
      >
        Type /help to see all available commands
      </motion.p>

      {/* ── Marquee */}
      <Marquee theme={theme} onItemClick={handleChipClick} />
    </div>
  )
}
