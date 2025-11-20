import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { eventId, customerName, customerEmail, referralName } = await request.json()

    // Validate input
    if (!eventId || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: eventId, customerName, customerEmail' },
        { status: 400 }
      )
    }

    // Fetch event from database
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single()

    if (eventError || !event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    // Check if event is sold out
    if (event.sold >= event.capacity) {
      return NextResponse.json(
        { error: 'Event is sold out' },
        { status: 400 }
      )
    }

    // Create a pending booking first
    const bookingData: any = {
      event_id: eventId,
      customer_name: customerName,
      customer_email: customerEmail,
      amount_paid: event.price,
      booking_status: 'pending'
    }
    
    // Add referral name if provided (will only be saved if column exists)
    if (referralName) {
      bookingData.referral_name = referralName
    }
    
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single()

    if (bookingError || !booking) {
      console.error('Booking creation error:', bookingError)
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      )
    }

    // Get the app URL for redirects
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Card payments (Apple Pay & Google Pay show automatically on supported devices)
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: event.title,
              description: `${event.date} at ${event.time} - ${event.location}`,
              images: [event.image],
            },
            unit_amount: Math.round(event.price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: customerEmail,
      allow_promotion_codes: true, // Enable discount code field on checkout page
      success_url: `${appUrl}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/events?canceled=true`,
      metadata: {
        event_id: eventId.toString(),
        booking_id: booking.id,
        customer_name: customerName,
        event_title: event.title,
        ...(referralName && { referral_name: referralName }),
      },
    })

    // Update booking with Stripe session ID
    await supabase
      .from('bookings')
      .update({ stripe_session_id: session.id })
      .eq('id', booking.id)

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      bookingId: booking.id
    })

  } catch (error) {
    console.error('Checkout session creation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

