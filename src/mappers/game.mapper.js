export const mapGameEditionPublic = (row) => {
  if (!row) return null;

  return {
    id: row.id ?? null,
    platform: row.platform ?? null,
    price: row.price ?? null,
    gameName: row.Game?.name ?? null,
  };
};

export const mapGameEditionListPublic = (rows = []) =>
  rows.map(mapGameEditionPublic);
