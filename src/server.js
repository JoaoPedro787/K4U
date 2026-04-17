import { app } from "./app.js";

import Settings from "@/settings.js";

import initDb from "@configs/db/init.db.js";
import { orderListener } from "./configs/redis/order.event.js";

async function bootstrap() {
  try {
    await initDb();
    await orderListener();

    app.listen(Settings.PORT, () =>
      console.log(`API running on port ${Settings.PORT}`),
    );
  } catch (err) {
    console.error("Failed to bootstrap app:", err);
    process.exit(1);
  }
}

bootstrap();
