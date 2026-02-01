import { createClient } from "redis";

const client = createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .on("connect", () => console.log("Connected to Redis!"));

client.connect();

export default client;
