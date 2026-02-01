import { createClient } from "redis";

const redis = async () =>
  await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .on("connect", () => console.log("Connected to Redis!"))
    .connect();

export default redis;
