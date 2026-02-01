import express from "express";
import cookieParser from "cookie-parser";
import Settings from "@config/settings";
import errorHandler from "@middlewares/error.middleware.js";

import { authRouter, gameRouter } from "@routes";

export const app = express();

app.use(express.json());
app.use(cookieParser(Settings.COOKIE_SECRET));

app.get("/", (_req, res) => res.json({ hello: "Hello, World!" }));

app.use("/auth", authRouter);
app.use("/games", gameRouter);

app.use(errorHandler);
