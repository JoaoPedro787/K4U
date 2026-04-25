export const mapKeyToRep = (key) => ({
  id: key.id,
  key: key.key,
  status: key.status,
  order_id: key.order_id,
  game_edition_id: key.game_edition_id,
  game_name: key.GameEdition.Game.name,
  platform: key.GameEdition.platform,
  game_thumbnail: key.GameEdition.Game?.GameAsset?.thumbnail ?? null,
  used_at: key.used_at,
});

export const mapKeyListToRep = (keys) => {
  if (keys.length < 1) return [];

  return keys.map(mapKeyToRep);
};
