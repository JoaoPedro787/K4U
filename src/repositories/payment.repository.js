import { Order, OrderItem, GameEdition, Game } from "@/models";

export const getOrderWithItemsRepository = async (
  userId,
  orderId,
  transaction = null,
) => {
  const order = await Order.findOne({
    where: {
      id: orderId,
      user_id: userId,
      status: "PENDING",
    },
    include: [
      {
        model: OrderItem,
        include: [{ model: GameEdition, include: [Game] }],
      },
    ],
    transaction,
  });

  return order;
};

export const getOrderItemsRepository = async (orderId, transaction = null) => {
  const orderItems = await OrderItem.findAll({
    where: { order_id: orderId },
    include: [GameEdition],
    transaction,
  });

  return orderItems;
};

export const updateOrderStatusRepository = async (
  orderId,
  status,
  transaction = null,
) => {
  const order = await Order.findByPk(orderId, { transaction });

  await order.update({ status }, { transaction });
  return order;
};
