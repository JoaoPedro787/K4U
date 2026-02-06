import { createClient } from "redis";

const redis = createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .on("connect", () => console.log("Connected to Redis!"));

redis.connect();

export default redis;
