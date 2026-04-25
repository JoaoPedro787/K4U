export const mapGameEditionPublic = (row) => {
  if (!row) return null;

  return {
    id: row.id ?? null,
    platform: row.platform ?? null,
    price: row.price ?? null,
    game_name: row.Game?.name ?? null,
    stock_count: row.stock_count,
    thumbnail: row.Game?.GameAsset?.thumbnail ?? null,
    cover: row.Game?.GameAsset?.cover ?? null,
    carousel: row.Game?.GameAsset?.carousel ?? null,
  };
};

export const mapGameEditionListPublic = (rows = []) =>
  rows.map(mapGameEditionPublic);
