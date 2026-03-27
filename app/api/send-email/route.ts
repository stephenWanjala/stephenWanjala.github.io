import { NextRequest, NextResponse } from "next/server"
import validator from "validator"
import nodemailer from "nodemailer"

interface EmailRequest {
  name: string
  email: string
  message: string
  turnstileToken: string
}

const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 254
const MAX_MESSAGE_LENGTH = 5000

async function verifyTurnstile(token: string): Promise<boolean> {
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
    }),
  })
  const data = await res.json()
  return data.success === true
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body: EmailRequest = await request.json()

    if (!body?.name || !body?.email || !body?.message || !body?.turnstileToken) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const name = body.name.trim()
    const email = body.email.trim()
    const message = body.message.trim()

    if (name.length === 0 || name.length > MAX_NAME_LENGTH) {
      return NextResponse.json({ error: "Invalid name length" }, { status: 400 })
    }

    if (email.length === 0 || email.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json({ error: "Invalid email length" }, { status: 400 })
    }

    if (message.length < 10 || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: "Message must be between 10 and 5000 characters" },
        { status: 400 }
      )
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const turnstileValid = await verifyTurnstile(body.turnstileToken)
    if (!turnstileValid) {
      return NextResponse.json({ error: "CAPTCHA verification failed" }, { status: 400 })
    }

    const transporter = createTransporter()

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr />
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    return NextResponse.json(
      { success: true, message: "Message sent! I'll get back to you soon." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
