import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import { resend } from '@/lib/resend'
import { getBookingConfirmationHTML, getBookingConfirmationText } from '@/lib/email-templates'
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
            // Generate email HTML and text
            const emailHtml = getBookingConfirmationHTML({
              customerName: fullBooking.customer_name,
              eventTitle: fullEvent.title,
              eventDate: fullEvent.date,
              eventTime: fullEvent.time,
              eventLocation: fullEvent.location,
              amountPaid: fullBooking.amount_paid,
              bookingId: fullBooking.id,
            })

            const emailText = getBookingConfirmationText({
              customerName: fullBooking.customer_name,
              eventTitle: fullEvent.title,
              eventDate: fullEvent.date,
              eventTime: fullEvent.time,
              eventLocation: fullEvent.location,
              amountPaid: fullBooking.amount_paid,
              bookingId: fullBooking.id,
            })

            // Send confirmation email to customer
            await resend.emails.send({
              from: 'Weekend in the City <noreply@weekendinthecity.com>',
              to: fullBooking.customer_email,
              subject: `Booking Confirmed: ${fullEvent.title}`,
              html: emailHtml,
              text: emailText,
            })

            console.log(`📧 Confirmation email sent to ${fullBooking.customer_email}`)

            // Send notification email to Weekendinthecity.muc@gmail.com
            const notificationHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Booking Notification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
      New Booking Notification
    </h2>
    
    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #333;">Event Details</h3>
      <p style="margin: 10px 0;"><strong>Event:</strong> ${fullEvent.title}</p>
      <p style="margin: 10px 0;"><strong>Date:</strong> ${fullEvent.date}</p>
      <p style="margin: 10px 0;"><strong>Time:</strong> ${fullEvent.time}</p>
      <p style="margin: 10px 0;"><strong>Location:</strong> ${fullEvent.location}</p>
      <p style="margin: 10px 0;"><strong>Price:</strong> €${fullBooking.amount_paid.toFixed(2)}</p>
    </div>
    
    <div style="background-color: #ffffff; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #333;">Customer Details</h3>
      <p style="margin: 10px 0;"><strong>Name:</strong> ${fullBooking.customer_name}</p>
      <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${fullBooking.customer_email}">${fullBooking.customer_email}</a></p>
      <p style="margin: 10px 0;"><strong>Booking ID:</strong> ${fullBooking.id}</p>
      <p style="margin: 10px 0;"><strong>Booking Status:</strong> ${fullBooking.booking_status}</p>
    </div>
    
    <div style="background-color: #eff6ff; border-radius: 8px; padding: 15px; margin: 20px 0;">
      <p style="margin: 0; color: #1e40af; font-size: 14px;">
        <strong>Event Capacity:</strong> ${fullEvent.sold}/${fullEvent.capacity} tickets sold
      </p>
    </div>
    
    <p style="color: #666; font-size: 12px; margin-top: 30px;">
      This is an automated notification from Weekend in the City booking system.
    </p>
  </div>
</body>
</html>
            `.trim()

            const notificationText = `
New Booking Notification

Event Details:
- Event: ${fullEvent.title}
- Date: ${fullEvent.date}
- Time: ${fullEvent.time}
- Location: ${fullEvent.location}
- Price: €${fullBooking.amount_paid.toFixed(2)}

Customer Details:
- Name: ${fullBooking.customer_name}
- Email: ${fullBooking.customer_email}
- Booking ID: ${fullBooking.id}
- Booking Status: ${fullBooking.booking_status}

Event Capacity: ${fullEvent.sold}/${fullEvent.capacity} tickets sold

---
This is an automated notification from Weekend in the City booking system.
            `.trim()

            await resend.emails.send({
              from: 'Weekend in the City <noreply@weekendinthecity.com>',
              to: 'Weekendinthecity.muc@gmail.com',
              subject: `New Booking: ${fullEvent.title} - ${fullBooking.customer_name}`,
              html: notificationHtml,
              text: notificationText,
            })

            console.log(`📧 Notification email sent to Weekendinthecity.muc@gmail.com`)
          } catch (emailError) {
            console.error('Error sending emails:', emailError)
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

