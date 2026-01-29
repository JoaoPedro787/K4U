import "@database/init.db.js";
import express from "express";
import errorHandler from "@middlewares/error.middleware.js";
import authRouter from "@routes/auth.router.js";

export const app = express();

app.use(express.json());

app.get("/", (_req, res) => res.json({ hello: "Hello, World!" }));

app.use("/auth", authRouter);

app.use(errorHandler);
