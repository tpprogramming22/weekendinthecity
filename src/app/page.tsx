'use client'

import { Button } from '@/components/ui/button'
import { EventCard } from '@/components/ui/event-card'
import { BookOpen, Heart, Users, Calendar, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Mock data for featured events
const featuredEvents = [
  {
    id: '1',
    title: 'Spring Book Club Meetup',
    description: 'Join us for an intimate discussion of "The Seven Husbands of Evelyn Hugo" by Taylor Jenkins Reid. Wine and light refreshments included.',
    date: 'March 15, 2024',
    time: '7:00 PM',
    location: 'Café Luitpold, Munich',
    price: 25,
    capacity: 20,
    sold: 12,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop&crop=center',
    category: 'Book Discussion'
  },
  {
    id: '2',
    title: 'Literary Brunch & Author Talk',
    description: 'Meet local author Sarah Müller as she discusses her latest novel "Munich Nights". Brunch buffet and signed book included.',
    date: 'March 22, 2024',
    time: '11:00 AM',
    location: 'Hotel Bayerischer Hof, Munich',
    price: 45,
    capacity: 30,
    sold: 8,
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=250&fit=crop&crop=center',
    category: 'Author Event'
  },
  {
    id: '3',
    title: 'Book Swap & Wine Tasting',
    description: 'Bring your favorite books to swap and enjoy a curated wine tasting. Perfect for discovering new reads and making friends.',
    date: 'March 29, 2024',
    time: '6:30 PM',
    location: 'Weinhandlung am Viktualienmarkt',
    price: 35,
    capacity: 25,
    sold: 18,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop&crop=center',
    category: 'Social Event'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200/30 to-gray-300/30"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="relative h-24 w-24 lg:h-32 lg:w-32">
                    <Image
                      src="/weekendinthecity.png"
                      alt="Weekend in the City Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <p className="text-xl text-gray-600 font-medium">
                  Munich's Premier All-Girls Book Club
                </p>
                <p className="text-lg text-gray-500 leading-relaxed">
                  Join our vibrant community of book lovers for literary adventures, 
                  meaningful discussions, and unforgettable experiences. Discover new 
                  stories, make lasting friendships, and celebrate the joy of reading together.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="default" size="lg" className="group">
                  <Calendar className="mr-2 h-5 w-5" />
                  View Upcoming Events
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="mr-2 h-5 w-5" />
                  Join Our Club
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
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

            <div className="relative">
              <div className="relative z-10">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Next Book Club Meeting</h3>
                        <p className="text-sm text-gray-500">March 15, 2024</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-800">"The Seven Husbands of Evelyn Hugo"</h4>
                      <p className="text-sm text-gray-600">
                        Join us for an intimate discussion of this captivating novel about 
                        love, ambition, and the price of fame.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">€25 per person</span>
                        <span className="text-xs text-gray-500">8 spots left</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full opacity-60 animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full opacity-40 animate-float" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-sans font-bold text-4xl lg:text-5xl text-gray-700 mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join us for our carefully curated events designed to bring book lovers together 
              in beautiful Munich locations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onBookNow={(eventId) => console.log('Book now:', eventId)}
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
                    <p className="text-gray-600">Enjoy author meet-and-greets, literary brunches, and exclusive book launches in Munich's finest venues.</p>
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
                    Our community is growing every month. Be part of Munich's most vibrant 
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
