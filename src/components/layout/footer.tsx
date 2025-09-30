import Link from 'next/link'
import Image from 'next/image'
import { Heart, MapPin, Mail, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-10 w-10">
                <Image
                  src="/weekendinthecity.png"
                  alt="Weekend in the City Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-sans text-xl font-bold text-gray-800">
                Weekend in the City
              </span>
            </Link>
            <p className="text-gray-600 text-sm">
              Munich&apos;s premier all-girls book club. Join us for literary adventures, 
              meaningful discussions, and unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                className="text-gray-500 hover:text-gray-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/events" className="block text-gray-600 hover:text-gray-800 text-sm transition-colors">
                Upcoming Events
              </Link>
              <Link href="/about" className="block text-gray-600 hover:text-gray-800 text-sm transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-600 hover:text-gray-800 text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Munich, Germany</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <Mail className="h-4 w-4" />
                <span>hello@weekendinthecity.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Stay Updated</h3>
            <p className="text-gray-600 text-sm">
              Get notified about our latest events and book club meetings.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-rose-400 to-rose-500 text-white text-sm font-medium rounded-r-lg hover:from-rose-500 hover:to-rose-600 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 Weekend in the City. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Heart className="h-4 w-4 text-gray-500" />
            <span className="text-gray-500 text-sm">Made with love in Munich</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
