import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { AppleIcon } from './Navbar'
import { DesktopHeroApp } from './DesktopHeroApp'

// Windows SVG Icon
function WindowsIcon({ size = 15, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M0 3.449L9.75 2.1v9.451H0V3.449zm0 17.102L9.75 21.9v-9.451H0v8.102zm10.95 1.549L24 24V12.45h-13.05v10.1zm0-19.998v9.349H24V0l-13.05 2.102z" />
    </svg>
  )
}

export function HeroSection({ onWatchDemo, onDownloadClick }) {
  const handleDownload = (platform = 'mac') => {
    if (onDownloadClick) {
      onDownloadClick(platform)
    } else {
      const notifyEl = document.getElementById('notify-me')
      if (notifyEl) {
        notifyEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setTimeout(() => {
          const input = document.getElementById('beta-email-input')
          if (input) {
            input.focus()
            input.classList.add('ring-2', 'ring-[#7B5CF0]')
            setTimeout(() => input.classList.remove('ring-2', 'ring-[#7B5CF0]'), 2500)
          }
        }, 450)
      }
    }
  }

  return (
    <section className="relative pt-24 pb-12 md:pt-28 md:pb-16 overflow-visible">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* =========================================================
              LEFT COLUMN: EDITORIAL PRODUCT MESSAGING
              ========================================================= */}
          <div className="lg:col-span-5 flex flex-col items-start text-left z-10 pl-0 sm:pl-4 lg:pl-8 xl:pl-12">
            {/* 1. Small label: "Local by design" */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill text-[#17171C] text-[13px] font-medium mb-6 select-none"
            >
              <Lock size={12} className="text-[#6B6B76] stroke-[2.2]" />
              <span>Local by design</span>
            </motion.div>

            {/* 2. Main headline: "Your desktop works for you." */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[44px] sm:text-[54px] md:text-[62px] lg:text-[66px] font-medium text-[#17171C] tracking-tight leading-[1.06] mb-6"
              style={{
                fontFamily: "'Switzer', sans-serif",
                fontWeight: 500,
              }}
            >
              Your desktop
              <br />
              works{' '}
              <span
                className="font-serif italic text-[#7B5CF0] inline-block font-normal"
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: 'italic',
                }}
              >
                for you.
              </span>
            </motion.h1>

            {/* 3. Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-[17px] sm:text-[18px] text-[#5A5A66] leading-relaxed max-w-[440px] mb-8 font-normal"
            >
              NORVA is the OS-native intelligence layer that understands your work,
              automates the repetitive, and helps you get things done.
            </motion.p>

            {/* 4. Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3.5 mb-4"
            >
              {/* Primary: Download for macOS */}
              <button
                onClick={() => handleDownload('mac')}
                id="hero-download-mac-btn"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#17171C] text-white text-[15px] font-medium transition-all duration-200 hover:bg-black hover:shadow-lg hover:shadow-black/10 active:scale-[0.98] cursor-pointer"
              >
                <AppleIcon size={16} className="text-white fill-current transition-transform group-hover:scale-110" />
                <span>Download for macOS</span>
              </button>

              {/* Secondary: Download for Windows */}
              <button
                onClick={() => handleDownload('windows')}
                id="hero-download-win-btn"
                className="group inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-white/80 backdrop-blur-md text-[#17171C] border border-[#E8E6E1] text-[15px] font-medium transition-all duration-200 hover:bg-white hover:border-[#D8D6D0] active:scale-[0.98] cursor-pointer shadow-2xs"
              >
                <WindowsIcon size={15} />
                <span>Download for Windows</span>
              </button>
            </motion.div>

            {/* 5. Subtext: System requirements */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-[13px] text-[#8E8E98] font-medium tracking-wide"
            >
              macOS 14+ &amp; Windows 11 · Zero cloud dependency
            </motion.p>
          </div>

          {/* =========================================================
              RIGHT COLUMN: INTERACTIVE PRODUCT INTERFACE DEMONSTRATION
              ========================================================= */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <DesktopHeroApp onTriggerDownload={handleDownload} />
          </div>
        </div>
      </div>
    </section>
  )
}
