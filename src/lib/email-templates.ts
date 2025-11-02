interface BookingConfirmationEmailProps {
  customerName: string
  eventTitle: string
  eventDate: string
  eventTime: string
  eventLocation: string
  amountPaid: number
  bookingId: string
}

export function getBookingConfirmationHTML({
  customerName,
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  amountPaid,
  bookingId,
}: BookingConfirmationEmailProps): string {
  // Encode booking ID for QR code URL
  const encodedBookingId = encodeURIComponent(bookingId)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedBookingId}`
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #dc2626; font-size: 32px; margin-bottom: 10px;">
        WEEKEND IN THE CITY
      </h1>
      <p style="color: #666; font-size: 16px; margin: 0;">Booking Confirmation</p>
    </div>

    <!-- Main Content -->
    <div style="background-color: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <!-- Greeting -->
      <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
        Hi ${customerName},
      </p>

      <p style="font-size: 16px; color: #333; margin-bottom: 30px;">
        Thank you for your booking! We're excited to see you at <strong>${eventTitle}</strong>.
      </p>

      <!-- Event Details Card -->
      <div style="background-color: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px; padding: 24px; margin-bottom: 30px;">
        <h2 style="font-size: 20px; color: #dc2626; margin-bottom: 16px; margin-top: 0;">
          Event Details
        </h2>
        
        <div style="margin-bottom: 12px;">
          <strong style="color: #333;">Event:</strong>
          <div style="color: #666; margin-top: 4px;">${eventTitle}</div>
        </div>

        <div style="margin-bottom: 12px;">
          <strong style="color: #333;">Date:</strong>
          <div style="color: #666; margin-top: 4px;">${eventDate}</div>
        </div>

        <div style="margin-bottom: 12px;">
          <strong style="color: #333;">Time:</strong>
          <div style="color: #666; margin-top: 4px;">${eventTime}</div>
        </div>

        <div style="margin-bottom: 12px;">
          <strong style="color: #333;">Location:</strong>
          <div style="color: #666; margin-top: 4px;">${eventLocation}</div>
        </div>

        <div style="margin-bottom: 0;">
          <strong style="color: #333;">Amount Paid:</strong>
          <div style="color: #666; margin-top: 4px;">€${amountPaid.toFixed(2)}</div>
        </div>
      </div>

      <!-- Booking Reference with QR Code -->
      <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin-bottom: 30px;">
        <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 200px;">
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #991b1b;">
              <strong>Booking Reference:</strong> ${bookingId}
            </p>
            <p style="margin: 0; font-size: 12px; color: #991b1b;">
              Please save this email or bring this reference number to the event.
            </p>
          </div>
          <div style="text-align: center;">
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #991b1b; font-weight: bold;">Your Ticket QR Code</p>
            <img 
              src="${qrCodeUrl}" 
              alt="Booking QR Code" 
              style="width: 150px; height: 150px; border: 2px solid #dc2626; border-radius: 8px; background-color: white; padding: 8px; display: block; margin: 0 auto;"
            />
            <p style="margin: 8px 0 0 0; font-size: 10px; color: #991b1b; font-style: italic;">
              If the QR code doesn't display, please enable images in your email client
            </p>
          </div>
        </div>
      </div>

      <!-- Important Information -->
      <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin-bottom: 30px;">
        <h3 style="font-size: 16px; color: #1e40af; margin-top: 0; margin-bottom: 12px;">
          📋 Important Information
        </h3>
        <ul style="margin: 0; padding-left: 20px; color: #1e40af; font-size: 14px;">
          <li style="margin-bottom: 8px;">Please arrive 10 minutes before the event starts</li>
          <li style="margin-bottom: 8px;">Bring this confirmation email or your booking reference</li>
          <li style="margin-bottom: 0;">Contact us if you have any questions or need to make changes</li>
        </ul>
      </div>

      <!-- Footer -->
      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center;">
        <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
          Questions? Contact us at 
          <a href="mailto:Weekendinthecity.muc@gmail.com" style="color: #dc2626; text-decoration: none;">
            Weekendinthecity.muc@gmail.com
          </a>
        </p>
        <p style="font-size: 12px; color: #999; margin: 0;">
          © 2025 Weekend in the City | Munich, Germany
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `
}

// Plain text version for email clients that don't support HTML
export function getBookingConfirmationText({
  customerName,
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  amountPaid,
  bookingId,
}: BookingConfirmationEmailProps): string {
  return `
Hi ${customerName},

Thank you for your booking! We're excited to see you at ${eventTitle}.

EVENT DETAILS
-------------
Event: ${eventTitle}
Date: ${eventDate}
Time: ${eventTime}
Location: ${eventLocation}
Amount Paid: €${amountPaid.toFixed(2)}

BOOKING REFERENCE
-----------------
${bookingId}

Please save this email or bring this reference number to the event.

IMPORTANT INFORMATION
--------------------
- Please arrive 10 minutes before the event starts
- Bring this confirmation email or your booking reference
- Contact us if you have any questions or need to make changes

Questions? Contact us at Weekendinthecity.muc@gmail.com

© 2025 Weekend in the City | Munich, Germany
  `.trim()
}

