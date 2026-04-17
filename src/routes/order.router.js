import { Router } from "express";

import * as controllers from "@controllers/order.controller.js";

const router = Router();

router.post("/", controllers.postNewOrder);
router.get("/", controllers.getUserOrders);
router.get("/:id", controllers.getOrder);

export default router;
