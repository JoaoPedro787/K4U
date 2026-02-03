export const mapFavoriteGamesPublic = (row) => ({
  id: row.id,
  game_id: row.GameEdition.id,
  game_name: row.GameEdition.Game.name,
  game_platform: row.GameEdition.platform,
  game_price: row.GameEdition.price,
});

export const mapFavoriteGamesListPublic = (rows = []) =>
  rows.map(mapFavoriteGamesPublic);
