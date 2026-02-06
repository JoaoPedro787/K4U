export const mapCartPublic = (row) => {
  if (!row) return null;

  return {
    total: row.total,

    items: (row.CartItems || []).map((item) => ({
      id: item.id,
      game_edition_id: item.game_edition_id,
      quantity: item.quantity,
      subtotal: item.subtotal,

      game_platform: item.GameEdition?.platform,
      game_price: item.GameEdition?.price,
    })),
  };
};
