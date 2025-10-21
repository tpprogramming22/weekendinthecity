import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    // Verify webhook signature
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        console.log('Payment successful for session:', session.id)

        // Get booking ID from metadata
        const bookingId = session.metadata?.booking_id
        const eventId = session.metadata?.event_id

        if (!bookingId || !eventId) {
          console.error('Missing booking_id or event_id in session metadata')
          break
        }

        // Update booking status to confirmed
        const { error: bookingError } = await supabase
          .from('bookings')
          .update({
            booking_status: 'confirmed',
            stripe_payment_intent_id: session.payment_intent as string,
          })
          .eq('id', bookingId)

        if (bookingError) {
          console.error('Error updating booking:', bookingError)
          break
        }

        // Increment the sold count for the event
        const { data: currentEvent, error: fetchError } = await supabase
          .from('events')
          .select('sold')
          .eq('id', eventId)
          .single()

        if (fetchError) {
          console.error('Error fetching event:', fetchError)
          break
        }

        const { error: updateError } = await supabase
          .from('events')
          .update({ sold: currentEvent.sold + 1 })
          .eq('id', eventId)

        if (updateError) {
          console.error('Error updating event sold count:', updateError)
          break
        }

        console.log(`✅ Booking confirmed! Event ${eventId} sold count updated to ${currentEvent.sold + 1}`)

        // TODO: Send confirmation email here (Step 8)
        // We'll add email sending in the next step

        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        const bookingId = session.metadata?.booking_id

        if (bookingId) {
          // Cancel the booking if checkout expired
          await supabase
            .from('bookings')
            .update({ booking_status: 'cancelled' })
            .eq('id', bookingId)

          console.log(`❌ Checkout expired for booking ${bookingId}`)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

