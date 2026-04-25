import { NotFound } from "@/exceptions/http.exception";

import * as repositories from "@repositories/cart.repository";
import { retrieveGameEditionRepository } from "@/repositories/game.repository";

import { mapCartItemRep, mapCartPublic } from "@/mappers/cart.mapper";

// Cart

export const createUserCartService = (currentUser) => {
  return repositories.createUserCartRepository(currentUser);
};

// Cart items

export const getUserCartItemsService = async (currentUser) => {
  const cartItemDb = await repositories.getUserCartItemsRepository(currentUser);

  return mapCartPublic(cartItemDb);
};

export const createUserCartItemService = async (currentUser, game) => {
  if (!(await retrieveGameEditionRepository(game.game_edition_id))) {
    throw new NotFound("Game not found.");
  }

  const cartId = await repositories.getUserCartRepository(currentUser);

  let { cartItem, created } = await repositories.createUserCartItemRepository(
    cartId,
    game,
  );

  if (!created) {
    await repositories.incrementUserCartItemRepository(
      cartItem.id,
      cartId,
      game.quantity,
    );

    cartItem.quantity += 1;
  }

  const rep = mapCartItemRep(cartItem);

  return rep;
};

export const updateUserCartItemService = async (currentUser, cartItem) => {
  const cartId = await repositories.getUserCartRepository(currentUser);

  const [numberOfAffectedRows, updatedRows] =
    await repositories.updateUserCartItemRepository(
      cartItem.id,
      cartId,
      cartItem.quantity,
    );

  if (!numberOfAffectedRows)
    throw new NotFound("Item not found in user's cart.");

  const rep = mapCartItemRep(updatedRows[0]);

  return rep;
};

export const deleteUserCartItemService = async (currentUser, cartItemId) => {
  const cartId = await repositories.getUserCartRepository(currentUser);
  const deleted = await repositories.deleteUserCartItemRepository(
    cartItemId,
    cartId,
  );

  if (!deleted) throw new NotFound("Item not found in user's cart.");
};
