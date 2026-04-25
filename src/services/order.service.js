import Settings from "@/settings";

import sequelize from "@/configs/db";
import { set } from "@/configs/redis";

import { BadRequest, NotFound } from "@/exceptions/http.exception";

// Repos
import {
  createOrderRepository,
  createOrderItemsListRepository,
  getOrderItemsRepository,
  getUserOrderRepository,
  getOrderRepository,
} from "@/repositories/order.repository";

import {
  getCartItemsForCheckoutRepository,
  getUserCartRepository,
  deleteAllUserCartItemRepository,
} from "@/repositories/cart.repository";

import { reserveGameKeys } from "@/repositories/keys.repository";

import { mapToLineItems, sessionMaker } from "@/helpers/payment.helper";

import { mapCartItemsToCheckoutList } from "@/mappers/checkout.mapper";
import { mapOrderList, mapOrder } from "@/mappers/order.mapper";

import { minuteToSeconds } from "@/utils/time.format";
import { getUserEmail } from "@/repositories/user.repository";

export const createFullOrderService = async (currentUser) => {
  const t = await sequelize.transaction();

  try {
    const cartId = await getUserCartRepository(currentUser, t);

    const cartItems = await getCartItemsForCheckoutRepository(cartId, t);

    if (cartItems.length < 1)
      throw new BadRequest("No items on cart. Please add items to proceed.");

    const orderDb = await createOrderRepository(currentUser, t);

    // Validando estoque de keys
    for (const item of cartItems) {
      const reservedKeys = await reserveGameKeys(
        item.game_edition_id,
        item.quantity,
        orderDb.id,
        t,
      );

      if (reservedKeys < item.quantity) {
        throw new BadRequest(
          `Insufficient keys for game: ${item.GameEdition.Game.name} - Platform: ${item.GameEdition.platform}`,
        );
      }
    }

    const mappedItems = mapCartItemsToCheckoutList(cartItems, orderDb.id);

    // Creating order and deleting cart
    await createOrderItemsListRepository(mappedItems, t);
    await deleteAllUserCartItemRepository(cartId);

    const orderItems = await getOrderItemsRepository(orderDb.id, t);

    const email = await getUserEmail(currentUser, t);

    await t.commit();

    // Stripe payment

    const lineItems = mapToLineItems(orderItems);

    // Payment session
    const session = await sessionMaker(
      orderDb.id,
      lineItems,
      email,
      currentUser,
    );

    await set(
      `order:${orderDb.id}:${session.id}`,
      session.url,
      minuteToSeconds(Settings.STRIPE_EXPIRE_MINUTE),
    );

    return { orderId: orderDb.id, sessionId: session.id, url: session.url };
  } catch (err) {
    if (!t.finished) await t.rollback();
    throw err;
  }
};

export const getUserOrderService = async (currentUser) => {
  const orders = await getUserOrderRepository(currentUser);

  const mapped = mapOrderList(orders);

  return mapped;
};

export const getOrderService = async (currentUser, orderId) => {
  const order = await getOrderRepository(currentUser, orderId);

  if (!order) throw new NotFound("User's order not found.");

  const mapped = mapOrder(order);

  return mapped;
};
