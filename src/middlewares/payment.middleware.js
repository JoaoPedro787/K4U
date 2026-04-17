import Settings from "@/settings";

import { stripe } from "@/configs/stripe";

import { BadRequest } from "@/exceptions/http.exception";

export const stripeWebhookMiddleware = async (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    return next(new BadRequest("Missing stripe-signature header"));
  }

  const event = stripe.webhooks.constructEvent(
    req.rawBody,
    signature,
    Settings.STRIPE_WEBHOOK_SECRET,
  );

  if (event.type === "checkout.session.completed") {
    req.stripeEvent = event;
    return next();
  }

  res.status(204).send();
};
