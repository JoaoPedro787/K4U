import { Router } from "express";

import * as controller from "@controllers/cart.controller";

import { ParamId } from "@/schemas/global.schema";
import { CartItemCreate, CartItemUpdate } from "@/schemas/cart.schema";

import { schemaValidation } from "@/utils/schema.validation";

const router = Router();

router.get("/items", controller.getUserCartItems);

router.post(
  "/items",
  schemaValidation(CartItemCreate),
  controller.postUserCartItems,
);

router.patch(
  "/items/:id",
  schemaValidation(ParamId, "PARAMS"),
  schemaValidation(CartItemUpdate),
  controller.updateUserCartItem,
);

router.delete(
  "/items/:id",
  schemaValidation(ParamId, "PARAMS"),
  controller.deleteUserCartItem,
);

export default router;
