import express from "express";
import cookieParser from "cookie-parser";
import Settings from "@/settings";
import errorHandler from "@middlewares/error.middleware.js";
import { verifyAuthentication } from "@middlewares/auth.middleware";
import { authRouter, gameRouter, userRouter } from "@routes";

export const app = express();

app.use(express.json());
app.use(cookieParser(Settings.COOKIE_SECRET));

app.get("/", (_req, res) => res.json({ hello: "Hello, World!" }));

app.use("/user", verifyAuthentication, userRouter);
app.use("/auth", authRouter);
app.use("/games", gameRouter);
app.use(errorHandler);
