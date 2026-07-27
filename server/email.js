import { Resend } from 'resend'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

// Gmail / SMTP Config
const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS

let transporter = null
if (smtpUser && smtpPass && !smtpUser.includes('your-email')) {
  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user: smtpUser, pass: smtpPass },
  })
}

const FROM_ADDRESS = process.env.FROM_EMAIL || `NORVA <${smtpUser || 'onboarding@resend.dev'}>`

/**
 * Welcome confirmation HTML email template
 */
function buildWelcomeHTML(email) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #080808; color: #f0f0f0; margin: 0; padding: 40px 20px; }
        .card { max-width: 560px; margin: 0 auto; background: #121212; border: 1px solid rgba(123, 92, 240, 0.25); border-radius: 24px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.6); }
        .logo { font-family: monospace; font-size: 14px; letter-spacing: 2px; color: #C4B0FA; text-transform: uppercase; margin-bottom: 24px; }
        h1 { font-size: 28px; font-weight: 500; color: #ffffff; margin: 0 0 16px 0; }
        p { font-size: 15px; line-height: 1.6; color: rgba(255, 255, 255, 0.7); margin: 0 0 20px 0; }
        .badge { display: inline-block; background: rgba(123, 92, 240, 0.12); border: 1px solid rgba(123, 92, 240, 0.3); color: #C4B0FA; padding: 6px 16px; border-radius: 999px; font-size: 12px; font-family: monospace; margin-bottom: 24px; }
        .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 13px; color: rgba(255, 255, 255, 0.4); }
        .highlight { color: #7B5CF0; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="logo"><img src="https://raw.githubusercontent.com/SimonRiley0-7/norvaos-landing/master/public/Norva-bot.png" alt="NORVA" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 6px; border-radius: 4px;" /> NORVA OS</div>
        <div class="badge">WAITLIST CONFIRMED</div>
        <h1>You're on the list.</h1>
        <p>Hey there,</p>
        <p>Thanks for joining the NORVA waitlist. We're building autonomous desktop intelligence that runs <span class="highlight">100% locally</span> — zero cloud roundtrips, zero telemetry.</p>
        <p>As soon as the beta is ready for download, you'll get an instant notification and private access link right here at <strong>${email}</strong>.</p>
        <p>Between the two of us — one thinks it, one ships it. Stay tuned!</p>
        <div class="footer">
          Built by Bhumi Chavan & Shivam Wadatkar<br>
          NORVA OS · Autonomous Desktop Intelligence
        </div>
      </div>
    </body>
    </html>
  `
}

/**
 * Launch Announcement HTML email template
 */
export function buildLaunchHTML(recipientEmail, customMessage, downloadUrl) {
  const launchUrl = downloadUrl || 'https://norva.app/download'
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #080808; color: #f0f0f0; margin: 0; padding: 40px 20px; }
        .card { max-width: 560px; margin: 0 auto; background: #121212; border: 1px solid rgba(123, 92, 240, 0.35); border-radius: 24px; padding: 40px; box-shadow: 0 20px 80px rgba(123,92,240,0.2); }
        .logo { font-family: monospace; font-size: 14px; letter-spacing: 2px; color: #C4B0FA; text-transform: uppercase; margin-bottom: 24px; }
        h1 { font-size: 32px; font-weight: 500; color: #ffffff; margin: 0 0 16px 0; }
        p { font-size: 15px; line-height: 1.6; color: rgba(255, 255, 255, 0.75); margin: 0 0 20px 0; }
        .btn { display: inline-block; background: #7B5CF0; color: #ffffff; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 999px; font-size: 15px; margin: 20px 0; box-shadow: 0 0 20px rgba(123,92,240,0.4); }
        .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 13px; color: rgba(255, 255, 255, 0.4); }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="logo"><img src="https://raw.githubusercontent.com/SimonRiley0-7/norvaos-landing/master/public/Norva-bot.png" alt="NORVA" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 6px; border-radius: 4px;" /> NORVA OS IS LIVE</div>
        <h1>NORVA Beta is Here. 🎉</h1>
        <p>Hey!</p>
        <p>${customMessage || "The wait is over. NORVA is officially live and ready for download on your Mac."}</p>
        <div style="text-align: center;">
          <a href="${launchUrl}" class="btn">Download NORVA for macOS</a>
        </div>
        <p>Runs 100% locally. Qwen 1.5B model, LangGraph 5-agent pipeline, mlx-whisper voice control.</p>
        <div class="footer">
          Shipped by Bhumi Chavan & Shivam Wadatkar<br>
          NORVA OS · Autonomous Desktop Intelligence
        </div>
      </div>
    </body>
    </html>
  `
}

/**
 * Send welcome confirmation email to a new waitlist subscriber
 */
export async function sendWelcomeEmail(toEmail) {
  const subject = "You're on the NORVA waitlist 🌵"
  const html = buildWelcomeHTML(toEmail)

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: FROM_ADDRESS,
        to: toEmail,
        subject,
        html,
      })
      console.log(`[EMAIL WELCOME] Sent via Gmail to ${toEmail} (ID: ${info.messageId})`)
      return { success: true, provider: 'gmail', id: info.messageId }
    } catch (err) {
      console.error('[EMAIL ERROR Gmail]:', err)
    }
  }

  if (resend) {
    try {
      const data = await resend.emails.send({
        from: FROM_ADDRESS,
        to: toEmail,
        subject,
        html,
      })
      console.log(`[EMAIL WELCOME] Sent via Resend to ${toEmail} (ID: ${data.id})`)
      return { success: true, provider: 'resend', id: data.id }
    } catch (err) {
      console.error('[EMAIL ERROR Resend]:', err)
    }
  }

  console.log(`[EMAIL SIMULATED] Welcome email queued for ${toEmail}. Set SMTP_USER and SMTP_PASS in .env to send real Gmail emails.`)
  return { success: true, provider: 'simulated' }
}

/**
 * Send launch broadcast email to a single user
 */
export async function sendLaunchEmail(toEmail, customMessage, downloadUrl) {
  const subject = "🚀 NORVA OS Beta is Live — Download Now!"
  const html = buildLaunchHTML(toEmail, customMessage, downloadUrl)

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: FROM_ADDRESS,
        to: toEmail,
        subject,
        html,
      })
      return { success: true, provider: 'gmail', id: info.messageId }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  if (resend) {
    try {
      const data = await resend.emails.send({
        from: FROM_ADDRESS,
        to: toEmail,
        subject,
        html,
      })
      return { success: true, provider: 'resend', id: data.id }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  return { success: false, error: 'No email service configured in .env' }
}
