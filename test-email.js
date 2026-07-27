import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
dotenv.config()

async function testConfig(host, port, secure) {
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
  try {
    await transporter.verify()
    console.log(`SUCCESS: ${host}:${port} (secure: ${secure})`)
    return true
  } catch (err) {
    console.log(`FAILED: ${host}:${port} (secure: ${secure}) - ${err.message}`)
    return false
  }
}

async function runTests() {
  const configs = [
    { host: 'smtp.titan.email', port: 465, secure: true },
    { host: 'smtp.titan.email', port: 587, secure: false },
    { host: 'smtpout.secureserver.net', port: 465, secure: true },
    { host: 'smtpout.secureserver.net', port: 587, secure: false }
  ]
  for (const c of configs) {
    await testConfig(c.host, c.port, c.secure)
  }
}
runTests()
