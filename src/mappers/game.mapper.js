export const mapGameEditionPublic = (row) => {
  if (!row) return null;

  return {
    id: row.public_id,
    platform: row.platform,
    price: row.price,
    game_name: row.Game.name,
    stock_count: row.stock_count,
    cover: row.Game.GameAsset?.cover ?? null,
    carousel: row.Game.GameAsset?.carousel ?? null,
    released_at: row.Game.released_at,
  };
};

export const mapGameEditionListPublic = (rows = []) =>
  rows.map(mapGameEditionPublic);
