import { Router } from "express";

import * as controller from "@controllers/cart.controller";

import {
  CartItemCreate,
  CartItemUpdate,
  CartItemDelete,
} from "@/schemas/cart.schema";

import { schemaValidation } from "@/utils/schema.validation";

const router = Router();

router.get("/items", controller.getUserCartItems);

router.post(
  "/items",
  schemaValidation(CartItemCreate),
  controller.postUserCartItems,
);

router.put(
  "/items",
  schemaValidation(CartItemUpdate),
  controller.updateUserCartItem,
);

router.delete(
  "/items",
  schemaValidation(CartItemDelete),
  controller.deleteUserCartItem,
);

export default router;
