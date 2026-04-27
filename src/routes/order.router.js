import { Router } from "express";

import * as controllers from "@controllers/order.controller.js";

import { default as keysRouter } from "./keys.router";

import { schemaValidation } from "@/utils/schema.validation";

import { ParamId } from "@/schemas/global.schema";

const router = Router();

router.post("/", controllers.postNewOrder);
router.get("/", controllers.getUserOrders);

router.use(keysRouter);

router.get("/:id", schemaValidation(ParamId, "PARAMS"), controllers.getOrder);

// Stripe URL
router.get(
  "/:id/payment",
  schemaValidation(ParamId, "PARAMS"),
  controllers.getOrderPaymentUrl,
);

export default router;
