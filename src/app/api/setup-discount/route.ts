import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

/**
 * API route to set up the Stripe discount coupon and promotion code.
 * This should be called once to create the coupon and promotion code in Stripe.
 * 
 * Coupon: 10 EUR off
 * Promotion Code: BRINGAFRIEND25
 */
export async function POST() {
  try {
    // Check if coupon already exists
    let coupon
    try {
      const coupons = await stripe.coupons.list({ limit: 100 })
      coupon = coupons.data.find(c => c.name === 'BRINGAFRIEND25' || c.id === 'bringafriend25')
    } catch (error) {
      console.log('Error checking existing coupons:', error)
    }

    // Create coupon if it doesn't exist
    if (!coupon) {
      coupon = await stripe.coupons.create({
        name: 'BRINGAFRIEND25',
        id: 'bringafriend25', // Optional: set a specific ID
        amount_off: 1000, // 10 EUR in cents
        currency: 'eur',
        duration: 'once', // One-time use per customer
      })
      console.log('✅ Coupon created:', coupon.id)
    } else {
      console.log('ℹ️ Coupon already exists:', coupon.id)
    }

    // Check if promotion code already exists
    let promotionCode
    try {
      const promotionCodes = await stripe.promotionCodes.list({
        limit: 100,
        code: 'BRINGAFRIEND25',
      })
      promotionCode = promotionCodes.data.find(pc => pc.code === 'BRINGAFRIEND25')
    } catch (error) {
      console.log('Error checking existing promotion codes:', error)
    }

    // Create promotion code if it doesn't exist
    if (!promotionCode) {
      promotionCode = await stripe.promotionCodes.create({
        coupon: coupon.id,
        code: 'BRINGAFRIEND25',
        active: true,
      })
      console.log('✅ Promotion code created:', promotionCode.code)
    } else {
      console.log('ℹ️ Promotion code already exists:', promotionCode.code)
    }

    return NextResponse.json({
      success: true,
      message: 'Discount coupon and promotion code set up successfully',
      coupon: {
        id: coupon.id,
        name: coupon.name,
        amount_off: coupon.amount_off,
        currency: coupon.currency,
      },
      promotionCode: {
        id: promotionCode.id,
        code: promotionCode.code,
        active: promotionCode.active,
      },
    })
  } catch (error) {
    console.error('Error setting up discount:', error)
    return NextResponse.json(
      {
        error: 'Failed to set up discount',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

