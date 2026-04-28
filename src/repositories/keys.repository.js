import { Game, GameEdition, GameKey, Order, GameAsset } from "@/models";

import { KeyStatusEnum } from "@/schemas/keys.schema";
import { OrderStatusEnum } from "@/schemas/order.schema";

export const reserveGameKeys = async (gameEditionId, quantity, orderId, t) => {
  const keys = await GameKey.findAll({
    where: {
      game_edition_id: gameEditionId,
      status: KeyStatusEnum.AVAILABLE,
    },
    limit: quantity,
    transaction: t,
    lock: true,
    skipLocked: true,
  });

  if (keys.length === 0) return 0;

  await GameKey.update(
    {
      status: KeyStatusEnum.RESERVED,
      reserved_at: new Date(),
      order_id: orderId,
    },
    {
      where: {
        id: keys.map((k) => k.id),
      },
      transaction: t,
    },
  );

  return keys.length;
};

export const releaseReservedKeys = async (orderId, transaction = null) => {
  const releasedKeys = await GameKey.update(
    {
      status: KeyStatusEnum.AVAILABLE,
      reserved_at: null,
      order_id: null,
    },
    {
      where: {
        order_id: orderId,
        status: KeyStatusEnum.RESERVED,
      },

      include: { model: Order },
      transaction,
    },
  );

  return releasedKeys[0];
};

export const assignKeysToOrder = async (orderId, transaction = null) => {
  const assignedKeys = await GameKey.update(
    {
      status: KeyStatusEnum.SOLD,
      used_at: new Date(),
    },
    {
      where: {
        order_id: orderId,
        status: KeyStatusEnum.RESERVED,
      },
      include: { model: Order },

      transaction,
    },
  );

  return assignedKeys[0]; // Return number of affected rows
};

export const findKeysByUser = (user) =>
  GameKey.findAll({
    include: [
      {
        model: Order,
        where: { user_id: user, status: OrderStatusEnum.COMPLETED },
      },
      {
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
    ],
  });

export const findKeysByOrder = (order, user) =>
  GameKey.findAll({
    include: [
      {
        model: Order,
        where: {
          public_id: order,
          user_id: user,
          status: OrderStatusEnum.COMPLETED,
        },
      },
      {
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
    ],
  });
