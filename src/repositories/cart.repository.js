import { Cart, CartItem, GameEdition, Game } from "@models";

// Cart

export const getUserCartRepository = async (
  currentUser,
  transaction = null,
) => {
  const cartDb = await Cart.findOne({
    attributes: ["id"],
    where: { user_id: currentUser },
    transaction,
  });

  return cartDb.id;
};

export const createUserCartRepository = (currentUser, transaction = null) =>
  Cart.create({ user_id: currentUser }, { transaction });

// Cart items

export const getUserCartItemsRepository = (currentUser) =>
  Cart.findOne({
    where: { user_id: currentUser },
    include: { model: CartItem, include: { model: GameEdition } },
  });

export const getCartItemsForCheckoutRepository = (cartId) =>
  CartItem.findAll({
    attributes: ["game_edition_id", "quantity"],
    where: { cart_id: cartId },
    include: { model: GameEdition, include: { model: Game } },
  });

export const createUserCartItemRepository = async (cartId, game) => {
  const [cartItemDb, created] = await CartItem.findOrCreate({
    where: { cart_id: cartId, game_edition_id: game.game_edition_id },
    defaults: {
      cart_id: cartId,
      game_edition_id: game.game_edition_id,
      quantity: game.quantity,
    },
  });

  return { cartItemId: cartItemDb.id, created };
};

export const incrementUserCartItemRepository = (cartItemId, cartId, quantity) =>
  CartItem.increment(
    { quantity },
    { where: { id: cartItemId, cart_id: cartId } },
  );

export const updateUserCartItemRepository = (cartItemId, cartId, quantity) =>
  CartItem.update({ quantity }, { where: { id: cartItemId, cart_id: cartId } });

export const deleteUserCartItemRepository = (cartItemId, cartId) =>
  CartItem.destroy({ where: { id: cartItemId, cart_id: cartId } });

export const deleteAllUserCartItemRepository = (cartId, transaction = null) =>
  CartItem.destroy({ where: { cart_id: cartId }, transaction });
