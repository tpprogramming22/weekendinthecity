'use client'

import { useState } from 'react'
import { Button } from './button'
import { X, Loader2, User, Mail } from 'lucide-react'

interface Event {
  id: string
  title: string
  price: number
  date: string
  time: string
}

interface BookingModalProps {
  event: Event
  isOpen: boolean
  onClose: () => void
}

export function BookingModal({ event, isOpen, onClose }: BookingModalProps) {
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Call our API to create a checkout session
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event.id,
          customerName,
          customerEmail,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative">
        {/* Event Image */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-700 p-2 rounded-full transition-all disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Complete Your Booking</h2>
            <p className="text-gray-600 mb-2">{event.title}</p>
            <div className="text-sm text-gray-500">
              <p>{event.date} at {event.time}</p>
              <p className="font-semibold text-gray-700 mt-1">€{event.price}</p>
            </div>
          </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="name"
                required
                disabled={isLoading}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Jane Doe"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                required
                disabled={isLoading}
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="jane@example.com"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Your ticket will be sent to this email
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Proceed to Payment (€{event.price})
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            You&apos;ll be redirected to Stripe to complete your payment securely.
            Apple Pay and Google Pay available on supported devices.
          </p>
        </form>
        </div>
      </div>
    </div>
  )
}

