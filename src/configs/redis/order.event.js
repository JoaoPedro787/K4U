import redis from ".";

import { cancelOrderRepository } from "@/repositories/order.repository";
import { releaseReservedKeys } from "@/repositories/keys.repository";

const subscriber = redis.duplicate();
subscriber.connect();

export const setOrderEvent = async (order) => {
  const expireDate = new Date(order.expire_date);
  const now = new Date();

  // Calcula a diferença em segundos (ms / 1000)
  const ttlInSeconds = Math.max(0, Math.floor((expireDate - now) / 1000));

  return await redis
    .multi()
    .set(`order:${order.id}`, order.id)
    .expire(`order:${order.id}`, 10)
    .exec();
};

export const orderListener = async () => {
  await subscriber.subscribe("__keyevent@0__:expired", async (message) => {
    const orderId = message.split(":")[1];

    console.log(orderId);
    // vou testar um if aqui
    if (!(await cancelOrderRepository(orderId)[0])) {
      await releaseReservedKeys(orderId);

      console.log("Order canceled:", orderId);
    }
  });
};

export default subscriber;
