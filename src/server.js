import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({ path: `${process.cwd()}/src/config/core.env` });

const { PORT } = process.env;

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
