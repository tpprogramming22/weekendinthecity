import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET() {
  try {
    // Try to retrieve the Stripe account to verify connection
    const account = await stripe.accounts.retrieve()
    
    return NextResponse.json({
      success: true,
      message: 'Stripe connection successful! ✅',
      account: {
        id: account.id,
        email: account.email,
        country: account.country,
        charges_enabled: account.charges_enabled,
      }
    })
  } catch (error) {
    console.error('Stripe connection error:', error)
    
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      error: true
    }, { status: 500 })
  }
}

