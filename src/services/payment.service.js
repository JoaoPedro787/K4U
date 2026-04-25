import pino from "pino";

import sequelize from "@/configs/db";
import { stripe } from "@/configs/stripe";

import { NotFound } from "@/exceptions/http.exception";

import { assignKeysToOrder } from "@/repositories/keys.repository";

import {
  completeOrderRepository,
  userBelongsToOrder,
} from "@/repositories/order.repository";

import { get } from "@/configs/redis";

const logger = pino();

export const processWebhookService = async (event) => {
  const session = event.data.object;
  const orderId = session.metadata.order_id;

  const t = await sequelize.transaction();

  try {
    // Atribuir keys reservadas ao pedido
    await assignKeysToOrder(orderId, t);

    // Atualizar status do pedido para COMPLETED
    await completeOrderRepository(orderId);

    await t.commit();
  } catch (err) {
    if (!t.finished) await t.rollback();
    throw err;
  }
};

export const getOrderPaymentService = async (user, orderId) => {
  const belongs = await userBelongsToOrder(user, orderId);

  if (!belongs) throw new NotFound("Order not found.");

  return await get(`order:${orderId}`);
};

export const cancelPayment = async (sessionId) => {
  try {
    await stripe.checkout.sessions.expire(sessionId);

    return true;
  } catch (err) {
    logger.warn({ msg: "stripe expire error", err: err.message });

    return false;
  }
};
