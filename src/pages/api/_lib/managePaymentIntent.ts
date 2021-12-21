import { supabase } from '../../../utils/supabaseClient'
import Stripe from 'stripe'

export async function createPaymentIntent(
  paymentIntentId: string,
  customerId: string | Stripe.Customer | Stripe.DeletedCustomer | null,
  status: string
) {
  const customer = await supabase
    .from('gr_stripe_customers')
    .select('*')
    .eq('stripe_customer_id', customerId)

  if (customer.data) {
    const { data, error } = await supabase.from('gr_stripe_orders').insert({
      customer_id: customer.data[0].id,
      payment_intent_id: paymentIntentId,
      payment_intent_status: status
    })
  }
}

export async function updatePaymentIntent(
  paymentIntentId: string,
  status: string
) {
  const { data, error } = await supabase
    .from('gr_stripe_orders')
    .update({
      payment_intent_status: status,
      updated_at: new Date().toISOString().toLocaleString()
    })
    .eq('payment_intent_id', paymentIntentId)
}
