import * as services from "@services/cart.service";

import { to } from "@/utils";

export const getUserCartItems = async (req, res) => {
  const user = req.user;

  const result = await services.getUserCartItemsService(user);

  return res.json(result);
};

export const postUserCartItems = async (req, res, next) => {
  const user = req.user;
  const game = req.body;

  const { error } = await to(services.createUserCartItemService(user, game));

  if (error) return next(error);

  res.status(201).json({ detail: "Game added to user's cart." });
};

export const updateUserCartItem = async (req, res, next) => {
  const user = req.user;
  const cartItem = req.body;

  const { error } = await to(
    services.updateUserCartItemService(user, cartItem),
  );

  if (error) return next(error);

  res.status(201).json({ detail: "Cart updated." });
};

export const deleteUserCartItem = async (req, res, next) => {
  const user = req.user;
  const cartItemId = req.body.id;

  const { error } = await to(
    services.deleteUserCartItemService(user, cartItemId),
  );

  if (error) return next(error);

  res.status(201).json({ detail: "Game deleted from user's cart." });
};
