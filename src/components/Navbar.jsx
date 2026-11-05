import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
          ? 'py-2.5 sm:py-3'
          : 'py-5 bg-transparent'
      }`}
    >
      <div
        className={`max-w-[1240px] mx-auto px-6 md:px-10 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'py-2.5 px-6 sm:px-8 rounded-full bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_12px_32px_-8px_rgba(23,23,28,0.08),inset_0_1px_1px_rgba(255,255,255,1)]'
            : ''
        }`}
      >
        {/* Left: Brand symbol & wordmark */}
        <a href="/" className="group flex items-center transition-opacity hover:opacity-90">
          <NorvaBrandLockup size={28} showWordmark={true} />
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-9">
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

        {/* Right: Native Download for Mac CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            id="nav-download-btn"
            className="group relative inline-flex items-center gap-2 px-4 py-2 md:px-4.5 md:py-2.2 rounded-full bg-[#17171C] text-white text-[13px] font-medium transition-all duration-200 hover:bg-black hover:shadow-md active:scale-[0.98]"
            title="Download NORVA for macOS"
          >
            <AppleIcon size={14} className="text-white fill-current transition-transform group-hover:scale-105" />
            <span>Download for Mac</span>
          </button>
        </div>
      </div>
    </motion.header>
  )
}
