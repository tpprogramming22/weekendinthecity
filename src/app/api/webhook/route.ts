import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import { resend } from '@/lib/resend'
import { BookingConfirmationEmail, getBookingConfirmationText } from '@/lib/email-templates'
import Stripe from 'stripe'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

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

        // Fetch full booking and event details for email
        const { data: fullBooking } = await supabase
          .from('bookings')
          .select('*')
          .eq('id', bookingId)
          .single()

        const { data: fullEvent } = await supabase
          .from('events')
          .select('*')
          .eq('id', eventId)
          .single()

        if (fullBooking && fullEvent) {
          try {
            // Render email template to HTML
            const emailHtml = renderToStaticMarkup(
              createElement(BookingConfirmationEmail, {
                customerName: fullBooking.customer_name,
                eventTitle: fullEvent.title,
                eventDate: fullEvent.date,
                eventTime: fullEvent.time,
                eventLocation: fullEvent.location,
                amountPaid: fullBooking.amount_paid,
                bookingId: fullBooking.id,
              })
            )

            const emailText = getBookingConfirmationText({
              customerName: fullBooking.customer_name,
              eventTitle: fullEvent.title,
              eventDate: fullEvent.date,
              eventTime: fullEvent.time,
              eventLocation: fullEvent.location,
              amountPaid: fullBooking.amount_paid,
              bookingId: fullBooking.id,
            })

            // Send confirmation email
            await resend.emails.send({
              from: 'Weekend in the City <onboarding@resend.dev>', // You'll change this to your verified domain
              to: fullBooking.customer_email,
              subject: `Booking Confirmed: ${fullEvent.title}`,
              html: emailHtml,
              text: emailText,
            })

            console.log(`📧 Confirmation email sent to ${fullBooking.customer_email}`)
          } catch (emailError) {
            console.error('Error sending confirmation email:', emailError)
            // Don't fail the webhook if email fails
          }
        }

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

