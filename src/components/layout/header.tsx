'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Heart, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
                  <Link href="/" className="flex items-center">
                    <div className="relative h-12 w-12">
                      <Image
                        src="/weekendinthecity.png"
                        alt="Weekend in the City Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/events" 
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Events
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="default" size="sm">
              <Heart className="mr-2 h-4 w-4" />
              Join Our Club
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
                    <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/events" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button variant="default" size="sm" className="w-full mt-4">
                <Heart className="mr-2 h-4 w-4" />
                Join Our Club
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
