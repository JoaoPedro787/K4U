import { to } from "@/utils";

import * as services from "@services/cart.service";

export const getUserCartItems = async (req, res) => {
  const user = req.user;

  const result = await services.getUserCartItemsService(user);

  req.logMessage = "getting cart items from user's cart";

  return res.json(result);
};

export const postUserCartItems = async (req, res, next) => {
  const user = req.user;
  const game = req.body;

  const { error, data } = await to(
    services.createUserCartItemService(user, game),
  );

  if (error) return next(error);

  req.logMessage = "user added game to cart";
  req.logExtras = {
    game_edition_id: data.game_edition_id,
    quantity: data.quantity,
  };

  res.status(201).json(data);
};

export const updateUserCartItem = async (req, res, next) => {
  const user = req.user;
  const cartItem = req.body;

  const { error, data } = await to(
    services.updateUserCartItemService(user, cartItem),
  );

  if (error) return next(error);

  req.logMessage = "user updated a game from cart";
  req.logExtras = { cart_item_id: cartItem.id, quantity: cartItem.quantity };

  res.status(200).json(data);
};

export const deleteUserCartItem = async (req, res, next) => {
  const user = req.user;
  const cartItemId = req.body.id;

  const { error } = await to(
    services.deleteUserCartItemService(user, cartItemId),
  );

  if (error) return next(error);

  req.logMessage = "user deleted a game from cart";
  req.logExtras = { cart_item_id: cartItemId };

  res.status(204).send();
};
