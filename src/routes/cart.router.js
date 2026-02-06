import { Router } from "express";
import * as controller from "@controllers/cart.controller";
import {
  CartItemCreate,
  CartItemUpdate,
  CartItemDelete,
} from "@/schemas/cart.schema";
import { schemaValidation } from "@/utils/schema.validation";

const router = Router();

router.get("/cart", controller.getUserCartItems);

router.post(
  "/cart",
  schemaValidation(CartItemCreate),
  controller.postUserCartItems,
);

router.put(
  "/cart",
  schemaValidation(CartItemUpdate),
  controller.updateUserCartItem,
);

router.delete(
  "/cart",
  schemaValidation(CartItemDelete),
  controller.deleteUserCartItem,
);

export default router;
