import "@database/init.db.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import errorHandler from "@middlewares/error.middleware.js";
import authRouter from "@routes/auth.router.js";

dotenv.config({ path: `${process.cwd()}/src/config/core.env` });

export const app = express();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/", (_req, res) => res.json({ hello: "Hello, World!" }));

app.use("/auth", authRouter);

app.use(errorHandler);
