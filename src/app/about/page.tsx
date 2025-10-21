'use client'

import { Button } from '@/components/ui/button'
import { Heart, BookOpen, Users, Sparkles, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Heart className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl text-gray-100">
              Building a vibrant community of women in Munich through meaningful connections and shared experiences
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                <span className="font-bold text-red-600">Weekend in the City</span> was born from a simple idea: 
                to create a space where women in Munich could come together, share their love for books, 
                and build lasting friendships.
              </p>
              <p>
                What started as a small book club has grown into a vibrant community of over 200 members, 
                bringing together women from all walks of life who share a passion for literature, culture, 
                and meaningful connections.
              </p>
              <p>
                We believe that the best weekends are spent in good company, exploring new stories, 
                and creating memories that last a lifetime. From intimate book discussions to exciting 
                cultural events, we curate experiences that bring our community closer together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-gradient-to-r from-rose-50 to-lavender-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Book Club Meetings */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Book Club Meetings</h3>
              <p className="text-gray-600">
                Monthly discussions of carefully selected books across diverse genres. Share insights, 
                debate themes, and discover new perspectives in a welcoming environment.
              </p>
            </div>

            {/* Social Events */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Social Events</h3>
              <p className="text-gray-600">
                From wine tastings to creative workshops, we organize diverse events that go beyond 
                books. Connect with members through shared interests and new experiences.
              </p>
            </div>

            {/* Exclusive Experiences */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Exclusive Experiences</h3>
              <p className="text-gray-600">
                Author meet-and-greets, literary brunches, and special events at Munich&apos;s finest 
                venues. Enjoy unique opportunities you won&apos;t find anywhere else.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Our Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-red-600 mb-2">200+</div>
              <div className="text-gray-600 text-lg">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-red-600 mb-2">50+</div>
              <div className="text-gray-600 text-lg">Books Discussed</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-red-600 mb-2">100+</div>
              <div className="text-gray-600 text-lg">Events Hosted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-gradient-to-r from-rose-50 to-lavender-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <MapPin className="h-12 w-12 mx-auto mb-6 text-gray-700" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Based in Munich</h2>
            <p className="text-lg text-gray-700 mb-8">
              All our events take place in beautiful Munich, Germany. We partner with local venues, 
              cafés, and cultural spaces to bring you the best experiences the city has to offer.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Join Our Community</h2>
            <p className="text-lg text-gray-700 mb-8">
              Whether you&apos;re new to Munich or a long-time resident, we&apos;d love to have you 
              join our community. Make friends, discover great books, and create unforgettable memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/events">
                <Button variant="default" size="lg">
                  <Calendar className="mr-2 h-5 w-5" />
                  View Upcoming Events
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  <Heart className="mr-2 h-5 w-5" />
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

