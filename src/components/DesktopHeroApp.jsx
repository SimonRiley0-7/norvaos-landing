import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Calendar,
  Mail,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Folder,
} from 'lucide-react'
import { NorvaRibbonGlyph } from './NorvaLogo'

export function DesktopHeroApp({ onTriggerDownload }) {
  const [inputValue, setInputValue] = useState('')
  const [activePrompt, setActivePrompt] = useState(null)
  const [executionState, setExecutionState] = useState('idle') // 'idle' | 'executing' | 'result'
  const [executionStep, setExecutionStep] = useState(0)
  const [dockHoverIndex, setDockHoverIndex] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const chips = [
    { id: 'files', label: 'Find files', prompt: 'Find my recent documents', icon: FileText },
    { id: 'plan', label: 'Plan my day', prompt: 'Plan my day', icon: Calendar },
    { id: 'email', label: 'Draft an email', prompt: 'Draft an email to Bhumi', icon: Mail },
    { id: 'organize', label: '···', prompt: 'Organize my desktop files', isOverflow: true },
  ]

  const dockApps = [
    { id: 'finder', name: 'Finder', type: 'finder' },
    { id: 'safari', name: 'Safari', type: 'safari' },
    { id: 'notion', name: 'Notion', type: 'notion' },
    { id: 'figma', name: 'Figma', type: 'figma' },
    { id: 'calendar', name: 'Calendar', type: 'calendar' },
    { id: 'mail', name: 'Mail', type: 'mail' },
    { id: 'notes', name: 'Notes', type: 'notes' },
  ]

  const handleSelectChip = (chip) => {
    setActivePrompt(chip.id)
    setInputValue(chip.prompt)
    setExecutionState('executing')
    setExecutionStep(0)

    setTimeout(() => setExecutionStep(1), 500)
    setTimeout(() => setExecutionStep(2), 1100)
    setTimeout(() => {
      setExecutionState('result')
    }, 1800)
  }

  const handleFormSubmit = (e) => {
    e?.preventDefault()
    if (!inputValue.trim()) return

    const lower = inputValue.toLowerCase().trim()
    if (lower.includes('download')) {
      if (onTriggerDownload) onTriggerDownload()
      return
    }

    if (lower.includes('plan') || lower.includes('day') || lower.includes('schedule')) {
      handleSelectChip(chips[1])
    } else if (lower.includes('file') || lower.includes('doc') || lower.includes('search')) {
      handleSelectChip(chips[0])
    } else if (lower.includes('mail') || lower.includes('draft') || lower.includes('send')) {
      handleSelectChip(chips[2])
    } else {
      handleSelectChip(chips[3])
    }
  }

  const handleReset = () => {
    setExecutionState('idle')
    setActivePrompt(null)
    setInputValue('')
    setExecutionStep(0)
  }

  return (
    <div
      className="relative w-full max-w-[860px] lg:max-w-[950px] mx-auto select-none pt-2 pb-8 px-2 sm:px-6 -mt-2 sm:-mt-4"
      style={{ perspective: 1000, perspectiveOrigin: '52% 48%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Container (Applies smooth translateY without overriding 3D tilt) */}
      <div className="float-3d-scene relative w-full" style={{ transformStyle: 'preserve-3d' }}>
        {/* =========================================================
            LAYER 1: BACKGROUND MOUNTAIN DESKTOP WINDOW
            (Option B: Large scale ~880px wide × ~740px tall, aspect-[16/13.5], rotateX(16deg))
            ========================================================= */}
        <div
          className="relative ml-auto w-[96%] sm:w-[94%] rounded-[36px] sm:rounded-[44px] overflow-hidden aspect-[16/13.5] border border-white/60 shadow-[0_50px_110px_-25px_rgba(20,15,35,0.32),0_24px_50px_-10px_rgba(20,15,35,0.16)] flex flex-col justify-end p-4 sm:p-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(240, 245, 255, 0.08) 0%, rgba(245, 235, 225, 0.05) 100%), url('/macos-wallpaper.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'right 35%',
            transform: isMobile
              ? 'rotateY(-6deg) rotateX(6deg) rotateZ(-0.5deg)'
              : isHovered
              ? 'rotateY(-10deg) rotateX(8deg) rotateZ(-1deg)'
              : 'rotateY(-20deg) rotateX(16deg) rotateZ(-2.5deg)',
            transformOrigin: 'right center',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Subtle macOS dock at bottom of mountain wallpaper */}
          <div className="relative z-10 flex justify-center mt-auto pb-1.5 sm:pb-2.5">
            <div
              className="flex items-center gap-2 sm:gap-2.5 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-[24px] sm:rounded-[26px] bg-white/40 backdrop-blur-2xl border border-white/65 shadow-[0_18px_40px_rgba(20,15,35,0.18),inset_0_1px_0_rgba(255,255,255,0.85)]"
              onMouseLeave={() => setDockHoverIndex(null)}
            >
              {dockApps.map((app, index) => {
                const isItemHovered = dockHoverIndex === index
                const isNeighbor =
                  dockHoverIndex !== null && Math.abs(dockHoverIndex - index) === 1

                return (
                  <div
                    key={app.id}
                    onMouseEnter={() => setDockHoverIndex(index)}
                    className="relative w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center cursor-pointer select-none shadow-[0_3px_8px_rgba(0,0,0,0.15)]"
                    style={{
                      transformOrigin: 'bottom center',
                      transform: isItemHovered
                        ? 'scale(1.30) translateY(-6px)'
                        : isNeighbor
                        ? 'scale(1.14) translateY(-2px)'
                        : 'scale(1) translateY(0)',
                      transition: 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                    title={app.name}
                  >
                    {/* 1. Finder: Authentic Smiling Face */}
                    {app.type === 'finder' && (
                      <div className="w-full h-full rounded-xl bg-gradient-to-b from-[#4BA5FF] to-[#0D72EC] flex items-center justify-center p-1.5 shadow-sm overflow-hidden relative">
                        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                          <path d="M 12 18 C 12 14 16 12 20 12 L 50 12 L 50 88 L 20 88 C 16 88 12 86 12 82 Z" fill="#69C0FF"/>
                          <path d="M 50 12 L 80 12 C 84 12 88 14 88 18 L 88 82 C 88 86 84 88 80 88 L 50 88 Z" fill="#1C77E8"/>
                          <path d="M 50 12 Q 54 48 50 56 Q 38 60 36 68 Q 34 76 50 78 L 50 88" stroke="#003D99" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
                          <ellipse cx="36" cy="40" rx="3.5" ry="6" fill="#003D99"/>
                          <ellipse cx="64" cy="40" rx="3.5" ry="6" fill="#003D99"/>
                          <path d="M 32 64 Q 50 82 68 64" stroke="#003D99" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
                        </svg>
                      </div>
                    )}

                    {/* 2. Safari: Authentic Compass */}
                    {app.type === 'safari' && (
                      <div className="w-full h-full rounded-xl bg-white flex items-center justify-center p-0.5 shadow-sm overflow-hidden">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle cx="50" cy="50" r="46" fill="#1D9BF0"/>
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.6"/>
                          <circle cx="50" cy="50" r="39" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="2, 6"/>
                          <polygon points="50,16 57,50 50,46" fill="#FF3B30"/>
                          <polygon points="50,16 43,50 50,46" fill="#FF6961"/>
                          <polygon points="50,84 57,50 50,54" fill="#E5E5EA"/>
                          <polygon points="50,84 43,50 50,54" fill="#FFFFFF"/>
                          <circle cx="50" cy="50" r="3.5" fill="#FFFFFF"/>
                        </svg>
                      </div>
                    )}

                    {/* 3. Notion: Tile with Serif N */}
                    {app.type === 'notion' && (
                      <div className="w-full h-full rounded-xl bg-white border border-black/10 flex items-center justify-center text-black font-serif font-black text-[16px] shadow-sm">
                        N
                      </div>
                    )}

                    {/* 4. Figma: Authentic 5-Color Shapes */}
                    {app.type === 'figma' && (
                      <div className="w-full h-full rounded-xl bg-[#1E1E1E] flex items-center justify-center shadow-sm">
                        <svg width="15" height="22" viewBox="0 0 38 57" fill="none">
                          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                        </svg>
                      </div>
                    )}

                    {/* 5. Calendar [JUN 10] */}
                    {app.type === 'calendar' && (
                      <div className="w-full h-full rounded-xl bg-white flex flex-col overflow-hidden border border-black/10 shadow-sm">
                        <div className="w-full h-[11px] bg-[#E02E2E] text-white text-[7.5px] font-bold flex items-center justify-center tracking-wider leading-none">
                          JUN
                        </div>
                        <div className="flex-1 flex items-center justify-center text-[13px] font-bold text-[#17171C] leading-none pt-0.5">
                          10
                        </div>
                      </div>
                    )}

                    {/* 6. Mail: Folded Envelope */}
                    {app.type === 'mail' && (
                      <div className="w-full h-full rounded-xl bg-gradient-to-b from-[#38A5FF] to-[#006CE0] flex items-center justify-center text-white shadow-sm">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="15" x="2" y="4.5" rx="2"/>
                          <polyline points="22 7 12 13.5 2 7"/>
                        </svg>
                      </div>
                    )}

                    {/* 7. Notes: Amber Notepad */}
                    {app.type === 'notes' && (
                      <div className="w-full h-full rounded-xl bg-gradient-to-b from-[#F2C94C] to-[#E2A123] flex items-center justify-center shadow-sm relative overflow-hidden">
                        <div className="w-full h-[5px] bg-[#C98B1B] absolute top-0 inset-x-0" />
                        <div className="space-y-1 w-4 opacity-50 pt-1">
                          <div className="h-[1.5px] bg-[#6E4B07] rounded-full w-full" />
                          <div className="h-[1.5px] bg-[#6E4B07] rounded-full w-3/4" />
                          <div className="h-[1.5px] bg-[#6E4B07] rounded-full w-4/5" />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* =========================================================
            LAYER 2: FOREGROUND FLOATING NORVA COMMAND WINDOW
            (Compact sizing, centered nicely in the middle of the desktop scene)
            ========================================================= */}
        <div
          className="absolute top-[20%] sm:top-[24%] left-[3%] sm:left-[4%] z-20 w-[88%] sm:w-[68%] rounded-[24px] sm:rounded-[30px] p-4 sm:p-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            background: 'linear-gradient(155deg, rgba(255, 255, 255, 0.62) 0%, rgba(246, 244, 252, 0.40) 100%)',
            backdropFilter: 'blur(18px) saturate(200%)',
            WebkitBackdropFilter: 'blur(18px) saturate(200%)',
            border: '1.5px solid rgba(255, 255, 255, 0.85)',
            transform: isMobile
              ? 'rotateY(-4deg) rotateX(4deg) translateZ(30px)'
              : isHovered
              ? 'rotateY(-7deg) rotateX(6deg) rotateZ(-1.5deg) translateZ(55px)'
              : 'rotateY(-15deg) rotateX(12deg) rotateZ(-3deg) translateZ(75px)',
            transformOrigin: 'center center',
            transformStyle: 'preserve-3d',
            boxShadow: `
              -20px 34px 75px -10px rgba(18, 14, 38, 0.28),
              0 12px 28px -6px rgba(18, 14, 38, 0.12),
              inset 0 2px 2px 0 rgba(255, 255, 255, 1),
              inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.04)
            `,
          }}
        >
          {/* Window Header: Traffic Lights (Left) & Chiclet ⌘ K Keys (Right) */}
          <div className="flex items-center justify-between mb-2.5 sm:mb-3">
            {/* Traffic Lights */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 inline-block shadow-inner hover:scale-115 transition-transform cursor-pointer" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 inline-block shadow-inner hover:scale-115 transition-transform cursor-pointer" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 inline-block shadow-inner hover:scale-115 transition-transform cursor-pointer" />
            </div>

            {/* Window action / ⌘ K Chiclet Keys (Exact to screenshot) */}
            {executionState === 'result' ? (
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-[11px] text-[#7B5CF0] font-medium hover:underline cursor-pointer"
              >
                <RotateCcw size={11} />
                <span>New prompt</span>
              </button>
            ) : (
              <div className="flex items-center gap-1 p-0.5 sm:p-1 rounded-lg sm:rounded-xl bg-white/60 border border-black/5 shadow-xs select-none">
                <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-[6px] bg-white/95 border border-black/10 flex items-center justify-center text-[10.5px] sm:text-[11.5px] font-medium text-[#3A3A42] shadow-[0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)]">
                  ⌘
                </div>
                <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-[6px] bg-white/95 border border-black/10 flex items-center justify-center text-[10.5px] sm:text-[11.5px] font-sans font-medium text-[#3A3A42] shadow-[0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)]">
                  K
                </div>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {/* =========================================================
                STATE 1: IDLE / PROMPT MENU (Ditto to screenshot)
                ========================================================= */}
            {executionState === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center text-center"
              >
                {/* Official NORVA Bot Mascot PNG */}
                <div className="relative mb-2.5 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#7B5CF0]/25 rounded-full blur-xl transform scale-150 pointer-events-none" />
                  <img
                    src="/Norva-bot.png"
                    alt="NORVA Bot"
                    className="relative z-10 w-11 h-11 sm:w-12 sm:h-12 object-contain drop-shadow-[0_4px_16px_rgba(123,92,240,0.45)] hover:scale-105 transition-transform duration-200 select-none"
                  />
                </div>

                {/* Subheading: "What would you like to do?" */}
                <h3
                  className="font-medium text-[17px] sm:text-[19px] text-[#17171C] tracking-tight mb-3 select-none"
                  style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                >
                  What would you like to do?
                </h3>

                {/* Search Bar: Full Pill with Purple Arrow Button & Blinking Cursor */}
                <form
                  onSubmit={handleFormSubmit}
                  className="relative flex items-center w-full h-11 sm:h-12 bg-white/50 backdrop-blur-md border border-white/85 rounded-full pl-4 pr-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.03),inset_0_1px_2px_rgba(255,255,255,0.8)] focus-within:bg-white/80 focus-within:border-[#7B5CF0] focus-within:ring-2 focus-within:ring-[#7B5CF0]/20 transition-all mb-3"
                >
                  {/* Blinking Purple Text Cursor before input placeholder */}
                  <span className="w-[1.5px] h-4 bg-[#7B5CF0] mr-1 rounded-full animate-pulse flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask NORVA anything..."
                    className="w-full bg-transparent border-none outline-none text-[#17171C] text-[13px] sm:text-[13.5px] placeholder-[#7E7E8B] pr-2 font-normal"
                  />
                  <button
                    type="submit"
                    className="group w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-[#7B5CF0] hover:bg-[#6D4EE6] text-white flex items-center justify-center flex-shrink-0 shadow-[0_3px_10px_rgba(123,92,240,0.35)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    title="Run command"
                  >
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </button>
                </form>

                {/* Quick-Action Chips (All 4 in a horizontal row ditto to screenshot) */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 w-full">
                  {chips.map((chip) => {
                    const Icon = chip.icon
                    return (
                      <button
                        key={chip.id}
                        type="button"
                        onClick={() => handleSelectChip(chip)}
                        className={`group inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-white/60 hover:bg-white/95 backdrop-blur-md border border-white/85 hover:border-[#7B5CF0] text-[#2D2D35] text-[12px] sm:text-[12.5px] font-medium transition-all duration-150 hover:scale-105 hover:shadow-[0_2px_10px_rgba(96,71,200,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] active:scale-95 cursor-pointer select-none whitespace-nowrap ${
                          chip.isOverflow ? 'px-2.5 font-medium tracking-widest' : ''
                        }`}
                      >
                        {Icon && (
                          <Icon size={13} className="text-[#5A5A66] group-hover:text-[#7B5CF0] transition-colors" />
                        )}
                        <span>{chip.label}</span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* =========================================================
                STATE 2: EXECUTING STATE
                ========================================================= */}
            {executionState === 'executing' && (
              <motion.div
                key="executing"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-3 px-1 text-left"
              >
                <div className="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-[#F0EEEB]">
                  <div className="w-7 h-7 rounded-lg bg-[#F4F1FF] flex items-center justify-center text-[#7B5CF0]">
                    <Sparkles size={15} className="animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#17171C] leading-snug">
                      {inputValue}
                    </p>
                    <p className="text-[11px] text-[#7B5CF0] font-mono">
                      Apple Silicon Neural Engine · 0 bytes cloud egress
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 text-[12px]">
                  <div className="flex items-center gap-2 text-[#17171C]">
                    <CheckCircle2 size={13} className="text-[#7B5CF0]" />
                    <span>Parsing local desktop context</span>
                  </div>
                  <div className={`flex items-center gap-2 transition-opacity ${executionStep >= 1 ? 'opacity-100 text-[#17171C]' : 'opacity-40 text-[#8E8E98]'}`}>
                    {executionStep >= 1 ? (
                      <CheckCircle2 size={13} className="text-[#7B5CF0]" />
                    ) : (
                      <div className="w-3 h-3 rounded-full border-2 border-stone-300 border-t-[#7B5CF0] animate-spin" />
                    )}
                    <span>Synthesizing system state</span>
                  </div>
                  <div className={`flex items-center gap-2 transition-opacity ${executionStep >= 2 ? 'opacity-100 text-[#17171C]' : 'opacity-40 text-[#8E8E98]'}`}>
                    {executionStep >= 2 ? (
                      <CheckCircle2 size={13} className="text-[#7B5CF0]" />
                    ) : (
                      <div className="w-3 h-3 rounded-full border-2 border-stone-300" />
                    )}
                    <span>Compiling native response...</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* =========================================================
                STATE 3: SIMULATED RESULTS
                ========================================================= */}
            {executionState === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-left"
              >
                {activePrompt === 'plan' && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between pb-2 border-b border-[#F0EEEB]">
                      <span className="text-[12px] font-semibold text-[#17171C]">Today · 3 Priorities</span>
                      <span className="text-[11px] text-[#7B5CF0] font-medium">92% Day Scheduled</span>
                    </div>
                    <div className="space-y-1.5 text-[12px]">
                      <div className="p-2 rounded-xl bg-white border border-[#EBE8E3] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                          <span className="font-medium text-[#17171C]">Sprint Retrospective with Design Team</span>
                        </div>
                        <span className="text-[11px] text-[#8E8E98]">10:00 AM</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-[#EBE8E3] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7B5CF0]" />
                          <span className="font-medium text-[#17171C]">Review Seed Deck with Bhumi & Shivam</span>
                        </div>
                        <span className="text-[11px] text-[#8E8E98]">02:30 PM</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-[#EBE8E3] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                          <span className="font-medium text-[#17171C]">Sign Off on v1.0.0 Metal Shader Build</span>
                        </div>
                        <span className="text-[11px] text-[#8E8E98]">05:00 PM</span>
                      </div>
                    </div>
                  </div>
                )}

                {activePrompt === 'files' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-[#F0EEEB]">
                      <span className="text-[12px] font-semibold text-[#17171C]">Found 3 Files · Indexed Locally</span>
                      <span className="text-[11px] text-[#7B5CF0]">Semantic Match</span>
                    </div>
                    <div className="space-y-1.5 text-[12px]">
                      <div className="p-2 rounded-xl bg-white border border-[#EBE8E3] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Folder size={14} className="text-[#7B5CF0]" />
                          <span className="font-medium text-[#17171C]">NORVA-Pitch-Deck-v3.pdf</span>
                        </div>
                        <span className="text-[11px] text-[#8E8E98]">Keynote · 2.4 MB</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-[#EBE8E3] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText size={14} className="text-[#38A5FF]" />
                          <span className="font-medium text-[#17171C]">desktop_intelligence_spec.md</span>
                        </div>
                        <span className="text-[11px] text-[#8E8E98]">Obsidian · 42 KB</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-[#EBE8E3] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Folder size={14} className="text-[#FFBD2E]" />
                          <span className="font-medium text-[#17171C]">Design-System-Components.fig</span>
                        </div>
                        <span className="text-[11px] text-[#8E8E98]">Figma · 12 MB</span>
                      </div>
                    </div>
                  </div>
                )}

                {activePrompt === 'email' && (
                  <div className="space-y-2 text-[12px]">
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#F0EEEB]">
                      <span className="font-semibold text-[#17171C]">Draft Generated</span>
                      <span className="text-[11px] text-[#27C93F] font-medium">Ready in Mail.app</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#EBE8E3] text-[#4A4A54] leading-relaxed">
                      <p className="font-semibold text-[#17171C] mb-1">Subject: NORVA v1.0 Launch & Next Steps</p>
                      <p>Hi Bhumi, the desktop intelligence layer pipeline is validated. Metal shaders and Neural Engine offline embeddings benchmarked at 18ms latency. Ready for staging review.</p>
                    </div>
                  </div>
                )}

                {activePrompt === 'organize' && (
                  <div className="space-y-2 text-[12px]">
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#F0EEEB]">
                      <span className="font-semibold text-[#17171C]">Desktop Cleanup Proposal</span>
                      <span className="text-[11px] text-[#7B5CF0]">14 Items Categorized</span>
                    </div>
                    <div className="space-y-1">
                      <div className="p-2 rounded-xl bg-white border border-[#EBE8E3] flex items-center justify-between">
                        <span>Move 8 screenshots to ~/Screenshots/2026/</span>
                        <span className="text-[11px] font-semibold text-[#7B5CF0]">Apply</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-[#EBE8E3] flex items-center justify-between">
                        <span>Archive 4 Figma exports to ~/Documents/Projects/</span>
                        <span className="text-[11px] font-semibold text-[#7B5CF0]">Apply</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
