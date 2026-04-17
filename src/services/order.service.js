import sequelize from "@/configs/db";
import { setOrderEvent } from "@/configs/redis/order.event";

import {
  BadRequest,
  NotFound,
  Unauthorized,
} from "@/exceptions/http.exception";

// Repos
import {
  createOrderRepository,
  createOrderItemsListRepository,
  getUserOrderRepository,
  getOrderRepository,
  completeOrderRepository,
} from "@/repositories/order.repository";

import {
  getCartItemsForCheckoutRepository,
  getUserCartRepository,
  deleteAllUserCartItemRepository,
} from "@/repositories/cart.repository";

import {
  checkGameKeyAvailability,
  reserveGameKeys,
  releaseReservedKeys,
  assignKeysToOrder,
} from "@/repositories/keys.repository";

import { mapCartItemsToCheckoutList } from "@/mappers/checkout.mapper";
import { mapOrderList, mapOrder } from "@/mappers/order.mapper";

export const createFullOrderService = async (currentUser) => {
  const t = await sequelize.transaction();

  try {
    const cartId = await getUserCartRepository(currentUser, t);

    const cartItems = await getCartItemsForCheckoutRepository(cartId, t);

    if (cartItems.length < 1)
      throw new Unauthorized("No items on cart. Please add items to proceed.");

    // Validando estoque de keys
    for (const item of cartItems) {
      const isAvailable = await checkGameKeyAvailability(
        item.game_edition_id,
        item.quantity,
        t,
      );
      if (!isAvailable) {
        throw new BadRequest(
          `Insufficient keys for game: ${item.GameEdition.Game.name} - Platform: ${item.GameEdition.platform}`,
        );
      }
    }

    const orderDb = await createOrderRepository(currentUser, t);

    // Reservar keys para o pedido
    for (const item of cartItems) {
      await reserveGameKeys(item.game_edition_id, item.quantity, orderDb.id, t);
    }

    const mappedItems = mapCartItemsToCheckoutList(cartItems, orderDb.id);

    // Creating order and deleting cart
    await createOrderItemsListRepository(mappedItems, t);
    await deleteAllUserCartItemRepository(cartId);

    await t.commit();

    await setOrderEvent({ id: orderDb.id, expire_date: orderDb.expire_date });
  } catch (err) {
    await t.rollback();
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

export const completeOrderService = async (orderId) => {
  const t = await sequelize.transaction();

  try {
    // Atribuir keys reservadas ao pedido
    await assignKeysToOrder(orderId, t);

    // Atualizar status do pedido para COMPLETED
    await completeOrderRepository(orderId);

    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

export const cancelOrderService = async (orderId) => {
  const t = await sequelize.transaction();

  try {
    // Liberar keys reservadas
    await releaseReservedKeys(orderId, t);

    // Atualizar status do pedido para CANCELLED
    await cancelOrderRepository(orderId);

    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
};
