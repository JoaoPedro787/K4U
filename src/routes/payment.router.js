import { Router } from "express";

import {
  handleWebhook,
  getPaymentSuccess,
  getPaymentCancel,
} from "@controllers/payment.controller";

import { stripeWebhookMiddleware } from "@/middlewares/payment.middleware";

const router = Router();

router.post("/webhook", stripeWebhookMiddleware, handleWebhook);
router.get("/success", getPaymentSuccess);
router.get("/cancel", getPaymentCancel);

export default router;
