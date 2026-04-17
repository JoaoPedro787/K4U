import { Router } from "express";

import { orderRouter, cartRouter, favoriteRouter } from "@routes";

const router = Router();

router.use("/favorites", favoriteRouter);

router.use("/cart", cartRouter);

router.use("/orders", orderRouter);

export default router;
