import dotenv from "dotenv";
import { app } from "./app.js";
import initDb from "@database/init.db.js";
import initRedis from "@caches/redis.js";

dotenv.config({ path: `${process.cwd()}/src/config/core.env` });

const { PORT } = process.env;

async function bootstrap() {
  try {
    await initDb();

    await initRedis();

    app.listen(PORT, () => console.log(`API running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to bootstrap app:", err);
    process.exit(1);
  }
}

bootstrap();
