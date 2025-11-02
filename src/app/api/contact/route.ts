import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

// Simple rate limiting - in production, use Redis or a proper rate limiting library
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_MAX = 3 // Max requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

function getRateLimitKey(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown'
  return ip
}

function checkRateLimit(req: NextRequest): boolean {
  const key = getRateLimitKey(req)
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    if (!checkRateLimit(request)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, subject, message, honeypot } = body

    // Honeypot spam protection - if this field is filled, it's a bot
    if (honeypot) {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Send email using Resend
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
      New Contact Form Submission
    </h2>
    
    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
      <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
    </div>
    
    <div style="background-color: #ffffff; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #333;">Message:</h3>
      <p style="white-space: pre-wrap; margin: 0;">${message}</p>
    </div>
    
    <p style="color: #666; font-size: 12px; margin-top: 30px;">
      This email was sent from the Weekend in the City contact form.
    </p>
  </div>
</body>
</html>
    `

    const emailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This email was sent from the Weekend in the City contact form.
    `.trim()

    await resend.emails.send({
      from: 'Weekend in the City Contact Form <noreply@weekendinthecity.com>',
      to: 'Weekendinthecity.muc@gmail.com',
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: emailHtml,
      text: emailText,
    })

    return NextResponse.json({ success: true, message: 'Message sent successfully' })
  } catch (error) {
    console.error('Error sending contact form email:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

