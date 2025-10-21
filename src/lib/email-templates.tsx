interface BookingConfirmationEmailProps {
  customerName: string
  eventTitle: string
  eventDate: string
  eventTime: string
  eventLocation: string
  amountPaid: number
  bookingId: string
}

export function BookingConfirmationEmail({
  customerName,
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  amountPaid,
  bookingId,
}: BookingConfirmationEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#dc2626', fontSize: '32px', marginBottom: '10px' }}>
          WEEKEND IN THE CITY
        </h1>
        <p style={{ color: '#666', fontSize: '16px' }}>Booking Confirmation</p>
      </div>

      {/* Greeting */}
      <p style={{ fontSize: '16px', color: '#333', marginBottom: '20px' }}>
        Hi {customerName},
      </p>

      <p style={{ fontSize: '16px', color: '#333', marginBottom: '30px' }}>
        Thank you for your booking! We're excited to see you at <strong>{eventTitle}</strong>.
      </p>

      {/* Event Details Card */}
      <div style={{ 
        backgroundColor: '#f9fafb', 
        border: '2px solid #e5e7eb', 
        borderRadius: '12px', 
        padding: '24px',
        marginBottom: '30px'
      }}>
        <h2 style={{ fontSize: '20px', color: '#dc2626', marginBottom: '16px', marginTop: '0' }}>
          Event Details
        </h2>
        
        <div style={{ marginBottom: '12px' }}>
          <strong style={{ color: '#333' }}>Event:</strong>
          <div style={{ color: '#666', marginTop: '4px' }}>{eventTitle}</div>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <strong style={{ color: '#333' }}>Date:</strong>
          <div style={{ color: '#666', marginTop: '4px' }}>{eventDate}</div>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <strong style={{ color: '#333' }}>Time:</strong>
          <div style={{ color: '#666', marginTop: '4px' }}>{eventTime}</div>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <strong style={{ color: '#333' }}>Location:</strong>
          <div style={{ color: '#666', marginTop: '4px' }}>{eventLocation}</div>
        </div>

        <div style={{ marginBottom: '0' }}>
          <strong style={{ color: '#333' }}>Amount Paid:</strong>
          <div style={{ color: '#666', marginTop: '4px' }}>€{amountPaid.toFixed(2)}</div>
        </div>
      </div>

      {/* Booking Reference */}
      <div style={{ 
        backgroundColor: '#fef2f2', 
        border: '1px solid #fecaca',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '30px'
      }}>
        <p style={{ margin: '0', fontSize: '14px', color: '#991b1b' }}>
          <strong>Booking Reference:</strong> {bookingId}
        </p>
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#991b1b' }}>
          Please save this email or bring this reference number to the event.
        </p>
      </div>

      {/* Important Information */}
      <div style={{ 
        backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '30px'
      }}>
        <h3 style={{ fontSize: '16px', color: '#1e40af', marginTop: '0', marginBottom: '12px' }}>
          📋 Important Information
        </h3>
        <ul style={{ margin: '0', paddingLeft: '20px', color: '#1e40af', fontSize: '14px' }}>
          <li style={{ marginBottom: '8px' }}>Please arrive 10 minutes before the event starts</li>
          <li style={{ marginBottom: '8px' }}>Bring this confirmation email or your booking reference</li>
          <li style={{ marginBottom: '0' }}>Contact us if you have any questions or need to make changes</li>
        </ul>
      </div>

      {/* Footer */}
      <div style={{ 
        borderTop: '1px solid #e5e7eb', 
        paddingTop: '20px',
        marginTop: '30px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
          Questions? Contact us at{' '}
          <a href="mailto:Weekendinthecity.muc@gmail.com" style={{ color: '#dc2626', textDecoration: 'none' }}>
            Weekendinthecity.muc@gmail.com
          </a>
        </p>
        <p style={{ fontSize: '12px', color: '#999', margin: '0' }}>
          © 2024 Weekend in the City | Munich, Germany
        </p>
      </div>
    </div>
  )
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

© 2024 Weekend in the City | Munich, Germany
  `.trim()
}

