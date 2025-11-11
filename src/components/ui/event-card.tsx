'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin, Users, X, User, Mail, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  price: number
  capacity: number
  sold: number
  image: string
  category: string
}

interface EventCardProps {
  event: Event
  onBookNow?: (eventId: string) => void
}

const EVENT_CARD_OPEN = 'event-card-open'

export function EventCard({ event, onBookNow }: EventCardProps) {
  const isSoldOut = event.sold >= event.capacity
  const [isExpanded, setIsExpanded] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardSize, setCardSize] = useState<{ width: number; height: number } | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const openExpanded = () => {
    if (cardRef.current) {
      const { width, height } = cardRef.current.getBoundingClientRect()
      setCardSize({ width, height })
    }
    window.dispatchEvent(new CustomEvent(EVENT_CARD_OPEN, { detail: event.id }))
    setIsExpanded(true)
    setError(null)
  }

  const handleBookClick = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (onBookNow) {
      onBookNow(event.id)
    } else {
      openExpanded()
    }
  }

  const handleCardClick = () => {
    if (!isExpanded) {
      openExpanded()
    }
  }

  const handleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(false)
    setError(null)
    setIsLoading(false)
    scrollRef.current?.scrollTo({ top: 0 })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
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

  useEffect(() => {
    if (!isExpanded) {
      return
    }

    const handleOutsideClick = (evt: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(evt.target as Node)) {
        setIsExpanded(false)
        setError(null)
        setIsLoading(false)
        scrollRef.current?.scrollTo({ top: 0 })
      }
    }

    const handleOpen = (evt: Event) => {
      const custom = evt as CustomEvent<string>
      if (custom.detail !== event.id) {
        setIsExpanded(false)
        setError(null)
        setIsLoading(false)
        scrollRef.current?.scrollTo({ top: 0 })
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
    window.addEventListener(EVENT_CARD_OPEN, handleOpen)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
      window.removeEventListener(EVENT_CARD_OPEN, handleOpen)
    }
  }, [isExpanded, event.id])

  useEffect(() => {
    if (isExpanded) {
      scrollRef.current?.scrollTo({ top: 0 })
    }
  }, [isExpanded])

  return (
    <Card 
      className={`relative z-0 mb-4 transition-all duration-300 ${isExpanded ? 'shadow-2xl overflow-visible' : 'cursor-pointer transform hover:-translate-y-1 hover:shadow-2xl overflow-hidden'}`}
      onClick={handleCardClick}
      style={{ isolation: 'isolate', height: isExpanded && cardSize ? `${cardSize.height}px` : undefined }}
      ref={cardRef}
    >
      {isExpanded ? (
        <div className="flex h-full flex-col gap-4 p-6">
          <div className="flex items-start justify-end">
            <button
              onClick={handleCollapse}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              aria-label="Close booking"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="booking-scroll flex-1 overflow-y-auto space-y-5 px-3 md:px-4">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900">Complete Your Booking</h2>
              <p className="text-base font-semibold text-gray-700">{event.title}</p>
              {event.description && (
                <p className="text-sm leading-relaxed text-gray-600">
                  {event.description}
                </p>
              )}
              <div className="text-sm text-gray-500">
                <p>{event.date} · {event.time}</p>
                {event.location && <p className="mt-1">{event.location}</p>}
              </div>
              <p className="text-base font-semibold text-gray-800">
                {event.price === 0 ? 'FREE' : `€${event.price}`}
              </p>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 pb-4">
              <div>
                <label htmlFor={`name-${event.id}`} className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 transition-colors duration-200" />
                  <input
                    type="text"
                    id={`name-${event.id}`}
                    required
                    disabled={isLoading}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:ring-offset-white disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-gray-300 transition-shadow"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>
  
              <div>
                <label htmlFor={`email-${event.id}`} className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 transition-colors duration-200" />
                  <input
                    type="email"
                    id={`email-${event.id}`}
                    required
                    disabled={isLoading}
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:ring-offset-white disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-gray-300 transition-shadow"
                    placeholder="jane@example.com"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Your ticket will be sent to this email
                </p>
              </div>

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
                    Proceed to Payment {event.price === 0 ? '(FREE)' : `(€${event.price})`}
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-gray-500">
                You&apos;ll be redirected to Stripe to complete your payment securely.
                Apple Pay and Google Pay available on supported devices.
              </p>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="relative overflow-hidden rounded-t-2xl">
            <Image
              src={event.image}
              alt={event.title}
              width={400}
              height={250}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="rounded-full bg-gradient-to-r from-gray-600 to-gray-700 px-3 py-1 text-xs font-medium text-white">
                {event.category}
              </span>
            </div>
            <div className="absolute bottom-4 right-4">
              <span className="rounded-lg bg-white/95 px-4 py-2 text-xl font-bold text-gray-900 shadow-lg backdrop-blur-sm">
                {event.price === 0 ? 'FREE' : `€${event.price}`}
              </span>
            </div>
          </div>

          <CardHeader>
            <CardTitle className="line-clamp-2 text-lg">{event.title}</CardTitle>
            <CardDescription className="line-clamp-2">{event.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="mr-2 h-4 w-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="mr-2 h-4 w-4" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="mr-2 h-4 w-4" />
              <span className={isSoldOut ? 'font-semibold text-red-600' : ''}>
                {event.sold}/{event.capacity} sold
              </span>
            </div>
          </CardContent>

          <CardFooter className="relative z-20">
            <Button 
              variant={isSoldOut ? 'outline' : 'default'} 
              size="sm" 
              className="relative z-20 w-full"
              disabled={isSoldOut}
              onClick={handleBookClick}
            >
              {isSoldOut ? 'Sold Out' : 'Book Now'}
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
