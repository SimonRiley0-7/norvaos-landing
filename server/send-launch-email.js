import dotenv from 'dotenv'
import { getSubscribers } from './db.js'
import { sendLaunchEmail } from './email.js'

dotenv.config()

async function main() {
  console.log('\n====================================================')
  console.log('🌵 NORVA OS — LAUNCH BROADCAST EMAIL SCRIPT')
  console.log('====================================================\n')

  const subscribers = await getSubscribers()
  console.log(`Found ${subscribers.length} total subscribers in database.\n`)

  if (subscribers.length === 0) {
    console.log('No subscribers found on the waitlist yet.')
    process.exit(0)
  }

  const customMessage = process.argv[2] || "The wait is over. NORVA Beta is officially live and ready for download on your Mac."
  const downloadUrl = process.argv[3] || "https://norva.app/download"

  console.log(`Sending launch email with parameters:`)
  console.log(`- Download URL: ${downloadUrl}`)
  console.log(`- Custom Message: "${customMessage}"\n`)

  let successCount = 0
  let failureCount = 0

  for (let i = 0; i < subscribers.length; i++) {
    const sub = subscribers[i]
    const email = typeof sub === 'string' ? sub : sub.email

    console.log(`[${i + 1}/${subscribers.length}] Sending to ${email}...`)
    const result = await sendLaunchEmail(email, customMessage, downloadUrl)

    if (result.success) {
      successCount++
      console.log(`  └─ ✅ Sent (${result.provider || 'ok'})`)
    } else {
      failureCount++
      console.log(`  └─ ❌ Failed: ${result.error}`)
    }

    // Rate-limit pause (200ms) to prevent provider throttling
    await new Promise(r => setTimeout(r, 200))
  }

  console.log('\n====================================================')
  console.log(`🎉 Broadcast completed!`)
  console.log(`- Total Sent: ${successCount}`)
  console.log(`- Total Failed: ${failureCount}`)
  console.log('====================================================\n')
}

main().catch(console.error)
