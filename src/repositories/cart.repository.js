import { Cart, CartItem, GameEdition, Game, GameAsset } from "@models";

// Cart

export const getUserCartRepository = async (
  currentUser,
  transaction = null,
) => {
  const cartDb = await Cart.findOne({
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
    include: {
      model: CartItem,
      include: {
        model: GameEdition,
        include: {
          model: Game,
          include: [
            {
              model: GameAsset,
            },
          ],
        },
      },
    },
    order: [[CartItem, "createdAt", "DESC"]],
  });

export const getCartItemsForCheckoutRepository = (cartId) =>
  CartItem.findAll({
    where: { cart_id: cartId },
    include: {
      model: GameEdition,
      include: {
        model: Game,
        include: [
          {
            model: GameAsset,
          },
        ],
      },
    },
  });

export const createUserCartItemRepository = async (
  cartId,
  gameId,
  quantity,
) => {
  const [cartItemDb, created] = await CartItem.findOrCreate({
    where: { cart_id: cartId, game_edition_id: gameId },
    defaults: {
      cart_id: cartId,
      game_edition_id: gameId,
      quantity: quantity,
    },
    include: {
      model: GameEdition,
      include: {
        model: Game,
        include: [
          {
            model: GameAsset,
          },
        ],
      },
    },
  });

  if (created) {
    await cartItemDb.reload({
      include: { model: GameEdition, include: { model: Game } },
    });
  }

  return { cartItem: cartItemDb, created };
};

export const incrementUserCartItemRepository = (cartItemId, cartId, quantity) =>
  CartItem.increment(
    { quantity },
    { where: { id: cartItemId, cart_id: cartId } },
  );

export const updateUserCartItemRepository = async (
  cartItemId,
  cartId,
  quantity,
) => {
  const result = await CartItem.update(
    { quantity },
    { where: { public_id: cartItemId, cart_id: cartId }, returning: true },
  );

  await result[1][0].reload({
    include: {
      model: GameEdition,
      include: {
        model: Game,
        include: [
          {
            model: GameAsset,
          },
        ],
      },
    },
  });

  return result;
};

export const deleteUserCartItemRepository = (cartItemId, cartId) =>
  CartItem.destroy({ where: { public_id: cartItemId, cart_id: cartId } });

export const deleteAllUserCartItemRepository = (cartId, transaction = null) =>
  CartItem.destroy({ where: { cart_id: cartId }, transaction });
