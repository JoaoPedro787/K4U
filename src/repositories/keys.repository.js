import { GameKey } from "@models";

export const checkGameKeyAvailability = async (
  gameEditionId,
  requiredQuantity,
  transaction,
) => {
  const count = await GameKey.count({
    where: {
      game_edition_id: gameEditionId,
      status: "AVAILABLE",
    },
    transaction,
  });

  return count >= requiredQuantity;
};

export const reserveGameKeys = async (
  gameEditionId,
  requiredQuantity,
  orderId,
  transaction,
) => {
  const reservedKeys = await GameKey.findAll({
    where: {
      game_edition_id: gameEditionId,
      status: "AVAILABLE",
    },
    limit: requiredQuantity,
    transaction,
    lock: transaction.LOCK.UPDATE,
  });

  const updatePromises = reservedKeys.map((key) =>
    key.update(
      {
        status: "RESERVED",
        reserved_at: new Date(),
        order_id: orderId,
      },
      { transaction },
    ),
  );

  await Promise.all(updatePromises);
  return reservedKeys;
};

export const releaseReservedKeys = async (orderId, transaction) => {
  const releasedKeys = await GameKey.update(
    {
      status: "AVAILABLE",
      reserved_at: null,
      order_id: null,
    },
    {
      where: {
        order_id: orderId,
        status: "RESERVED",
      },
      transaction,
    },
  );

  return releasedKeys[0]; // Return number of affected rows
};

export const assignKeysToOrder = async (orderId, transaction) => {
  const assignedKeys = await GameKey.update(
    {
      status: "USED",
      used_at: new Date(),
    },
    {
      where: {
        order_id: orderId,
        status: "RESERVED",
      },
      transaction,
    },
  );

  return assignedKeys[0]; // Return number of affected rows
};
