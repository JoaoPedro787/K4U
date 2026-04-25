import { Router } from "express";

import * as controllers from "@controllers/order.controller.js";

import { default as keysRouter } from "./keys.router";

const router = Router();

router.post("/", controllers.postNewOrder);
router.get("/", controllers.getUserOrders);

router.use(keysRouter);

router.get("/:id", controllers.getOrder);

// Stripe URL
router.get("/:id/payment", controllers.getOrderPaymentUrl);

export default router;
