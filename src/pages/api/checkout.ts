import { NextApiRequest, NextApiResponse } from 'next'
import nookies from 'nookies'
import { stripe } from '../../services/stripe'
import { supabase } from '../../utils/supabaseClient'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const cookies = nookies.get({ req: request })
    const shippingFee = JSON.parse(cookies['@GoRestaurant:shippingFee'])
    const cart = JSON.parse(cookies['@GoRestaurant:cart'])

    const foodToPay = cart.map(
      (food: { stripe: { stripe_food_price: string }; amount: number }) => ({
        price: food.stripe.stripe_food_price,
        quantity: food.amount
      })
    )

    const authRequest = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
      {
        headers: {
          Authorization: `Bearer ${cookies['sb:token']}`,
          APIKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
        }
      }
    )
    let loggedUser = await authRequest.json()

    const stripeCustomerInDatabase = await supabase
      .from('gr_stripe_customers')
      .select('*')
      .eq('id', loggedUser.id)

    let customerId = ''
    if (stripeCustomerInDatabase.data) {
      if (stripeCustomerInDatabase.data.length === 1) {
        customerId = stripeCustomerInDatabase.data[0].stripe_customer_id
      }
    }

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: loggedUser.email
      })
      const insertStripeCustomerInDatabase = await supabase
        .from('gr_stripe_customers')
        .insert([{ id: loggedUser.id, stripe_customer_id: stripeCustomer.id }])
      customerId = stripeCustomer.id
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: foodToPay,
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: `${process.env.STRIPE_SUCCESS_URL}`,
      cancel_url: `${process.env.STRIPE_CANCEL_URL}`,
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: shippingFee.price * 100,
              currency: 'usd'
            },
            display_name: `${shippingFee.distance} km far from the restaurant `
          }
        }
      ]
    })

    nookies.destroy({ res: response }, '@GoRestaurant:cart', { path: '/' })
    return response.status(200).json({ sessionId: stripeCheckoutSession.id })
  } else {
    response.setHeader('Allow', 'POST')
    response.status(405).end('Method not allowed')
  }
}
