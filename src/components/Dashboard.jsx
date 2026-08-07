import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NorvaBot } from './CactusSVG'

// ── Simple bar chart component
function BarChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-32" style={{ color: 'rgba(255,255,255,0.2)' }}>
        <span style={{ fontSize: 13, fontFamily: 'monospace' }}>No data yet</span>
      </div>
    )
  }

  const maxVal = Math.max(...data.map(d => (d.mac || 0) + (d.windows || 0)), 1)

  return (
    <div className="flex items-end gap-1.5 w-full" style={{ height: 100 }}>
      {data.map((d, i) => {
        const total = (d.mac || 0) + (d.windows || 0)
        const macH = ((d.mac || 0) / maxVal) * 100
        const winH = ((d.windows || 0) / maxVal) * 100
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1" style={{ minWidth: 0 }}>
            <div className="flex flex-col justify-end w-full" style={{ height: 80, gap: 1 }}>
              {winH > 0 && (
                <div
                  title={`Windows: ${d.windows}`}
                  style={{
                    height: `${winH}%`,
                    background: 'rgba(96,165,250,0.6)',
                    borderRadius: '3px 3px 0 0',
                    minHeight: 3,
                  }}
                />
              )}
              {macH > 0 && (
                <div
                  title={`Mac: ${d.mac}`}
                  style={{
                    height: `${macH}%`,
                    background: 'rgba(123,92,240,0.8)',
                    borderRadius: winH > 0 ? 0 : '3px 3px 0 0',
                    minHeight: 3,
                  }}
                />
              )}
            </div>
            {total > 0 && (
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
                {total}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Stat card
function StatCard({ label, value, sub, color = '#7B5CF0', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16,
        padding: '24px 28px',
        flex: 1,
        minWidth: 140,
      }}
    >
      <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 12 }}>
        {label}
      </div>
      <div style={{ fontSize: 42, fontWeight: 300, color, lineHeight: 1, fontFamily: 'serif', marginBottom: 6 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
          {sub}
        </div>
      )}
    </motion.div>
  )
}

// ── Recent download row
function DownloadRow({ item, index }) {
  const isMac = item.platform === 'mac'
  const date = new Date(item.created_at)
  const timeAgo = (() => {
    const diff = (Date.now() - date.getTime()) / 1000
    if (diff < 60) return `${Math.floor(diff)}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  })()

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: isMac ? 'rgba(123,92,240,0.15)' : 'rgba(96,165,250,0.12)',
          border: `1px solid ${isMac ? 'rgba(123,92,240,0.3)' : 'rgba(96,165,250,0.25)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13,
        }}>
          {isMac ? '🍎' : '🪟'}
        </div>
        <div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace' }}>
            {isMac ? 'macOS' : 'Windows'}
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>
            {item.id?.slice(0, 8)}...
          </div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
        {timeAgo}
      </div>
    </motion.div>
  )
}

// ── Login screen
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [shaking, setShaking] = useState(false)

  const DASHBOARD_PASSWORD = 'norva2026'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === DASHBOARD_PASSWORD) {
      onLogin()
    } else {
      setError('Incorrect password')
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <motion.div
        animate={shaking ? { x: [-8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          padding: '40px 48px',
          width: 360,
          textAlign: 'center',
        }}
      >
        <NorvaBot size={36} style={{ margin: '0 auto 20px', opacity: 0.7 }} />
        <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 8 }}>
          NORVA Admin
        </div>
        <div style={{ fontSize: 22, color: '#fff', fontFamily: 'serif', fontWeight: 300, marginBottom: 28 }}>
          Dashboard Access
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError('') }}
            placeholder="Enter password"
            autoFocus
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 10,
              padding: '12px 16px',
              color: '#fff',
              fontFamily: 'monospace',
              fontSize: 14,
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          {error && (
            <div style={{ fontSize: 12, color: 'rgba(239,68,68,0.8)', fontFamily: 'monospace' }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{
              background: '#7B5CF0',
              border: 'none',
              borderRadius: 10,
              padding: '12px',
              color: '#fff',
              fontFamily: 'monospace',
              fontSize: 13,
              cursor: 'pointer',
              letterSpacing: '0.08em',
            }}
          >
            ENTER
          </button>
        </form>
      </motion.div>
    </div>
  )
}

