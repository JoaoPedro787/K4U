export const mapOrder = (row) => {
  if (!row) return null;

  return {
    id: row.id,
    items: row.OrderItems.map((el) => ({
      game_name: el.GameEdition.Game.name,
      platform: el.GameEdition.platform,
      unity_price: el.unity_price,
      quantity: el.quantity,
      subtotal: el.subtotal,
    })),
    status: row.status,
    total: row.total,
    expire_date: row.expire_date,
    createdAt: row.createdAt,
  };
};

export const mapOrderList = (rows) => {
  if (!rows) return [];

  return rows.map(mapOrder);
};
