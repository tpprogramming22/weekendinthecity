'use client'

import Link from 'next/link'
import { CheckCircle2, ExternalLink } from 'lucide-react'

export default function TestPages() {
  const pages = [
    {
      name: 'Home',
      path: '/',
      description: 'Homepage with hero section and events from Supabase',
      features: ['Dynamic events loading', 'Loading states', 'Error handling']
    },
    {
      name: 'Events',
      path: '/events',
      description: 'Full events listing with category filters',
      features: ['All events displayed', 'Category filtering', 'Event counter']
    },
    {
      name: 'About',
      path: '/about',
      description: 'About the book club and community',
      features: ['Story section', 'What we offer', 'Community stats']
    },
    {
      name: 'Contact',
      path: '/contact',
      description: 'Contact form and information',
      features: ['Working contact form', 'Contact details', 'Quick FAQ']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🧪 Pages Testing Checklist
          </h1>
          <p className="text-gray-600 mb-8">
            Click on each page below to verify it&apos;s working correctly.
          </p>

          <div className="space-y-6">
            {pages.map((page) => (
              <div
                key={page.path}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                      {page.name}
                    </h2>
                    <p className="text-gray-600 mb-3">{page.description}</p>
                    <div className="space-y-1">
                      {page.features.map((feature) => (
                        <div key={feature} className="flex items-center text-sm text-gray-500">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={page.path}
                    target="_blank"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-700 hover:to-red-800 transition-all font-medium"
                  >
                    Test Page
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">✅ Testing Checklist:</h3>
            <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm">
              <li>Click &quot;Test Page&quot; for each page above</li>
              <li>Verify the page loads without errors</li>
              <li>Check that all features are visible and working</li>
              <li>Test responsiveness by resizing your browser</li>
              <li>Navigate between pages using the header menu</li>
            </ul>
          </div>

          <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">🎉 What&apos;s New:</h3>
            <ul className="list-disc list-inside space-y-1 text-green-800 text-sm">
              <li><strong>/events</strong> - Full events listing with category filters</li>
              <li><strong>/about</strong> - Complete about page with community info</li>
              <li><strong>/contact</strong> - Contact form and contact details</li>
              <li>All pages are responsive and match your design system</li>
              <li>All navigation links in header/footer now work</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

