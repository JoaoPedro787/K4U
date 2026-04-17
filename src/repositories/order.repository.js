import { Order, OrderItem, GameEdition, Game } from "@models";

// Order
export const createOrderRepository = async (currentUser, transaction = null) =>
  await Order.create({ user_id: currentUser, transaction });

export const getOrderRepository = (currentUser, orderId) =>
  Order.findOne({
    where: { user_id: currentUser, id: orderId },
    include: {
      model: OrderItem,
      include: { model: GameEdition, include: { model: Game } },
    },
  });

export const getUserOrderRepository = (currentUser) =>
  Order.findAll({
    where: { user_id: currentUser },
    include: {
      model: OrderItem,
      include: { model: GameEdition, include: { model: Game } },
    },
  });

export const cancelOrderRepository = async (orderId) => {
  return await Order.update(
    { status: "CANCELLED" },
    {
      where: {
        id: orderId,
        status: "PENDING",
      },
    },
  );
};

export const completeOrderRepository = async (orderId) => {
  return await Order.update(
    { status: "COMPLETED" },
    {
      where: {
        id: orderId,
        status: "PENDING",
      },
    },
  );
};

// Order Items

export const createOrderItemsListRepository = (items, transaction = null) =>
  OrderItem.bulkCreate(items, transaction);
