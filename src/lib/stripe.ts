/**
 * Payment Integration for FasoLocal
 *
 * Supports:
 * - Orange Money (primary)
 * - Moov Money
 * - Coris Money
 * - Visa / Mastercard (via Stripe)
 * - Cash on Delivery
 */

import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
});

/**
 * Create a Stripe checkout session for card payments
 */
export async function createCheckoutSession(params: {
  orderId: string;
  amount: number; // in FCFA
  customerEmail: string;
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'xof',
          product_data: { name: `Commande FasoLocal #${params.orderId}` },
          unit_amount: params.amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${params.orderId}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
    customer_email: params.customerEmail,
    metadata: { orderId: params.orderId },
  });

  return session;
}

/**
 * Placeholder for Orange Money integration
 * TODO: Integrate with Orange Money API for Burkina Faso
 */
export async function initiateOrangeMoneyPayment(params: {
  orderId: string;
  amount: number;
  phoneNumber: string;
}) {
  // TODO: Implement Orange Money API call
  console.log('Orange Money payment initiated:', params);
  return { transactionId: null, status: 'pending' };
}
