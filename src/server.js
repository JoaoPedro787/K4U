import { app } from "./app.js";

import Settings from "@/settings.js";

import initDb from "@configs/db/init.db.js";

import { connectRedis, connectSubscriber } from "./configs/redis/index.js";
import { orderListener } from "./configs/redis/order.events.js";

async function bootstrap() {
  try {
    await initDb();
    await connectRedis();
    const subscriber = await connectSubscriber();
    await orderListener(subscriber);

    app.listen(Settings.PORT || 3000, () =>
      console.log(`API running on port ${Settings.PORT}`),
    );
  } catch (err) {
    console.error("Failed to bootstrap app:", err);
    process.exit(1);
  }
}

bootstrap();
