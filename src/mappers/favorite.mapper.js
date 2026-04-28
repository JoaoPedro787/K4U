export const mapFavoriteGamesPublic = (row) => ({
  id: row.public_id,
  game_id: row.GameEdition.public_id,
  game_name: row.GameEdition.Game.name,
  game_platform: row.GameEdition.platform,
  game_cover: row.GameEdition.Game?.GameAsset?.cover ?? null,
  game_price: row.GameEdition.price,
});

export const mapFavoriteGamesListPublic = (rows = []) =>
  rows.map(mapFavoriteGamesPublic);
