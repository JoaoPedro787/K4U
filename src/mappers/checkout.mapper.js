export const mapCartItemsToCheckout = (item) => {
  if (!item) return null;

  return {
    game_edition_id: item.game_edition_id,
    unity_price: item.GameEdition?.price,
    quantity: item.quantity,
    order_id: item.order_id,
  };
};

export const mapCartItemsToCheckoutList = (cartItems, order_id) => {
  if (!cartItems) return [];

  return cartItems.map((el) =>
    mapCartItemsToCheckout({ ...el.dataValues, order_id: order_id }),
  );
};
