import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NorvaBot } from './CactusSVG'
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react'

export function WaitlistCTA({ theme }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [subscriberCount, setSubscriberCount] = useState(null)

  // Fetch real subscriber count from database on mount
  useEffect(() => {
    fetch('/api/waitlist/count')
      .then(res => res.json())
      .then(data => {
        if (typeof data.count === 'number') setSubscriberCount(data.count)
      })
      .catch(err => console.log('Waitlist count fetch fallback:', err))
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Failed to join waitlist.')
      } else {
        setSubmitted(true)
        setSuccessMsg(data.message || "You're on the list! We'll notify you when NORVA goes live. 🌵")
        if (typeof data.totalCount === 'number') {
          setSubscriberCount(data.totalCount)
        }
      }
    } catch (err) {
      console.error('Waitlist submission error:', err)
      setErrorMsg('Could not connect to server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="waitlist"
      style={{
        margin: '80px 24px',
        borderRadius: '3rem',
        position: 'relative',
        overflow: 'hidden',
        ...(theme === 'dark'
          ? {
              background: 'linear-gradient(135deg, #1A0F3A 0%, #0D0820 50%, #120A30 100%)',
              border: '1px solid rgba(123,92,240,0.25)',
              boxShadow: '0 0 80px rgba(123,92,240,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
            }
          : {
              background: 'linear-gradient(135deg, #EDE9FF 0%, #DDD6FF 50%, #E8E0FF 100%)',
              border: '1px solid rgba(123,92,240,0.25)',
              boxShadow: '0 20px 60px rgba(123,92,240,0.15)',
            }),
      }}
    >
      <style>{`
        @keyframes rotateCTA {
          from { transform: rotate(0deg) scale(1.5); }
          to   { transform: rotate(360deg) scale(1.5); }
        }
      `}</style>

      {/* Rotating radial gradient overlay — both themes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 'inherit',
          background: 'radial-gradient(ellipse at 30% 50%, rgba(123,92,240,0.20) 0%, transparent 65%)',
          animation: 'rotateCTA 20s linear infinite',
        }}
      />

      <div
        className="relative flex flex-col items-center text-center"
        style={{ padding: '80px 48px' }}
      >
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono-jb text-[9px] uppercase tracking-widest rounded-full border px-3.5 py-1 mb-6 inline-flex items-center gap-2"
          style={{
            background: 'var(--purple-subtle)',
            borderColor: 'rgba(123,92,240,0.2)',
            color: 'var(--purple-soft)',
          }}
        >
          <span>Early Access</span>
          {subscriberCount !== null && (
            <>
              <span>·</span>
              <span>{subscriberCount} joined</span>
            </>
          )}
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-instrument text-5xl font-normal leading-tight m-0 mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Your desktop is waiting.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-geist text-xl m-0 mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          Join the waitlist. Be first when beta drops.
        </motion.p>

        {/* Email form */}
        {!submitted ? (
          <div className="w-full flex flex-col items-center gap-3" style={{ maxWidth: 480 }}>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="flex gap-3 w-full"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={loading}
                className="font-mono-jb text-sm flex-1 rounded-full px-6 py-4 glass"
                style={{
                  background: 'var(--bg-glass)',
                  backdropFilter: 'blur(24px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                  border: errorMsg ? '1px solid #EF4444' : '1px solid var(--border-glass)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="shimmer-btn whitespace-nowrap flex items-center justify-center gap-2"
                style={{ minWidth: 140 }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Joining...</span>
                  </>
                ) : (
                  <span>Join Waitlist</span>
                )}
              </button>
            </motion.form>

            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="font-mono-jb text-xs flex items-center gap-1.5"
                  style={{ color: '#F87171' }}
                >
                  <AlertCircle size={14} />
                  <span>{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.3)' }}
            >
              <CheckCircle2 size={24} color="#4ADE80" />
            </div>
            <p
              className="font-instrument italic text-2xl m-0 max-w-md"
              style={{ color: 'var(--purple-soft)' }}
            >
              {successMsg}
            </p>
          </motion.div>
        )}

        {/* Disclaimer */}
        <p
          className="font-mono-jb text-[11px] mt-6 m-0"
          style={{ color: 'var(--text-mono)' }}
        >
          NO SPAM. BETA ACCESS ONLY.
        </p>

        {/* Bouncing cactus */}
        <motion.div
          className="absolute bottom-8 right-8"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
        >
          <NorvaBot size={48} style={{ opacity: 1 }} />
        </motion.div>
      </div>
    </section>
  )
}
