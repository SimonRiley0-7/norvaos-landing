import { Resend } from 'resend'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

// Outgoing Email Transporter helper (creates fresh with current .env credentials)
function getTransporter() {
  const smtpHost = process.env.SMTP_HOST || 'smtpout.secureserver.net'
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (smtpUser && smtpPass && !smtpUser.includes('your-email')) {
    return nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: { user: smtpUser, pass: smtpPass },
    })
  }
  return null
}

function getFromAddress() {
  return process.env.FROM_EMAIL || `NORVA <${process.env.SMTP_USER || 'onboarding@resend.dev'}>`
}

/**
 * Welcome confirmation HTML email template
 * Minimalist, monochrome, executive design without loud colors.
 * Header: Norva logo + "Norva OS" on left, Month Year on right.
 * Footer: Clean divider + sender disclaimer + unsubscribe links.
 */
function buildWelcomeHTML(email) {
  const currentMonthYear = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to NORVA Beta</title>
      <style>
        body {
          margin: 0;
          padding: 32px 16px;
          background-color: #FAFAFA;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #111111;
          -webkit-font-smoothing: antialiased;
        }
        .container {
          max-width: 560px;
          margin: 0 auto;
          background: #FFFFFF;
          border: 1px solid #EAEAEA;
          border-radius: 12px;
          padding: 36px 32px;
          box-sizing: border-box;
        }
        .header-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 28px;
          padding-bottom: 16px;
          border-bottom: 1px solid #EAEAEA;
        }
        .logo-td {
          vertical-align: middle;
          text-align: left;
        }
        .date-td {
          vertical-align: middle;
          text-align: right;
          font-size: 13px;
          color: #888888;
          font-weight: 400;
          white-space: nowrap;
        }
        .brand-name {
          font-size: 15px;
          font-weight: 600;
          color: #111111;
          letter-spacing: -0.2px;
          display: inline-block;
          vertical-align: middle;
          margin-left: 8px;
        }
        h1 {
          font-size: 22px;
          font-weight: 600;
          color: #111111;
          margin: 0 0 20px 0;
          letter-spacing: -0.3px;
          line-height: 1.3;
        }
        p {
          font-size: 15px;
          line-height: 1.65;
          color: #2E2E32;
          margin: 0 0 16px 0;
        }
        .email-chip {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 13.5px;
          background: #F4F4F5;
          padding: 2px 7px;
          border-radius: 4px;
          color: #111111;
          border: 1px solid #E4E4E7;
          word-break: break-all;
        }
        .signature {
          margin-top: 24px;
          font-size: 15px;
          line-height: 1.6;
          color: #2E2E32;
        }
        .footer {
          margin-top: 36px;
          padding-top: 20px;
          border-top: 1px solid #EAEAEA;
          font-size: 12px;
          line-height: 1.6;
          color: #71717A;
        }
        .footer a {
          color: #52525B;
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header: Logo + Norva OS (Left) | Month & Year (Right) -->
        <table class="header-table" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td class="logo-td">
              <img
                src="https://raw.githubusercontent.com/SimonRiley0-7/norvaos-landing/master/public/Norva-bot.png"
                alt="Norva Logo"
                width="22"
                height="22"
                style="display: inline-block; vertical-align: middle; width: 22px; height: 22px; border-radius: 5px;"
              />
              <span class="brand-name">Norva OS</span>
            </td>
            <td class="date-td">
              ${currentMonthYear}
            </td>
          </tr>
        </table>

        <!-- Main Body -->
        <h1>Thank you for joining.</h1>

        <p>Hey there,</p>

        <p>
          Have you ever wondered how J.A.R.V.I.S. (minus the holograms) from Avengers would do your everyday work?
          Well, you'll soon be able to try it for yourself right on your machine.
        </p>

        <p>
          Your priority spot for the NORVA Beta is confirmed under
          <span class="email-chip">${email}</span>.
        </p>

        <p>
          We're currently putting the finishing touches on the builds for macOS and Windows.
          As soon as your access cohort opens, we'll send your private download link and access key right here to your inbox.
        </p>

        <p>
          In the meantime, if you have any questions or specific workflows you're excited about, feel free to reply directly to this email — it goes straight to us.
        </p>

        <div class="signature">
          Talk soon,<br><br>
          <strong>Bhumi Chavan &amp; Shivam Wadatkar</strong><br>
          <span style="color: #666666; font-size: 13.5px;">Founders · Norva OS</span><br>
          <span style="font-size: 13px;">
            <a href="mailto:act@norvaos.co.in" style="color: #111111; text-decoration: underline;">act@norvaos.co.in</a> · 
            <a href="https://norvaos.co.in" style="color: #111111; text-decoration: underline;">norvaos.co.in</a>
          </span>
        </div>

        <!-- Footer: Clean monochrome style matching reference image -->
        <div class="footer">
          <p style="margin: 0 0 4px 0; color: #52525B;">
            <strong>Norva OS</strong> · <a href="https://norvaos.co.in">norvaos.co.in</a>
          </p>
          <p style="margin: 0 0 8px 0; color: #71717A;">
            You're getting this because you signed up for the Norva OS beta waitlist.
          </p>
          <p style="margin: 0; color: #71717A;">
            <a href="mailto:act@norvaos.co.in?subject=Unsubscribe">Unsubscribe</a> · 
            <a href="mailto:act@norvaos.co.in?subject=Preferences">Manage email preferences</a>
          </p>
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
        <div class="logo"><img src="https://raw.githubusercontent.com/SimonRiley0-7/norvaos-landing/master/public/Norva-bot.png" alt="NORVA" style="width: 28px; height: 28px; vertical-align: middle; margin-right: 8px; border-radius: 6px;" /> NORVA OS IS LIVE</div>
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
  const subject = "You're on the list · NORVA Beta"
  const html = buildWelcomeHTML(toEmail)
  const transporter = getTransporter()
  const fromAddress = getFromAddress()

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: fromAddress,
        to: toEmail,
        subject,
        html,
      })
      console.log(`[EMAIL WELCOME] Sent via SMTP to ${toEmail} (ID: ${info.messageId})`)
      return { success: true, provider: 'smtp', id: info.messageId }
    } catch (err) {
      console.error('[EMAIL ERROR SMTP]:', err)
    }
  }

  if (resend) {
    try {
      const data = await resend.emails.send({
        from: fromAddress,
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

  console.log(`[EMAIL SIMULATED] Welcome email queued for ${toEmail}. Set SMTP_USER and SMTP_PASS in .env to send real emails.`)
  return { success: true, provider: 'simulated' }
}

/**
 * Send launch broadcast email to a single user
 */
export async function sendLaunchEmail(toEmail, customMessage, downloadUrl) {
  const subject = "🚀 NORVA OS Beta is Live — Download Now!"
  const html = buildLaunchHTML(toEmail, customMessage, downloadUrl)
  const transporter = getTransporter()
  const fromAddress = getFromAddress()

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: fromAddress,
        to: toEmail,
        subject,
        html,
      })
      return { success: true, provider: 'smtp', id: info.messageId }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  if (resend) {
    try {
      const data = await resend.emails.send({
        from: fromAddress,
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
