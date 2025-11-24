import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from('events')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching events:', error)
      return NextResponse.json(
        { error: 'Failed to fetch events' },
        { status: 500 }
      )
    }

    // Transform the data to match the Event interface
    const transformedEvents = (data || []).map(event => ({
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

    return NextResponse.json({ events: transformedEvents })
  } catch (error) {
    console.error('Error in events API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

