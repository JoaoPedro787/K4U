import Settings from "@/settings";

import { stripe } from "@/configs/stripe";

// Stripe payment
export const mapToLineItems = (orderItems) =>
  orderItems.map((item) => ({
    price_data: {
      currency: "brl",
      product_data: {
        name: `${item.GameEdition.Game.name} - ${item.GameEdition.platform}`,
        description: `Game Edition: ${item.GameEdition.platform}`,
      },
      unit_amount: Math.round(item.unity_price * 100),
    },
    quantity: item.quantity,
  }));

export const sessionMaker = async (orderId, lineItems, email, userId) =>
  await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    expires_at:
      Math.floor(Date.now() / 1000) + Settings.STRIPE_EXPIRE_MINUTE * 60,
    customer_email: email,
    mode: "payment",
    success_url: `${Settings.FRONTEND_BASE_URL}/payment/success?order_id=${orderId}`,
    cancel_url: `${Settings.FRONTEND_BASE_URL}/orders`,
    metadata: {
      order_id: orderId,
      user_id: userId,
    },
  });
