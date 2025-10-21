'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Event {
  id: number
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

export default function TestConnection() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'success' | 'error'>('testing')
  const [connectionMessage, setConnectionMessage] = useState('Testing connection...')
  const [tableStatus, setTableStatus] = useState<'testing' | 'success' | 'error' | 'pending'>('pending')
  const [tableMessage, setTableMessage] = useState('Waiting for connection test...')
  const [dataStatus, setDataStatus] = useState<'testing' | 'success' | 'error' | 'pending'>('pending')
  const [dataMessage, setDataMessage] = useState('Waiting for table test...')
  const [bookingsStatus, setBookingsStatus] = useState<'testing' | 'success' | 'error' | 'pending'>('pending')
  const [bookingsMessage, setBookingsMessage] = useState('Waiting for data test...')
  const [stripeStatus, setStripeStatus] = useState<'testing' | 'success' | 'error' | 'pending'>('pending')
  const [stripeMessage, setStripeMessage] = useState('Waiting for bookings test...')
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    async function runTests() {
      try {
        // Test 1: Basic connection
        const { error } = await supabase.auth.getSession()
        
        if (error) {
          setConnectionStatus('error')
          setConnectionMessage(`Connection failed: ${error.message}`)
          setTableStatus('error')
          setTableMessage('Skipped - connection failed')
          setDataStatus('error')
          setDataMessage('Skipped - connection failed')
          return
        }
        
        setConnectionStatus('success')
        setConnectionMessage('Successfully connected to Supabase! 🎉')
        
        // Test 2: Events table exists
        setTableStatus('testing')
        setTableMessage('Checking events table...')
        
        const { error: tableError } = await supabase
          .from('events')
          .select('*')
          .limit(1)
        
        if (tableError) {
          setTableStatus('error')
          setTableMessage(`Table error: ${tableError.message}`)
          setDataStatus('error')
          setDataMessage('Skipped - table not found')
          return
        }
        
        setTableStatus('success')
        setTableMessage('Events table exists and is queryable! ✅')
        
        // Test 3: Fetch events data
        setDataStatus('testing')
        setDataMessage('Fetching events from database...')
        
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .order('created_at', { ascending: true })
        
        if (eventsError) {
          setDataStatus('error')
          setDataMessage(`Data fetch error: ${eventsError.message}`)
          return
        }
        
        if (!eventsData || eventsData.length === 0) {
          setDataStatus('error')
          setDataMessage('No events found in database. Please insert test data.')
          return
        }
        
        setEvents(eventsData)
        setDataStatus('success')
        setDataMessage(`Successfully fetched ${eventsData.length} events from database! 🎉`)
        
        // Test 4: Bookings table exists
        setBookingsStatus('testing')
        setBookingsMessage('Checking bookings table...')
        
        const { error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .limit(1)
        
        if (bookingsError) {
          setBookingsStatus('error')
          setBookingsMessage(`Bookings table error: ${bookingsError.message}`)
          return
        }
        
        setBookingsStatus('success')
        setBookingsMessage('Bookings table exists and is ready! ✅')
        
        // Test 5: Stripe connection
        setStripeStatus('testing')
        setStripeMessage('Testing Stripe API connection...')
        
        const stripeResponse = await fetch('/api/test-stripe')
        const stripeData = await stripeResponse.json()
        
        if (!stripeData.success) {
          setStripeStatus('error')
          setStripeMessage(`Stripe error: ${stripeData.message}`)
          return
        }
        
        setStripeStatus('success')
        setStripeMessage(`Stripe connected! Account: ${stripeData.account.email || stripeData.account.id} ✅`)
        
      } catch (err) {
        setConnectionStatus('error')
        setConnectionMessage(`Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
    }

    runTests()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Supabase Integration Tests
          </h1>
          
          {/* Test 1: Connection */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Test 1: Database Connection
            </h2>
            <div className={`p-4 rounded-lg ${
              connectionStatus === 'testing' ? 'bg-blue-50 text-blue-800' :
              connectionStatus === 'success' ? 'bg-green-50 text-green-800' :
              'bg-red-50 text-red-800'
            }`}>
              <p className="font-medium">{connectionMessage}</p>
            </div>
          </div>

          {/* Test 2: Events Table */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Test 2: Events Table
            </h2>
            <div className={`p-4 rounded-lg ${
              tableStatus === 'pending' ? 'bg-gray-50 text-gray-600' :
              tableStatus === 'testing' ? 'bg-blue-50 text-blue-800' :
              tableStatus === 'success' ? 'bg-green-50 text-green-800' :
              'bg-red-50 text-red-800'
            }`}>
              <p className="font-medium">{tableMessage}</p>
            </div>
          </div>

          {/* Test 3: Data Retrieval */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Test 3: Fetch Events Data
            </h2>
            <div className={`p-4 rounded-lg ${
              dataStatus === 'pending' ? 'bg-gray-50 text-gray-600' :
              dataStatus === 'testing' ? 'bg-blue-50 text-blue-800' :
              dataStatus === 'success' ? 'bg-green-50 text-green-800' :
              'bg-red-50 text-red-800'
            }`}>
              <p className="font-medium">{dataMessage}</p>
            </div>
            {dataStatus === 'error' && (
              <div className="mt-2 text-sm text-gray-600">
                <p className="font-semibold mb-2">To fix this:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Go to Supabase Dashboard → SQL Editor</li>
                  <li>Run the INSERT SQL query to add test events</li>
                  <li>Refresh this page</li>
                </ul>
              </div>
            )}
          </div>

          {/* Test 4: Bookings Table */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Test 4: Bookings Table
            </h2>
            <div className={`p-4 rounded-lg ${
              bookingsStatus === 'pending' ? 'bg-gray-50 text-gray-600' :
              bookingsStatus === 'testing' ? 'bg-blue-50 text-blue-800' :
              bookingsStatus === 'success' ? 'bg-green-50 text-green-800' :
              'bg-red-50 text-red-800'
            }`}>
              <p className="font-medium">{bookingsMessage}</p>
            </div>
            {bookingsStatus === 'error' && (
              <div className="mt-2 text-sm text-gray-600">
                <p className="font-semibold mb-2">To fix this:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Go to Supabase Dashboard → SQL Editor</li>
                  <li>Run the CREATE TABLE SQL for bookings</li>
                  <li>Refresh this page</li>
                </ul>
              </div>
            )}
          </div>

          {/* Test 5: Stripe Connection */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Test 5: Stripe API Connection
            </h2>
            <div className={`p-4 rounded-lg ${
              stripeStatus === 'pending' ? 'bg-gray-50 text-gray-600' :
              stripeStatus === 'testing' ? 'bg-blue-50 text-blue-800' :
              stripeStatus === 'success' ? 'bg-green-50 text-green-800' :
              'bg-red-50 text-red-800'
            }`}>
              <p className="font-medium">{stripeMessage}</p>
            </div>
            {stripeStatus === 'error' && (
              <div className="mt-2 text-sm text-gray-600">
                <p className="font-semibold mb-2">To fix this:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Check .env.local has STRIPE_SECRET_KEY set</li>
                  <li>Verify the key starts with sk_test_ (test mode)</li>
                  <li>Get your key from Stripe Dashboard → Developers → API keys</li>
                  <li>Restart your dev server after updating .env.local</li>
                </ul>
              </div>
            )}
          </div>

          {/* Summary */}
          {connectionStatus === 'success' && tableStatus === 'success' && dataStatus === 'success' && bookingsStatus === 'success' && stripeStatus === 'success' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-semibold mb-2">✅ All Tests Passed!</p>
              <p className="text-green-700 text-sm">Supabase and Stripe are connected! Ready to build the checkout flow! 🎉</p>
            </div>
          )}
        </div>

        {/* Display Events */}
        {events.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Events Retrieved from Database
            </h2>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-gray-800">{event.title}</h3>
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                      {event.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>📅 {event.date}</div>
                    <div>🕐 {event.time}</div>
                    <div>📍 {event.location}</div>
                    <div>💰 €{event.price}</div>
                    <div>👥 {event.sold}/{event.capacity} sold</div>
                    <div className="text-gray-500">ID: {event.id}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
