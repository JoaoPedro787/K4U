import { Cart, CartItem, GameEdition } from "@models";

// Cart

export const getUserCartRepository = async (currentUser) => {
  const cartDb = await Cart.findOne({
    attributes: ["id"],
    where: { user_id: currentUser },
  });

  return cartDb.id;
};

export const createUserCartRepository = (currentUser) =>
  Cart.create({ user_id: currentUser });

// Cart items

export const getUserCartItemsRepository = (currentUser) =>
  Cart.findOne({
    where: { user_id: currentUser },
    include: { model: CartItem, include: { model: GameEdition } },
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
