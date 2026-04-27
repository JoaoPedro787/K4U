import pino from "pino";

import { createClient } from "redis";

import Settings from "@/settings";

const redis = createClient({
  //url: Settings.REDIS_HOST,
});

const logger = pino();

export async function connectRedis() {
  try {
    await redis.connect();
    logger.info("redis client connected");
  } catch (err) {
    logger.error({ msg: "redis client error", err });
  }
}

export async function connectSubscriber() {
  const subscriber = redis.duplicate();

  try {
    await subscriber.connect();
    logger.info("subscriber client connected");

    return subscriber;
  } catch (err) {
    logger.error({ msg: "subscriber client error", err });
  }
}

export async function set(key, value, exp) {
  return await redis.multi().set(key, value).expire(key, exp).exec();
}

export async function get(key) {
  return await redis.get(key);
}

export async function del(key) {
  return await redis.del(key);
}

export default redis;
