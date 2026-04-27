export const mapGameEditionPublic = (row) => {
  if (!row) return null;

  return {
    id: row.public_id,
    platform: row.platform,
    price: row.price,
    game_name: row.Game.name,
    stock_count: row.stock_count,
    thumbnail: row.Game.GameAsset?.thumbnail ?? null,
    cover: row.Game.GameAsset?.cover ?? null,
    carousel: row.Game.GameAsset?.carousel ?? null,
  };
};

export const mapGameEditionListPublic = (rows = []) =>
  rows.map(mapGameEditionPublic);
