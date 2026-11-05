import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShieldCheck, FileText, Mail, Send, CheckCircle2, Lock, ArrowRight, Sparkles } from 'lucide-react'
import { NorvaBrandLockup } from './NorvaLogo'

export function LegalContactModals({ activeModal, onClose }) {
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [contactSubmitting, setContactSubmitting] = useState(false)

  // Lock background scroll when modal is active
  useEffect(() => {
    if (activeModal) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [activeModal])

  if (!activeModal) return null

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setContactSubmitting(true)
    // Simulate brief submission
    await new Promise((r) => setTimeout(r, 600))
    setContactSubmitting(false)
    setContactSubmitted(true)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/45 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 14 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl rounded-[32px] overflow-hidden shadow-2xl border border-white/90 text-left z-10 flex flex-col"
          style={{
            height: activeModal === 'contact' ? 'auto' : '82vh',
            maxHeight: activeModal === 'contact' ? '88vh' : '84vh',
            background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 248, 254, 0.94) 100%)',
            backdropFilter: 'blur(36px) saturate(190%)',
            WebkitBackdropFilter: 'blur(36px) saturate(190%)',
            boxShadow: '0 32px 80px -16px rgba(23, 23, 28, 0.25), inset 0 2px 2px 0 rgba(255, 255, 255, 1)',
          }}
        >
          {/* Top Specular Edge Line */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#E8E6E1]/80 shrink-0 bg-white/70 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <NorvaBrandLockup size={24} showWordmark={true} />
              <span className="text-xs text-[#8E8E98] border-l border-[#E8E6E1] pl-3 font-mono uppercase tracking-wider">
                {activeModal === 'privacy' && 'Privacy Policy'}
                {activeModal === 'terms' && 'Terms & Conditions'}
                {activeModal === 'contact' && 'Contact Team'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#5A5A66] hover:text-[#17171C] transition-colors cursor-pointer"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Modal Body: Smoothly Scrollable with Guaranteed Viewport Constraint */}
          <div
            className="p-6 sm:p-8 space-y-6 text-[#3A3A46] flex-1 min-h-0 overflow-y-auto overscroll-contain custom-glass-scrollbar pr-3 sm:pr-6"
            style={{
              maxHeight: activeModal === 'contact' ? 'calc(88vh - 75px)' : 'calc(84vh - 75px)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
            }}
          >
            {/* =========================================================
                1. PRIVACY POLICY MODAL
                ========================================================= */}
            {activeModal === 'privacy' && (
              <div className="space-y-6 text-[14.5px] leading-relaxed pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] font-mono text-[11px] font-semibold mb-3">
                    <ShieldCheck size={12} />
                    <span>Air-Gapped Privacy Architecture</span>
                  </div>
                  <h2
                    className="text-[26px] sm:text-[32px] font-medium text-[#17171C] tracking-tight leading-tight"
                    style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                  >
                    Privacy Policy &amp; Data Sovereignty
                  </h2>
                  <p className="text-xs text-[#8E8E98] mt-1 font-mono">
                    Last Updated: March 2026 · Norva OS
                  </p>
                </div>

                <p className="text-[#5A5A66]">
                  NORVA is built from the ground up on a radical principle: <strong>your desktop is private property</strong>.
                  Unlike cloud chatbots that require sending your documents, prompts, and active screen pixels to remote data centers, NORVA operates 100% on-device across macOS and Windows.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/70 border border-white/90 shadow-2xs">
                    <h3 className="text-[16px] font-semibold text-[#17171C] mb-1">
                      1. Zero Cloud Egress
                    </h3>
                    <p className="text-[#5A5A66] text-[13.5px]">
                      Your documents, emails, calendars, spreadsheets, and screenshots never leave your hardware. You can disconnect your internet entirely, and NORVA functions with zero degradation.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border border-white/90 shadow-2xs">
                    <h3 className="text-[16px] font-semibold text-[#17171C] mb-1">
                      2. Local-Only Encrypted Storage
                    </h3>
                    <p className="text-[#5A5A66] text-[13.5px]">
                      All vector indices, SQLite databases, and transient inference buffers reside strictly on your local disk, secured by operating system disk encryption (FileVault on macOS, BitLocker on Windows).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border border-white/90 shadow-2xs">
                    <h3 className="text-[16px] font-semibold text-[#17171C] mb-1">
                      3. Explicit System Permissions &amp; Sandboxing
                    </h3>
                    <p className="text-[#5A5A66] text-[13.5px]">
                      NORVA never reads keystrokes or captures screens silently. Every operating system interaction requires explicit system consent under native OS sandboxes with visual runtime indicators.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border border-white/90 shadow-2xs">
                    <h3 className="text-[16px] font-semibold text-[#17171C] mb-1">
                      4. Zero Model Training &amp; No Telemetry
                    </h3>
                    <p className="text-[#5A5A66] text-[13.5px]">
                      We do not collect training data. Your proprietary source code, personal thoughts, and client files are never used to train or fine-tune foundation models. We log zero analytics from your prompts.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border border-white/90 shadow-2xs">
                    <h3 className="text-[16px] font-semibold text-[#17171C] mb-1">
                      5. Verifiable Open Binary Hashes
                    </h3>
                    <p className="text-[#5A5A66] text-[13.5px]">
                      Every release of NORVA is cryptographically signed and accompanied by verifiable SHA-256 binary checksums. Security teams can run network packet monitors to independently prove zero outbound egress.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border border-white/90 shadow-2xs">
                    <h3 className="text-[16px] font-semibold text-[#17171C] mb-1">
                      6. Instant Local Data Purging
                    </h3>
                    <p className="text-[#5A5A66] text-[13.5px]">
                      You retain complete sovereign ownership of your workspace index. At any time, one click permanently wipes the local vector SQLite index, cached tokens, and operational journals without leaving residual artifacts.
                    </p>
                  </div>
                </div>

                <div className="pt-3 text-xs text-[#8E8E98] border-t border-[#E8E6E1]/70 flex items-center justify-between">
                  <span>Cryptographic governance inquiries:</span>
                  <a href="mailto:act@norvaos.co.in" className="text-[#7B5CF0] font-medium font-mono hover:underline">
                    act@norvaos.co.in
                  </a>
                </div>
              </div>
            )}

            {/* =========================================================
                2. TERMS & CONDITIONS MODAL
                ========================================================= */}
            {activeModal === 'terms' && (
              <div className="space-y-6 text-[14.5px] leading-relaxed pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7B5CF0]/10 text-[#7B5CF0] font-mono text-[11px] font-semibold mb-3">
                    <FileText size={12} />
                    <span>Public Beta Terms</span>
                  </div>
                  <h2
                    className="text-[26px] sm:text-[32px] font-medium text-[#17171C] tracking-tight leading-tight"
                    style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                  >
                    Terms &amp; Conditions of Service
                  </h2>
                  <p className="text-xs text-[#8E8E98] mt-1 font-mono">
                    Last Updated: March 2026 · Version 1.0.0 Public Beta
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/70 border border-white/90 shadow-2xs">
                    <h3 className="text-[16px] font-semibold text-[#17171C] mb-1">
                      1. License &amp; Permitted Use
                    </h3>
                    <p className="text-[#5A5A66] text-[13.5px]">
                      Norva OS grants you a revocable, non-exclusive, non-transferable personal license to install and run the NORVA application on supported macOS and Windows hardware for desktop productivity automation.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border border-white/90 shadow-2xs">
                    <h3 className="text-[16px] font-semibold text-[#17171C] mb-1">
                      2. Deterministic Execution &amp; Rollback Safety
                    </h3>
                    <p className="text-[#5A5A66] text-[13.5px]">
                      NORVA generates atomic execution plans with transactional rollback logs. However, during the Public Beta, users are advised to maintain normal operating system backups for critical data directories.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border border-white/90 shadow-2xs">
                    <h3 className="text-[16px] font-semibold text-[#17171C] mb-1">
                      3. Intellectual Property Rights &amp; Generated Output
                    </h3>
                    <p className="text-[#5A5A66] text-[13.5px]">
                      All code, workflows, summaries, and documents generated locally for you are 100% owned by you. The NORVA native kernel, neural tokenizers, and application brand assets remain the exclusive intellectual property of Norva OS.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border border-white/90 shadow-2xs">
                    <h3 className="text-[16px] font-semibold text-[#17171C] mb-1">
                      4. Public Beta Status &amp; Disclaimer of Warranties
                    </h3>
                    <p className="text-[#5A5A66] text-[13.5px]">
                      The beta software is provided "as is" without warranty of any kind, express or implied. Norva OS is not liable for system incompatibilities or application workflow interruptions with third-party software.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border border-white/90 shadow-2xs">
                    <h3 className="text-[16px] font-semibold text-[#17171C] mb-1">
                      5. Acceptable Use Policy
                    </h3>
                    <p className="text-[#5A5A66] text-[13.5px]">
                      You agree not to reverse engineer the binary kernel, distribute unauthorized repackaged distributions, or utilize NORVA for malicious automation or evasion of OS security controls.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border border-white/90 shadow-2xs">
                    <h3 className="text-[16px] font-semibold text-[#17171C] mb-1">
                      6. Termination &amp; Updates
                    </h3>
                    <p className="text-[#5A5A66] text-[13.5px]">
                      Norva OS reserves the right to deliver software updates, patch runtime sandboxes, or terminate beta licensing for non-compliant usage at any time with prior notice.
                    </p>
                  </div>
                </div>

                <div className="pt-3 text-xs text-[#8E8E98] border-t border-[#E8E6E1]/70 flex items-center justify-between">
                  <span>Legal &amp; licensing inquiries:</span>
                  <a href="mailto:act@norvaos.co.in" className="text-[#7B5CF0] font-medium font-mono hover:underline">
                    act@norvaos.co.in
                  </a>
                </div>
              </div>
            )}

            {/* =========================================================
                3. CONTACT PAGE / MODAL (Apple Liquid Glass)
                ========================================================= */}
            {activeModal === 'contact' && (
              <div className="space-y-6 relative overflow-hidden">
                {/* Ambient Liquid Glow for Glass Refraction */}
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-[#7B5CF0]/15 via-[#38BDF8]/12 to-transparent rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-gradient-to-tr from-[#10B981]/12 via-[#7B5CF0]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                {/* Header Section */}
                <div className="relative z-10 text-left">
                  {/* Apple Liquid Glass Badge */}
                  <div
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/80 text-[#7B5CF0] text-[11.5px] font-mono tracking-wider uppercase mb-3 shadow-2xs select-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(248, 246, 254, 0.55) 100%)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.95)',
                    }}
                  >
                    <Mail size={12} className="text-[#7B5CF0]" />
                    <span>Direct Team Channel · Founders &amp; Engineering</span>
                  </div>

                  <h2
                    className="text-[28px] sm:text-[34px] font-medium text-[#17171C] tracking-tight leading-[1.12]"
                    style={{ fontFamily: "'Switzer', sans-serif", fontWeight: 500 }}
                  >
                    Get in touch with NORVA.
                  </h2>
                  <p className="text-[14.5px] text-[#5A5A66] mt-2 leading-relaxed max-w-xl">
                    Have questions about the beta, Windows builds, security audits, or enterprise deployment? Write to us directly at <a href="mailto:act@norvaos.co.in" className="font-mono text-[#7B5CF0] font-medium hover:underline">act@norvaos.co.in</a> or use the form below. We respond within 24 hours.
                  </p>
                </div>

                {/* Form or Success State */}
                {contactSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-[28px] text-left space-y-3 relative overflow-hidden shadow-xl border border-[#A7E5AE]/80"
                    style={{
                      background: 'linear-gradient(135deg, rgba(232, 248, 234, 0.92) 0%, rgba(255, 255, 255, 0.95) 100%)',
                      backdropFilter: 'blur(28px) saturate(190%)',
                      WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                      boxShadow: '0 20px 50px -12px rgba(16, 185, 129, 0.22), inset 0 2px 2px 0 rgba(255, 255, 255, 1)',
                    }}
                  >
                    <div className="flex items-center gap-2.5 text-[#1AAB29] font-medium text-lg">
                      <CheckCircle2 size={22} />
                      <span>Message received!</span>
                    </div>
                    <p className="text-[14.5px] text-[#2E7D32] leading-relaxed">
                      Thank you for reaching out. The NORVA team will review your inquiry and follow up directly at <strong>{contactEmail}</strong> within 24 hours.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setContactSubmitted(false)
                          setContactMessage('')
                        }}
                        className="text-xs font-mono uppercase tracking-wider text-[#1AAB29] hover:underline cursor-pointer"
                      >
                        ← Send another message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="text-left space-y-1">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-[#5A5A66] font-medium pl-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Alex Mercer"
                          className="w-full rounded-[18px] px-4 py-3 text-sm text-[#17171C] placeholder-[#8E8E98] outline-none transition-all focus:border-[#7B5CF0] focus:ring-2 focus:ring-[#7B5CF0]/20"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 246, 254, 0.65) 100%)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255, 255, 255, 0.95)',
                            boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), 0 2px 8px -2px rgba(23, 23, 28, 0.04)',
                          }}
                        />
                      </div>

                      <div className="text-left space-y-1">
                        <label className="text-[11px] font-mono uppercase tracking-wider text-[#5A5A66] font-medium pl-1">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="alex@company.com"
                          className="w-full rounded-[18px] px-4 py-3 text-sm text-[#17171C] placeholder-[#8E8E98] outline-none transition-all focus:border-[#7B5CF0] focus:ring-2 focus:ring-[#7B5CF0]/20"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 246, 254, 0.65) 100%)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255, 255, 255, 0.95)',
                            boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), 0 2px 8px -2px rgba(23, 23, 28, 0.04)',
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-left space-y-1">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#5A5A66] font-medium pl-1">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Tell us what you're working on or what you'd like to automate with NORVA..."
                        className="w-full rounded-[20px] p-4 text-sm text-[#17171C] placeholder-[#8E8E98] outline-none transition-all focus:border-[#7B5CF0] focus:ring-2 focus:ring-[#7B5CF0]/20 resize-none"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 246, 254, 0.65) 100%)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          border: '1px solid rgba(255, 255, 255, 0.95)',
                          boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), 0 2px 8px -2px rgba(23, 23, 28, 0.04)',
                        }}
                      />
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2 text-xs text-[#8E8E98]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        <span>Direct email: </span>
                        <a
                          href="mailto:act@norvaos.co.in"
                          className="font-mono text-[#7B5CF0] font-medium hover:underline text-[13px]"
                        >
                          act@norvaos.co.in
                        </a>
                      </div>

                      <button
                        type="submit"
                        disabled={contactSubmitting}
                        className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#17171C] hover:bg-black text-white text-sm font-medium transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer shadow-lg shadow-black/15"
                        style={{
                          boxShadow: '0 8px 24px -4px rgba(23, 23, 28, 0.25), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        <Send size={14} className="transition-transform group-hover:translate-x-0.5" />
                        <span>{contactSubmitting ? 'Sending...' : 'Send Message'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default LegalContactModals

