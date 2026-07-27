import express from 'express'
import cors from 'cors'
import { addSubscriber, getSubscriberCount, getSubscribers, isEmailSubscribed } from './db.js'
import { sendWelcomeEmail } from './email.js'

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

app.listen(PORT, () => {
  console.log(`🚀 NORVA Backend API running at http://localhost:${PORT}`)
})
