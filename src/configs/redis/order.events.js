import pino from "pino";

import redis from ".";

import { cancelOrderRepository } from "@/repositories/order.repository";
import { releaseReservedKeys } from "@/repositories/keys.repository";

import { cancelPayment } from "@/services/payment.service";

const logger = pino();

export const setOrderEvent = async (order) => {
  const expireDate = new Date(order.expire_date);
  const now = new Date();

  // Calcula a diferença em segundos (ms / 1000)
  const ttlInSeconds = Math.max(0, Math.floor((expireDate - now) / 1000));

  return await redis
    .multi()
    .set(`order:${order.id}`, order.id)
    .expire(`order:${order.id}`, ttlInSeconds)
    .exec();
};

export const orderListener = async (subscriber) => {
  await subscriber.subscribe("__keyevent@0__:expired", async (message) => {
    if (!message.startsWith("order:")) {
      return;
    }

    const parts = message.split(":");

    const orderId = parts[1];
    const sessionId = parts[2];

    if (await cancelOrderRepository(orderId)) {
      await releaseReservedKeys(orderId);
      await cancelPayment(sessionId);

      logger.info({
        msg: "order canceled",
        order_id: orderId,
        session_id: sessionId,
      });
    }
  });
};
