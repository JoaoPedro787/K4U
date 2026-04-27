export const mapCartItemRep = (item) => {
  return {
    id: item.public_id,
    quantity: item.quantity,
    subtotal: item.subtotal,
    game_name: item.GameEdition.Game.name,
    game_platform: item.GameEdition.platform,
    game_price: item.GameEdition.price,
    game_cover: item.GameEdition.Game.GameAsset?.cover ?? null,
  };
};

export const mapCartPublic = (row) => {
  if (row?.CartItems.length < 1) return [];

  return {
    total: row.total,
    items: row.CartItems.map(mapCartItemRep),
  };
};
