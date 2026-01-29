import express from "express";
import errorHandler from "@middlewares/error.middleware.js";
import { router as authRouter } from "@routes/auth.router.js";

export const app = express();

app.use(express.json());

app.get("/", (_req, res) => res.json({ hello: "Hello, World!" }));

app.use("/auth", authRouter);

app.use(errorHandler);
