import express from 'express'
import cors from 'cors'
import { addSubscriber, getSubscriberCount, getSubscribers, isEmailSubscribed } from './db.js'
import { sendWelcomeEmail } from './email.js'
import { supabase, isSupabaseConfigured } from './supabase.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'NORVA Waitlist API', timestamp: new Date().toISOString() })
})

// Get current waitlist subscriber count
app.get('/api/waitlist/count', async (req, res) => {
  try {
    const count = await getSubscriberCount()
    res.json({ count })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch count' })
  }
})

// Subscribe to waitlist
app.post('/api/waitlist', async (req, res) => {
  const { email } = req.body

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email address is required.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }

  try {
    const alreadySubscribed = await isEmailSubscribed(email)
    if (alreadySubscribed) {
      return res.status(409).json({
        error: "You're already on the waitlist! We'll notify you as soon as beta drops.",
      })
    }

    const result = await addSubscriber(email)
    if (!result.success) {
      return res.status(500).json({ error: 'Failed to join waitlist. Please try again.' })
    }

    console.log(`[WAITLIST NEW] ${email} joined via ${result.provider}! Total subscribers: ${result.totalCount}`)

    // Trigger welcome email asynchronously
    sendWelcomeEmail(email.trim()).catch(err => console.error('Welcome email trigger error:', err))

    return res.status(201).json({
      success: true,
      message: "You're on the waitlist! We'll notify you through email once NORVA is live.",
      totalCount: result.totalCount,
      provider: result.provider,
    })
  } catch (err) {
    console.error('Waitlist API error:', err)
    return res.status(500).json({ error: 'Server error processing request.' })
  }
})

// Admin endpoint: List all waitlist subscribers
app.get('/api/waitlist/export', async (req, res) => {
  try {
    const subscribers = await getSubscribers()
    res.json({ count: subscribers.length, subscribers })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subscribers' })
  }
})

// Track a download event
app.post('/api/download', async (req, res) => {
  const { platform } = req.body
  if (!platform || !['mac', 'windows'].includes(platform)) {
    return res.status(400).json({ error: 'Invalid platform. Must be mac or windows.' })
  }

  if (!isSupabaseConfigured) {
    console.log(`[DOWNLOAD TRACKED] Platform: ${platform} (local only — Supabase not configured)`)
    return res.status(200).json({ success: true, provider: 'local' })
  }

  try {
    const { error } = await supabase.from('downloads').insert([{ platform }])
    if (error) throw error
    console.log(`[DOWNLOAD TRACKED] Platform: ${platform}`)
    return res.status(201).json({ success: true, provider: 'supabase' })
  } catch (err) {
    console.error('[DOWNLOAD TRACK ERROR]', err)
    return res.status(500).json({ error: 'Failed to track download.' })
  }
})

// Dashboard stats endpoint
app.get('/api/stats', async (req, res) => {
  try {
    const waitlistCount = await getSubscriberCount()
    const allSubscribers = await getSubscribers()
    const recentWaitlist = allSubscribers.slice(0, 50)

    let macDownloads = 0
    let windowsDownloads = 0
    let recentDownloads = []
    let dailyDownloads = []

    if (isSupabaseConfigured) {
      try {
        const { data: platformData, error: platformError } = await supabase
          .from('downloads')
          .select('platform')

        if (!platformError && platformData) {
          macDownloads = platformData.filter(d => d.platform === 'mac').length
          windowsDownloads = platformData.filter(d => d.platform === 'windows').length
        }

        // Recent 10 downloads
        const { data: recData, error: recError } = await supabase
          .from('downloads')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10)

        if (!recError && recData) {
          recentDownloads = recData
        }

        // Daily download counts for last 14 days
        const { data: dailyData, error: dailyError } = await supabase
          .from('downloads')
          .select('created_at, platform')
          .gte('created_at', new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString())
          .order('created_at', { ascending: true })

        if (!dailyError && dailyData) {
          const dailyMap = {}
          dailyData.forEach(d => {
            const date = new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            if (!dailyMap[date]) dailyMap[date] = { date, mac: 0, windows: 0 }
            dailyMap[date][d.platform]++
          })
          dailyDownloads = Object.values(dailyMap)
        }
      } catch (sbErr) {
        console.warn('[SUPABASE PAUSED/OFFLINE] Downloads query skipped, serving waitlist:', sbErr.message)
      }
    }

    return res.json({
      waitlistCount,
      recentWaitlist,
      totalDownloads: macDownloads + windowsDownloads,
      macDownloads,
      windowsDownloads,
      recentDownloads,
      dailyDownloads,
      supabaseStatus: isSupabaseConfigured ? 'configured' : 'unconfigured',
    })
  } catch (err) {
    console.error('[STATS ERROR]', err)
    return res.status(500).json({ error: 'Failed to fetch stats.' })
  }
})

const server = app.listen(PORT, () => {
  console.log(`🚀 NORVA Backend API running at http://localhost:${PORT}`)
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`ℹ️ Port ${PORT} already active.`)
  } else {
    console.error('Server error:', err)
  }
})
