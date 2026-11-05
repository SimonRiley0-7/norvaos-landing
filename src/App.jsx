import { useState, useCallback, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { ProblemSection } from './components/ProblemSection'
import { ContextAwareSection } from './components/ContextAwareSection'
import { CapabilityStrip } from './components/CapabilityStrip'
import { IntentToActionSection } from './components/IntentToActionSection'
import { WorkflowsSection } from './components/WorkflowsSection'
import { PrivacySection } from './components/PrivacySection'
import { AudienceSection } from './components/AudienceSection'
import { FAQSection } from './components/FAQSection'
import { DownloadSection } from './components/DownloadSection'
import { Footer } from './components/Footer'
import { DemoModal } from './components/DemoModal'
import { Dashboard } from './components/Dashboard'
import { LegalContactModals } from './components/LegalContactModals'
import { TeamPage } from './components/TeamPage'

export default function App() {
  // Render private admin dashboard at /dashboard route
  if (window.location.pathname === '/dashboard') {
    return <Dashboard />
  }

  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname
    }
    return '/'
  })

  const [showDemoModal, setShowDemoModal] = useState(false)
  const [activeModal, setActiveModal] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname
      if (p === '/privacy') return 'privacy'
      if (p === '/terms') return 'terms'
      if (p === '/contact') return 'contact'
    }
    return null
  })

  useEffect(() => {
    const onPop = () => {
      const p = window.location.pathname
      setCurrentPath(p)
      if (p === '/privacy') setActiveModal('privacy')
      else if (p === '/terms') setActiveModal('terms')
      else if (p === '/contact') setActiveModal('contact')
      else setActiveModal(null)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const handleNavigate = useCallback((path) => {
    window.history.pushState(null, '', path)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleOpenModal = useCallback((modalType) => {
    setActiveModal(modalType)
    window.history.pushState(null, '', `/${modalType}`)
  }, [])

  const handleCloseModal = useCallback(() => {
    setActiveModal(null)
    window.history.pushState(null, '', '/')
  }, [])

  const handleDownload = useCallback((platform = 'mac') => {
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
  }, [])

  // Dedicated Team Page route
  if (currentPath === '/team') {
    return (
      <TeamPage
        onBack={() => handleNavigate('/')}
        onContactClick={() => handleOpenModal('contact')}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#17171C] antialiased selection:bg-[#7B5CF0]/20 selection:text-[#17171C]">
      {/* 1. Refined Sticky Navigation */}
      <Navbar onDownloadClick={handleDownload} onNavigate={handleNavigate} />

      <main>
        {/* Section 1: Hero — Introduce NORVA */}
        <HeroSection
          onWatchDemo={() => setShowDemoModal(true)}
          onDownloadClick={handleDownload}
        />

        {/* Section 2: The Problem — Why NORVA Exists */}
        <ProblemSection />

        {/* Section 3: Product Introduction — What Is NORVA? */}
        <ContextAwareSection />

        {/* Section 4: Core Capabilities — What NORVA Can Do (3 Liquid Glass Bento) */}
        <CapabilityStrip />

        {/* Section 5: How NORVA Works — Deterministic Execution Pipeline */}
        <IntentToActionSection />

        {/* Section 6: Everyday Workflows — Real-World Applications */}
        <WorkflowsSection />

        {/* Section 7: Local-First Architecture — Privacy by Design */}
        <PrivacySection />

        {/* Section 8: Who NORVA Is Built For */}
        <AudienceSection />

        {/* Section 9: Frequently Asked Questions & Availability Status */}
        <FAQSection />

        {/* Section 10: Final Download Section */}
        <DownloadSection onDownloadClick={handleDownload} />
      </main>

      {/* Footer: Comprehensive Links, Architecture & Legal */}
      <Footer onOpenModal={handleOpenModal} onNavigate={handleNavigate} />

      {/* Interactive Product Demo Modal */}
      <DemoModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        onDownloadClick={handleDownload}
      />

      {/* Privacy Policy, Terms & Conditions, and Contact Modals */}
      <LegalContactModals
        activeModal={activeModal}
        onClose={handleCloseModal}
      />
    </div>
  )
}
