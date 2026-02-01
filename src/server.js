import { app } from "./app.js";
import initDb from "@database/init.db.js";
import Settings from "@config/settings.js";

async function bootstrap() {
  try {
    await initDb();

    app.listen(Settings.PORT, () =>
      console.log(`API running on port ${Settings.PORT}`),
    );
  } catch (err) {
    console.error("Failed to bootstrap app:", err);
    process.exit(1);
  }
}

bootstrap();
