import { Router } from "express";

import { orderRouter, cartRouter, favoriteRouter } from "@routes";

import { updateUserInfo } from "@/controller/user.controller";

import { schemaValidation } from "@/utils/schema.validation";

import { UserUpdate } from "@/schemas/user.schema";

const router = Router();

router.patch("/info", schemaValidation(UserUpdate), updateUserInfo);

router.use("/favorites", favoriteRouter);

router.use("/cart", cartRouter);

router.use("/orders", orderRouter);

export default router;
