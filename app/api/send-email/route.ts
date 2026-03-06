import { NextRequest, NextResponse } from "next/server"
import validator from "validator"

interface EmailRequest {
  name: string
  email: string
  message: string
}

const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 254
const MAX_MESSAGE_LENGTH = 5000

export async function POST(request: NextRequest) {
  try {
    const body: EmailRequest = await request.json()

    // Required fields validation
    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
      )
    }

    const name = body.name.trim()
    const email = body.email.trim()
    const message = body.message.trim()

    // Length validation
    if (name.length === 0 || name.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
          { error: "Invalid name length" },
          { status: 400 }
      )
    }

    if (email.length === 0 || email.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json(
          { error: "Invalid email length" },
          { status: 400 }
      )
    }

    if (message.length < 10 || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
          { error: "Message must be between 10 and 5000 characters" },
          { status: 400 }
      )
    }

    // Email validation (ReDoS safe)
    if (!validator.isEmail(email)) {
      return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 }
      )
    }

    // Simulate email sending / logging
    console.log("Email received:", {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    })

    // Simulate async work
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(
        {
          success: true,
          message: "Email received successfully. I will get back to you soon!",
        },
        { status: 200 }
    )
  } catch (error) {
    console.error("Email processing error:", error)

    return NextResponse.json(
        { error: "Failed to process email request" },
        { status: 500 }
    )
  }
}