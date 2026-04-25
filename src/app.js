import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import Settings from "@/settings";
import logger from "@configs/logger";

import errorHandler from "@middlewares/error.middleware.js";
import { verifyAuthentication } from "@middlewares/auth.middleware";

import { authRouter, gameRouter, userRouter, paymentRouter } from "@routes";

export const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(
  express.json({
    verify: (req, _res, buf) => {
      if (req.originalUrl.includes("/payment/webhook")) {
        req.rawBody = buf;
      }
    },
  }),
);
app.use(cookieParser(Settings.COOKIE_SECRET));

app.use(logger);

app.get("/", (_req, res) => res.json({ hello: "Hello, World!" }));

app.use("/users", verifyAuthentication, userRouter);
app.use("/auth", authRouter);
app.use("/games", gameRouter);
app.use("/payment", paymentRouter);
app.use(errorHandler);

// COLCOAR THUMBNAIL DOS GAMES NO KEYS | NOVA TABELA PARA WALLPAPER CARROSEL
// AO VOLTAR COM A SETA, ELE CANCELA A ORDER

// aqui eu vi vantagem:
// // No seu serviço de limpeza de pedidos expirados:
// const session = await stripe.checkout.sessions.expire(order.stripeSessionId);

// VOU VOLTAR COM O REDIS

// criar nova session stripe ao cancelar
