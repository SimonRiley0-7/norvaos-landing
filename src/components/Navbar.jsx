import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { NorvaBrandLockup } from './NorvaLogo'

export function AppleIcon({ size = 16, className = '' }) {
  return (
    <img
      src="/apple.png"
      alt="Apple"
      width={size}
      height={size}
      className={`inline-block object-contain shrink-0 brightness-0 invert ${className}`}
      style={{
        width: size,
        height: size,
      }}
    />
  )
}

export function Navbar({ onDownloadClick, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Product', href: '#product' },
    { name: 'Workflows', href: '#workflows' },
    { name: 'Privacy', href: '#privacy' },
    { name: 'Team', href: '/team' },
    { name: 'Resources', href: '#resources' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (href === '/team') {
      if (onNavigate) {
        onNavigate('/team')
      } else {
        window.history.pushState(null, '', '/team')
      }
      return
    }
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDownload = () => {
    setMobileMenuOpen(false)
    if (onDownloadClick) {
      onDownloadClick()
    } else {
      // Default direct download for macOS
      const link = document.createElement('a')
      link.href = 'https://github.com/SimonRiley0-7/landingpage-install/releases/download/v1.0.0/NORVA-1.0.0-arm64.dmg'
      link.download = ''
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Silent analytics tracking
      fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform: 'mac' }),
      }).catch(() => {})
    }
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2 sm:py-3 px-3 sm:px-6'
          : 'py-3.5 sm:py-5 px-3 sm:px-6 bg-transparent'
      }`}
    >
      <div
        className={`max-w-[1240px] mx-auto px-4 sm:px-8 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'py-2 sm:py-2.5 rounded-full bg-white/85 backdrop-blur-2xl border border-white/90 shadow-[0_12px_32px_-8px_rgba(23,23,28,0.08),inset_0_1px_1px_rgba(255,255,255,1)]'
            : ''
        }`}
      >
        {/* Left: Brand symbol & wordmark */}
        <a href="/" className="group flex items-center transition-opacity hover:opacity-90 shrink-0">
          <NorvaBrandLockup size={26} showWordmark={true} />
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[14px] font-medium text-[#5A5A66] hover:text-[#17171C] transition-colors relative py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleDownload}
            id="nav-download-btn"
            className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4.5 py-1.5 sm:py-2 rounded-full bg-[#17171C] text-white text-[12px] sm:text-[13px] font-medium transition-all duration-200 hover:bg-black hover:shadow-md active:scale-[0.98] cursor-pointer"
            title="Download NORVA"
          >
            <AppleIcon size={13} className="text-white fill-current transition-transform group-hover:scale-105" />
            <span className="hidden xs:inline">Download</span>
            <span className="hidden sm:inline">for Mac</span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full bg-white/80 border border-white/90 shadow-2xs flex items-center justify-center text-[#17171C] hover:bg-white active:scale-95 transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Liquid Glass Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 max-w-[1240px] mx-auto px-2"
          >
            <div
              className="rounded-[24px] p-5 shadow-2xl border border-white/95 text-left space-y-1 overflow-hidden"
              style={{
                background: 'linear-gradient(155deg, rgba(255, 255, 255, 0.96) 0%, rgba(248, 246, 254, 0.92) 100%)',
                backdropFilter: 'blur(32px) saturate(200%)',
                WebkitBackdropFilter: 'blur(32px) saturate(200%)',
                boxShadow: '0 20px 50px -10px rgba(23, 23, 28, 0.15), inset 0 2px 2px 0 rgba(255, 255, 255, 1)',
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-[15px] font-medium text-[#17171C] hover:bg-black/5 active:bg-black/10 transition-colors"
                >
                  <span>{link.name}</span>
                  <ArrowRight size={14} className="text-[#8E8E98]" />
                </a>
              ))}
              <div className="pt-2 mt-2 border-t border-[#E8E6E1]/70 flex items-center justify-between px-4 text-xs text-[#8E8E98]">
                <span>Contact:</span>
                <a href="mailto:act@norvaos.co.in" className="font-mono text-[#7B5CF0] font-medium">
                  act@norvaos.co.in
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
