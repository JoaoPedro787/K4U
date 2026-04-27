import { Op } from "sequelize";

import { Order, OrderItem, GameEdition, Game, GameAsset } from "@models";

import { OrderStatusEnum } from "@/schemas/order.schema";

// Order
export const createOrderRepository = async (currentUser, transaction = null) =>
  await Order.create({ user_id: currentUser, transaction });

export const getOrderRepository = (currentUser, orderId) =>
  Order.findOne({
    where: { user_id: currentUser, public_id: orderId },
    include: {
      model: OrderItem,
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
  });

export const userBelongsToOrder = (user, orderId) =>
  Order.findOne({
    where: {
      user_id: user,
      public_id: orderId,
      status: OrderStatusEnum.PENDING,
    },
  });

export const getUserOrderRepository = (currentUser) =>
  Order.findAll({
    where: { user_id: currentUser },
    include: {
      model: OrderItem,
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
    order: [["createdAt", "DESC"]],
  });

export const cancelOrderRepository = async (orderId) => {
  const [affectedCount] = await Order.update(
    { status: OrderStatusEnum.CANCELED },
    {
      where: {
        id: orderId,
        status: OrderStatusEnum.PENDING,
      },
    },
  );

  return affectedCount > 0;
};

export const completeOrderRepository = async (orderId) => {
  return await Order.update(
    { status: OrderStatusEnum.COMPLETED },
    {
      where: {
        id: orderId,
        status: OrderStatusEnum.PENDING,
      },
    },
  );
};

// Order Items
export const createOrderItemsListRepository = (items, transaction = null) =>
  OrderItem.bulkCreate(items, transaction);

export const getOrderItemsRepository = async (orderId, transaction = null) => {
  const orderItems = await OrderItem.findAll({
    where: { order_id: orderId },
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
    transaction,
  });

  return orderItems;
};
