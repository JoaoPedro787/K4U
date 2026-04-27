import { Router } from "express";

import { handleWebhook } from "@controllers/payment.controller";

import { stripeWebhookMiddleware } from "@/middlewares/payment.middleware";

const router = Router();

router.post("/webhook", stripeWebhookMiddleware, handleWebhook);

export default router;
