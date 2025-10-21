'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { EventCard } from '@/components/ui/event-card'
import { Button } from '@/components/ui/button'
import { Calendar, Filter } from 'lucide-react'

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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [categories, setCategories] = useState<string[]>([])

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
        setFilteredEvents(transformedEvents)

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(transformedEvents.map(event => event.category))
        )
        setCategories(uniqueCategories)

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

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredEvents(events)
    } else {
      setFilteredEvents(events.filter(event => event.category === selectedCategory))
    }
  }, [selectedCategory, events])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Calendar className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl font-bold mb-4">Upcoming Events</h1>
            <p className="text-xl text-gray-100">
              Discover amazing experiences and connect with like-minded women in Munich
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All Events
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-gray-700"></div>
              <p className="mt-4 text-gray-600 text-lg">Loading events...</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="text-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
                <p className="text-red-800 font-medium text-lg">{error}</p>
              </div>
            </div>
          )}

          {/* Events Grid */}
          {!isLoading && !error && filteredEvents.length > 0 && (
            <div>
              <div className="mb-6 text-gray-600">
                Showing <span className="font-semibold">{filteredEvents.length}</span> event{filteredEvents.length !== 1 ? 's' : ''}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event}
                  />
                ))}
              </div>
            </div>
          )}

          {/* No Events State */}
          {!isLoading && !error && filteredEvents.length === 0 && events.length > 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No events found in this category.</p>
              <Button
                variant="outline"
                size="lg"
                className="mt-6"
                onClick={() => setSelectedCategory('all')}
              >
                View All Events
              </Button>
            </div>
          )}

          {/* Completely Empty State */}
          {!isLoading && !error && events.length === 0 && (
            <div className="text-center py-20">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 text-lg">No events available at the moment.</p>
              <p className="text-gray-500 mt-2">Check back soon for exciting new experiences!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

