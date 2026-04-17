import { stripe } from "@/configs/stripe";

import { NotFound } from "@/exceptions/http.exception";

import {
  getOrderWithItemsRepository,
  updateOrderStatusRepository,
} from "@/repositories/payment.repository";

export const createCheckoutSessionService = async (userId, orderId) => {
  const order = await getOrderWithItemsRepository(userId, orderId);

  if (!order) throw new NotFound("Order not found.");

  const lineItems = order.OrderItems.map((item) => ({
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

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:8000/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:8000/payment/cancel`,
    metadata: {
      order_id: order.id,
      user_id: userId,
    },
  });

  return { sessionId: session.id, url: session.url };
};

export const processWebhookService = async (event) => {
  const session = event.data.object;
  const orderId = session.metadata.order_id;
  // const userId = session.metadata.user_id; // TODO: VOU VER SE VOU PRECISAR

  await updateOrderStatusRepository(orderId, "COMPLETED");

  return orderId;
};
