/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import { Readable } from 'stream'
import Stripe from 'stripe'
import { stripe } from '../../services/stripe'
import {
  createPaymentIntent,
  updatePaymentIntent
} from './_lib/managePaymentIntent'

async function buffer(readable: Readable) {
  const chunks = []

  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export const config = {
  api: {
    bodyParser: false
  }
}

const relevantEvents = new Set([
  'payment_intent.created',
  'payment_intent.succeeded',
  'payment_intent.canceled',
  'payment_intent.payment_failed',
  'payment_intent.processing'
])

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const buf = await buffer(request)
    const secret = request.headers['stripe-signature']

    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        buf,
        secret || '',
        process.env.STRIPE_WEBHOOK_SECRET || ''
      )
    } catch (error) {
      return response.status(400).send(`Webhook error: ${error}`)
    }

    const { type } = event
    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case 'payment_intent.created':
            const paymentIntent = event.data.object as Stripe.PaymentIntent
            await createPaymentIntent(
              paymentIntent.id,
              paymentIntent.customer,
              paymentIntent.status
            )
            break
          case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data
              .object as Stripe.PaymentIntent
            await updatePaymentIntent(
              paymentIntentSucceeded.id,
              paymentIntentSucceeded.status
            )
            break
          case 'payment_intent.canceled':
            const paymentIntentCanceled = event.data
              .object as Stripe.PaymentIntent
            await updatePaymentIntent(
              paymentIntentCanceled.id,
              paymentIntentCanceled.status
            )
            break
          case 'payment_intent.processing':
            const paymentIntentProcessing = event.data
              .object as Stripe.PaymentIntent
            await updatePaymentIntent(
              paymentIntentProcessing.id,
              paymentIntentProcessing.status
            )
            break
          case 'payment_intent.payment_failed':
            const paymentIntentPaymentFailed = event.data
              .object as Stripe.PaymentIntent
            await updatePaymentIntent(
              paymentIntentPaymentFailed.id,
              paymentIntentPaymentFailed.status
            )
            break
          default:
            throw new Error('Unhandled event.')
        }
      } catch (error) {
        return response.json({ error: 'Webhook handler failed' })
      }
    }

    response.status(200).json({ received: true })
  } else {
    response.setHeader('Allow', 'POST')
    response.status(405).end('Method not allowed')
  }
}
