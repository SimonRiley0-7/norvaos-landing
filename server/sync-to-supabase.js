import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { supabase, isSupabaseConfigured } from './supabase.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DB_FILE = path.join(__dirname, 'data', 'waitlist.json')

async function syncLocalToSupabase() {
  if (!isSupabaseConfigured) {
    console.error('Supabase is not configured in .env')
    return
  }

  if (!fs.existsSync(DB_FILE)) {
    console.log('No local waitlist.json found.')
    return
  }

  const localSubscribers = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
  console.log(`Found ${localSubscribers.length} local subscribers to sync...`)

  let successCount = 0
  let skipCount = 0
  let errorCount = 0

  for (const sub of localSubscribers) {
    const normalized = sub.email.toLowerCase().trim()

    // Check if already in Supabase
    const { data: existing, error: checkError } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', normalized)
      .maybeSingle()

    if (existing) {
      console.log(`- ${normalized}: already in Supabase (skipped)`)
      skipCount++
      continue
    }

    // Insert
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{
        email: normalized,
        status: sub.status || 'active',
        created_at: sub.created_at || new Date().toISOString(),
      }])
      .select()

    if (error) {
      console.error(`x ${normalized} FAILED:`, error.message)
      errorCount++
    } else {
      console.log(`✓ ${normalized} synced to Supabase!`)
      successCount++
    }
  }

  console.log('\n--- Sync Summary ---')
  console.log(`Total: ${localSubscribers.length}`)
  console.log(`Synced: ${successCount}`)
  console.log(`Skipped: ${skipCount}`)
  console.log(`Errors: ${errorCount}`)
}

syncLocalToSupabase().catch(console.error)
