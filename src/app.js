import express from "express";
import cookieParser from "cookie-parser";

import Settings from "@/settings";

import errorHandler from "@middlewares/error.middleware.js";
import { verifyAuthentication } from "@middlewares/auth.middleware";

import { authRouter, gameRouter, userRouter, paymentRouter } from "@routes";

export const app = express();

app.use(
  express.json({
    verify: (req, res, buf) => {
      if (req.originalUrl.includes("/payment/webhook")) {
        req.rawBody = buf;
      }
    },
  }),
);
app.use(cookieParser(Settings.COOKIE_SECRET));

app.get("/", (_req, res) => res.json({ hello: "Hello, World!" }));

app.use("/users", verifyAuthentication, userRouter);
app.use("/auth", authRouter);
app.use("/games", gameRouter);
app.use("/payment", paymentRouter);
app.use(errorHandler);

/*
TODO: NEXT STEPS

- TESTAR A API
- SERIA LEGAL PEDIR PARA A IA LOGAR AS ROTAS
- ADICIONAR PAGINATION NO FAVORITES GAMES


*/
