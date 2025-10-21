'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Mail, Calendar, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function BookingSuccess() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      return
    }

    // In a real implementation, you'd verify the session with Stripe
    // For now, we'll just show success
    setTimeout(() => {
      setStatus('success')
    }, 1000)
  }, [sessionId])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600">Confirming your booking...</p>
        </div>
      </div>
    )
  }

  if (status === 'error' || !sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Booking Not Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find your booking. Please contact us if you believe this is an error.
          </p>
          <Link href="/events">
            <Button variant="default" size="lg">
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Booking Confirmed! 🎉
            </h1>

            {/* Message */}
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your booking! Your payment has been processed successfully.
            </p>

            {/* Info Boxes */}
            <div className="space-y-4 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-center text-blue-800">
                  <Mail className="h-5 w-5 mr-2" />
                  <p className="font-medium">
                    A confirmation email with your ticket has been sent to your inbox
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center justify-center text-purple-800">
                  <Calendar className="h-5 w-5 mr-2" />
                  <p className="font-medium">
                    Please bring your confirmation email to the event
                  </p>
                </div>
              </div>
            </div>

            {/* Session ID (for reference) */}
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-500 mb-1">Booking Reference</p>
              <p className="text-sm font-mono text-gray-700 break-all">{sessionId}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/events">
                <Button variant="default" size="lg" className="w-full sm:w-auto">
                  Browse More Events
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center text-gray-600">
            <p className="text-sm">
              Need help? Contact us at{' '}
              <a 
                href="mailto:Weekendinthecity.muc@gmail.com" 
                className="text-red-600 hover:underline"
              >
                Weekendinthecity.muc@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

