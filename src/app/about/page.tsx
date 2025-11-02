'use client'

import { Heart, BookOpen, Users, Sparkles, Calendar, MapPin } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white py-20" style={{
        backgroundImage: 'url(/weekendinthecity1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <Heart className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl font-lovelo font-black mb-4">ABOUT US</h1>
            <p className="text-xl text-gray-100">
              Weekend in the City is a new event concept in Munich designed to bring together young locals and internationals through curated social experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-center">
              <p>
                Weekend in the City is a space where Munich internationals and newcomers can feel part of the city by exploring new hobbies and events in a welcoming community! What started from a book club is today a diverse group of over 100+ men and women in the city. From yoga flows to crafty nights to themed parties, each event is designed to bring people closer and make Munich feel a little more like home:)
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
                Members&apos; dinners and themed parties tailored for closer connection and tailored to our community requests and wishes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Our Community</h2>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-700 max-w-4xl mx-auto">
            <div className="flex items-center">
              <Users className="h-6 w-6 mr-2 text-red-600" />
              <span className="text-xl font-semibold">20+ Members</span>
            </div>
            <div className="flex items-center">
              <Sparkles className="h-6 w-6 mr-2 text-red-600" />
              <span className="text-xl font-semibold">Curated Experiences</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-red-600" />
              <span className="text-xl font-semibold">Monthly Events</span>
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

    </div>
  )
}