// ── Main Dashboard
export function Dashboard() {
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem('norva_dash') === 'true')
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(null)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stats')
      const data = await res.json()
      setStats(data)
      setLastRefresh(new Date())
    } catch {
      // keep old data if refresh fails
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isAuthed) fetchStats()
  }, [isAuthed, fetchStats])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!isAuthed) return
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [isAuthed, fetchStats])

  const handleLogin = () => {
    sessionStorage.setItem('norva_dash', 'true')
    setIsAuthed(true)
  }

  if (!isAuthed) return <LoginScreen onLogin={handleLogin} />

  const macPct = stats?.totalDownloads > 0
    ? Math.round((stats.macDownloads / stats.totalDownloads) * 100)
    : 0
  const winPct = 100 - macPct

  return (
    <div style={{ minHeight: '100vh', background: '#080808', padding: '40px 32px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <NorvaBot size={28} style={{ opacity: 0.8 }} />
            <div>
              <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                NORVA OS
              </div>
              <div style={{ fontSize: 20, color: '#fff', fontFamily: 'serif', fontWeight: 300 }}>
                Analytics Dashboard
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', align: 'center', gap: 12 }}>
            {lastRefresh && (
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', alignSelf: 'center' }}>
                Updated {lastRefresh.toLocaleTimeString()}
              </div>
            )}
            <button
              onClick={fetchStats}
              disabled={loading}
              style={{
                background: 'rgba(123,92,240,0.12)',
                border: '1px solid rgba(123,92,240,0.25)',
                borderRadius: 8,
                padding: '8px 16px',
                color: '#C4B0FA',
                fontFamily: 'monospace',
                fontSize: 11,
                cursor: loading ? 'default' : 'pointer',
                opacity: loading ? 0.5 : 1,
                letterSpacing: '0.08em',
              }}
            >
              {loading ? 'LOADING...' : '↺ REFRESH'}
            </button>
          </div>
        </motion.div>

        {/* Stat Cards */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
          <StatCard label="Total Downloads" value={stats?.totalDownloads ?? '—'} sub="all platforms" color="#7B5CF0" delay={0} />
          <StatCard label="Mac Downloads" value={stats?.macDownloads ?? '—'} sub={`${macPct}% of total`} color="#C4B0FA" delay={0.05} />
          <StatCard label="Windows Downloads" value={stats?.windowsDownloads ?? '—'} sub={`${winPct}% of total`} color="#60A5FA" delay={0.1} />
          <StatCard label="Waitlist Signups" value={stats?.waitlistCount ?? '—'} sub="verified emails" color="#34D399" delay={0.15} />
        </div>

        {/* Chart + Recent Activity */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16,
              padding: '24px 24px 16px',
            }}
          >
            <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 20 }}>
              Downloads — Last 14 Days
            </div>
            <BarChart data={stats?.dailyDownloads} />
            <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(123,92,240,0.8)' }} />
                <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>macOS</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(96,165,250,0.6)' }} />
                <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>Windows</span>
              </div>
            </div>
          </motion.div>

          {/* Platform breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16,
              padding: '24px',
            }}
          >
            <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 20 }}>
              Platform Breakdown
            </div>

            {/* Mac bar */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace' }}>🍎 macOS</span>
                <span style={{ fontSize: 13, color: '#C4B0FA', fontFamily: 'monospace' }}>{macPct}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${macPct}%` }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, #7B5CF0, #C4B0FA)', borderRadius: 3 }}
                />
              </div>
            </div>

            {/* Windows bar */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace' }}>🪟 Windows</span>
                <span style={{ fontSize: 13, color: '#60A5FA', fontFamily: 'monospace' }}>{winPct}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${winPct}%` }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, #3B82F6, #60A5FA)', borderRadius: 3 }}
                />
              </div>
            </div>

            {/* Conversion ratio */}
            <div style={{
              background: 'rgba(123,92,240,0.06)',
              border: '1px solid rgba(123,92,240,0.12)',
              borderRadius: 10,
              padding: '14px 16px',
            }}>
              <div style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                Download / Waitlist Ratio
              </div>
              <div style={{ fontSize: 22, color: '#C4B0FA', fontFamily: 'monospace' }}>
                {stats?.waitlistCount > 0
                  ? `${Math.round((stats.totalDownloads / stats.waitlistCount) * 100)}%`
                  : '—'
                }
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Downloads */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
            padding: '24px',
          }}
        >
          <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 16 }}>
            Recent Downloads
          </div>
          {!stats?.recentDownloads || stats.recentDownloads.length === 0 ? (
            <div style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', fontSize: 13, padding: '20px 0', textAlign: 'center' }}>
              No downloads recorded yet
            </div>
          ) : (
            stats.recentDownloads.map((item, i) => (
              <DownloadRow key={item.id} item={item} index={i} />
            ))
          )}
        </motion.div>

        {/* Footer */}
        <div style={{ marginTop: 32, textAlign: 'center', fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.08em' }}>
          NORVA OS · Admin Dashboard · Not publicly linked
        </div>
      </div>
    </div>
  )
}
