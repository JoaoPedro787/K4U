import { Router } from "express";

import {
  createCheckoutSession,
  handleWebhook,
  getPaymentSuccess,
  getPaymentCancel,
} from "@controllers/payment.controller";

import { schemaValidation } from "@utils/schema.validation";

import { verifyAuthentication } from "@middlewares/auth.middleware";
import { stripeWebhookMiddleware } from "@/middlewares/payment.middleware";

import { CreateCheckoutSession } from "@schemas/payment.schema";

const router = Router();

router.post(
  "/create-checkout",
  verifyAuthentication,
  schemaValidation(CreateCheckoutSession),
  createCheckoutSession,
);
router.post("/webhook", stripeWebhookMiddleware, handleWebhook);
router.get("/success", getPaymentSuccess);
router.get("/cancel", getPaymentCancel);

export default router;
