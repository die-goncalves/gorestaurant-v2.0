import { supabase } from '../../../utils/supabaseClient'

export async function updatePaymentIntent(
  paymentIntentId: string,
  status: string
) {
  await supabase
    .from('orders')
    .update({
      payment_intent_status: status,
      updated_at: new Date().toISOString().toLocaleString()
    })
    .eq('payment_intent_id', paymentIntentId)
}
