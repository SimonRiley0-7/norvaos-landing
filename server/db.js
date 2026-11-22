import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { supabase, isSupabaseConfigured } from './supabase.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isVercel = Boolean(process.env.VERCEL)
const DATA_DIR = isVercel ? '/tmp/data' : path.join(__dirname, 'data')
const DB_FILE = path.join(DATA_DIR, 'waitlist.json')

// Local JSON storage fallback
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8')
  }
} catch (err) {
  console.warn('[DB] Local filesystem init warning (read-only environment):', err.message)
}

function getLocalSubscribers() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    }
    return []
  } catch {
    return []
  }
}

function saveLocalSubscribers(subscribers) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(subscribers, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error saving local waitlist:', err)
  }
}

export async function isEmailSubscribed(email) {
  const normalized = email.toLowerCase().trim()

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', normalized)
        .maybeSingle()

      if (!error) {
        // Supabase answered successfully
        return !!data
      }
    } catch (err) {
      console.warn('[SUPABASE] Check failed, falling back to local:', err.message)
    }
  }

  const local = getLocalSubscribers()
  return local.some(s => s.email.toLowerCase() === normalized)
}

export async function addSubscriber(email) {
  const normalized = email.toLowerCase().trim()

  // Check duplicate
  const alreadySubscribed = await isEmailSubscribed(normalized)
  if (alreadySubscribed) {
    return { success: false, reason: 'duplicate' }
  }

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .insert([{ email: normalized, status: 'active' }])
        .select()

      if (error) {
        console.error('Supabase insert error:', error.message)
      } else if (data && data.length > 0) {
        const count = await getSubscriberCount()
        return { success: true, entry: data[0], totalCount: count, provider: 'supabase' }
      }
    } catch (err) {
      console.warn('[SUPABASE] Insert failed, falling back to local JSON:', err.message)
    }
  }

  // Fallback to local storage if Supabase is not configured or error
  const local = getLocalSubscribers()
  const newEntry = {
    id: `wl_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    email: normalized,
    created_at: new Date().toISOString(),
    status: 'active',
  }
  local.push(newEntry)
  saveLocalSubscribers(local)

  return { success: true, entry: newEntry, totalCount: local.length, provider: 'local' }
}

export async function getSubscriberCount() {
  if (isSupabaseConfigured) {
    try {
      const { count, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })

      if (!error && typeof count === 'number') {
        return count
      }
    } catch (err) {
      console.warn('[SUPABASE] getSubscriberCount failed, using local count:', err.message)
    }
  }

  return getLocalSubscribers().length
}

export async function getSubscribers() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && Array.isArray(data)) {
        return data
      }
    } catch (err) {
      console.warn('[SUPABASE] getSubscribers failed, using local waitlist.json:', err.message)
    }
  }

  return getLocalSubscribers()
}
