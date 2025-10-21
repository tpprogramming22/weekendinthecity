import Stripe from 'stripe'

// Server-side Stripe instance (uses secret key)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

