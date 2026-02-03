import express from "express";
import cookieParser from "cookie-parser";
import Settings from "@config/settings";
import errorHandler from "@middlewares/error.middleware.js";

import { authRouter, gameRouter, userRouter } from "@routes";

import { verifyAuthentication } from "@middlewares/auth.middleware";

export const app = express();

app.use(express.json());
app.use(cookieParser(Settings.COOKIE_SECRET));

app.get("/", (_req, res) => res.json({ hello: "Hello, World!" }));

app.use("/user", verifyAuthentication, userRouter);
app.use("/auth", authRouter);
app.use("/games", gameRouter);

app.use(errorHandler);
