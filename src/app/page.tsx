'use client'

import { Button } from '@/components/ui/button'
import { EventCard } from '@/components/ui/event-card'
import { BookOpen, Heart, Users, Calendar, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

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

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('created_at', { ascending: true })

        if (error) {
          throw error
        }

        // Transform the data to match the Event interface
        const transformedEvents: Event[] = (data || []).map(event => ({
          id: event.id.toString(),
          title: event.title,
          description: event.description,
          date: event.date,
          time: event.time,
          location: event.location,
          price: event.price,
          capacity: event.capacity,
          sold: event.sold,
          image: event.image,
          category: event.category
        }))

        setEvents(transformedEvents)
        setError(null)
      } catch (err) {
        console.error('Error fetching events:', err)
        setError('Failed to load events. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200/30 to-gray-300/30"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Main Headline */}
          <div className="text-center mb-16">
            <h1 className="text-6xl lg:text-8xl font-bold text-red-600">
              WEEKEND IN THE CITY
            </h1>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-xl text-gray-600 font-medium">
                  Your Munich weekend starts here
                </p>
                <p className="text-lg text-gray-500 leading-relaxed">
                  Join our vibrant community of book lovers for literary adventures, 
                  meaningful discussions, and unforgettable experiences. Discover new 
                  stories, make lasting friendships, and celebrate the joy of reading together.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/events">
                  <Button variant="default" size="lg" className="group">
                    <Calendar className="mr-2 h-5 w-5" />
                    View Upcoming Events
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  <Heart className="mr-2 h-5 w-5" />
                  Join Our Club
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span>200+ Members</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>50+ Books Read</span>
                </div>
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span>Monthly Events</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-sans font-bold text-4xl lg:text-5xl text-gray-700 mb-4">
              Coming up
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join a community that makes Munich feel like home. Connect with like-minded women 
              through meaningful experiences and lasting friendships.
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700"></div>
              <p className="mt-4 text-gray-600">Loading events...</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Events Grid */}
          {!isLoading && !error && events.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {events.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event}
                  />
                ))}
              </div>

              <div className="text-center">
                <Link href="/events">
                  <Button variant="outline" size="lg">
                    View All Events
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </>
          )}

          {/* No Events State */}
          {!isLoading && !error && events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No events available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-r from-rose-50 to-lavender-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-sans font-bold text-4xl lg:text-5xl text-gray-700">
                Why Join Our Club?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Meaningful Connections</h3>
                    <p className="text-gray-600">Build lasting friendships with like-minded women who share your passion for literature.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Diverse Reading</h3>
                    <p className="text-gray-600">Explore a wide range of genres and discover new authors through our curated book selections.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Unique Experiences</h3>
                    <p className="text-gray-600">Enjoy author meet-and-greets, literary brunches, and exclusive book launches in Munich&apos;s finest venues.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-xl">Join 200+ Book Lovers</h3>
                  <p className="text-gray-600">
                    Our community is growing every month. Be part of Munich&apos;s most vibrant 
                    literary community and make friends for life.
                  </p>
                  <Button variant="default" size="lg" className="w-full">
                    <Heart className="mr-2 h-5 w-5" />
                    Become a Member
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
