import { to } from "@utils";

import { BadRequest } from "@exceptions/http.exception";

import {
  createCheckoutSessionService,
  processWebhookService,
} from "@/services/payment.service";

export const createCheckoutSession = async (req, res, next) => {
  const { order_id } = req.body;
  const userId = req.user;

  const { data, error } = await to(
    createCheckoutSessionService(userId, order_id),
  );

  if (error) {
    return next(error);
  }

  req.logMessage = "payment created";
  req.logExtras = {
    order_id: order_id,
    payment_url: data.url,
    payment_session: data.sessionId,
  };

  res.status(200).json({
    message: "Payment created. Please click the link below.",
    data: {
      sessionId: data.sessionId,
      url: data.url,
    },
  });
};

export const handleWebhook = async (req, res, next) => {
  const event = req.stripeEvent;

  const { data, error } = await to(processWebhookService(event));

  if (error) return next(error);

  const session = event.data.object;
  const orderId = session.metadata.order_id;
  // const userId = session.metadata.user_id;

  req.logMessage = "webhook processed successfully";
  req.logExtras = {
    order_id: orderId,
    payment_session: session.id,
  };

  res.status(200).json({
    message: "Webhook processed successfully",
    order_id: data,
  });
};

export const getPaymentSuccess = async (req, res, next) => {
  const { session_id } = req.query;

  if (!session_id) {
    return next(new BadRequest("Session ID is required"));
  }

  req.logMessage = "payment completed";
  req.logExtras = {
    payment_session: session_id,
  };

  res.status(200).json({
    message: "Payment completed successfully",
    data: {
      sessionId: session_id,
    },
  });
};

export const getPaymentCancel = async (req, res) => {
  const event = req.stripeEvent;

  const session = event.data.object;

  req.logMessage = "payment canceled";
  req.logExtras = {
    payment_session: session,
  };

  res.status(200).json({
    message: "Payment was cancelled",
  });
};
