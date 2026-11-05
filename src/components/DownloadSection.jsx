import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AppleIcon } from './Navbar'
import { NorvaRibbonGlyph } from './NorvaLogo'
import { Check, ArrowRight, ShieldCheck, Laptop } from 'lucide-react'

// Windows SVG Icon
function WindowsIcon({ size = 15, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M0 3.449L9.75 2.1v9.451H0V3.449zm0 17.102L9.75 21.9v-9.451H0v8.102zm10.95 1.549L24 24V12.45h-13.05v10.1zm0-19.998v9.349H24V0l-13.05 2.102z" />
    </svg>
  )
}

export function DownloadSection({ onDownloadClick }) {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [waitlistCount, setWaitlistCount] = useState(148)

  useEffect(() => {
    fetch('/api/waitlist/count')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === 'number') {
          setWaitlistCount(data.count)
        }
      })
      .catch(() => { })
  }, [])

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

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || submitting) return
    setSubmitting(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      if (res.ok) {
        setSubmitted(true)
        if (data.totalCount) setWaitlistCount(data.totalCount)
      } else {
        setErrorMsg(data.error || 'Failed to join. Please try again.')
      }
    } catch (err) {
      setErrorMsg('Could not connect to server. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="resources" className="py-24 md:py-36 bg-[#FAF9F7] border-t border-[#E8E6E1]/80 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="relative rounded-[28px] sm:rounded-[36px] liquid-glass-card p-6 sm:p-12 md:p-16 overflow-hidden text-center">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[340px] bg-[#7B5CF0]/12 rounded-full blur-[100px] pointer-events-none" />

          {/* Center NORVA Bot Logo */}
          <div className="relative mb-5 sm:mb-6 flex justify-center">
            <div
              className="p-3 sm:p-4 rounded-[22px] sm:rounded-[24px] border border-white/90 flex items-center justify-center transition-transform duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 246, 254, 0.65) 100%)',
                backdropFilter: 'blur(24px) saturate(190%)',
                WebkitBackdropFilter: 'blur(24px) saturate(190%)',
                boxShadow: '0 14px 32px -6px rgba(123, 92, 240, 0.20), inset 0 2px 2px 0 rgba(255, 255, 255, 1)',
              }}
            >
              <img
                src="/Norva-bot.png"
                alt="NORVA Bot logo"
                className="w-10 h-10 sm:w-14 sm:h-14 object-contain select-none drop-shadow-sm"
              />
            </div>
          </div>

          {/* Confident Headline */}
          <h2
            className="text-[28px] xs:text-[34px] sm:text-[46px] md:text-[54px] font-medium text-[#17171C] tracking-tight leading-[1.1] max-w-[700px] mx-auto mb-4 sm:mb-5"
            style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
          >
            Your desktop works for you.
          </h2>

          {/* Supporting Description */}
          <p className="text-[15px] sm:text-[19px] text-[#5A5A66] max-w-[540px] mx-auto leading-relaxed mb-7 sm:mb-9">
            Download NORVA and experience what autonomous desktop intelligence
            feels like across macOS and Windows.
          </p>

          {/* Download CTAs: Mac & Windows */}
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center gap-3 sm:gap-3.5 mb-8 sm:mb-10 max-w-[420px] xs:max-w-none mx-auto">
            <button
              onClick={() => handleDownload('mac')}
              id="cta-download-mac-btn"
              className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#17171C] text-white text-[14px] sm:text-[15px] font-medium transition-all duration-200 hover:bg-black hover:shadow-lg hover:shadow-black/15 active:scale-[0.98] cursor-pointer"
            >
              <AppleIcon size={16} className="text-white fill-current transition-transform group-hover:scale-110" />
              <span>Download for macOS</span>
            </button>

            <button
              onClick={() => handleDownload('windows')}
              id="cta-download-win-btn"
              className="group inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white text-[#17171C] border border-[#E8E6E1] text-[14px] sm:text-[15px] font-medium transition-all duration-200 hover:bg-[#F5F4F0] hover:border-[#D8D6D0] active:scale-[0.98] cursor-pointer shadow-xs"
            >
              <WindowsIcon size={15} />
              <span>Download for Windows</span>
            </button>
          </div>

          {/* Join Beta Waitlist Module */}
          <div id="notify-me" className="max-w-[460px] mx-auto pt-6 border-t border-[#F0EEEB]">
            <p className="text-[14px] text-[#17171C] font-medium mb-3.5 tracking-tight">
              Join for beta version
            </p>
            {submitted ? (
              <div className="p-3.5 rounded-2xl bg-[#E8F8EA] border border-[#A7E5AE] text-[#1AAB29] text-[14px] font-medium">
                ✓ You're on the priority waitlist! We'll notify you as soon as your platform build drops.
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="relative flex items-center">
                <input
                  id="beta-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full bg-white/70 border border-white/90 rounded-full px-5 py-3 text-[14px] text-[#17171C] placeholder-[#8E8E98] outline-none focus:border-[#7B5CF0] focus:ring-2 focus:ring-[#7B5CF0]/15 pr-28 transition-all backdrop-blur-md shadow-inner"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="absolute right-1.5 px-4 py-2 rounded-full bg-[#17171C] hover:bg-black text-white text-[13px] font-medium transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Joining...' : 'Notify me'}
                </button>
              </form>
            )}
            {errorMsg && (
              <p className="text-xs text-red-600 mt-2">{errorMsg}</p>
            )}
            <p className="text-[12.5px] text-[#8E8E98] mt-4">
              Direct team &amp; enterprise inquiry:{' '}
              <a
                href="mailto:act@norvaos.co.in"
                className="font-mono text-[#7B5CF0] font-medium hover:underline"
              >
                act@norvaos.co.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
