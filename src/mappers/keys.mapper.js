export const mapKeyToRep = (key) => ({
  id: key.public_id,
  key: key.key,
  status: key.status,
  order_id: key.Order.public_id,
  game_edition_id: key.game_edition_id,
  game_name: key.GameEdition.Game.name,
  platform: key.GameEdition.platform,
  game_cover: key.GameEdition.Game?.GameAsset?.cover ?? null,
  used_at: key.used_at,
});

export const mapKeyListToRep = (keys) => {
  if (keys.length < 1) return [];

  return keys.map(mapKeyToRep);
};
