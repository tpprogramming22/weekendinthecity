'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookingModal } from '@/components/ui/booking-modal'
import { Calendar, Clock, MapPin, Users, Heart } from 'lucide-react'
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

export function EventCard({ event, onBookNow }: EventCardProps) {
  const isSoldOut = event.sold >= event.capacity
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBookClick = () => {
    if (onBookNow) {
      onBookNow(event.id)
    } else {
      setIsModalOpen(true)
    }
  }

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-t-2xl">
        <Image
          src={event.image}
          alt={event.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-3 py-1 rounded-full text-xs font-medium">
            {event.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <button className="bg-white/80 hover:bg-white text-gray-600 hover:text-gray-700 p-2 rounded-full transition-all">
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="truncate">{event.location}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span className={isSoldOut ? 'font-semibold text-red-600' : ''}>
              {event.sold}/{event.capacity} sold
            </span>
          </div>
          <div className="font-semibold text-gray-700">
            €{event.price}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          variant={isSoldOut ? "outline" : "default"} 
          size="sm" 
          className="w-full"
          disabled={isSoldOut}
          onClick={handleBookClick}
        >
          {isSoldOut ? 'Sold Out' : 'Book Now'}
        </Button>
      </CardFooter>

      {/* Booking Modal */}
      <BookingModal
        event={event}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Card>
  )
}
