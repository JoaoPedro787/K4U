import { FavoriteGame, GameEdition, Game } from "@models";

export const createNewFavoriteGame = async (currentUser, favorite) => {
  const [_favoriteDb, created] = await FavoriteGame.findOrCreate({
    where: { user_id: currentUser, game_edition_id: favorite.game_edition_id },
  });

  return { created };
};

export const listUserFavoriteGames = async (currentUser) =>
  await FavoriteGame.findAll({
    attributes: ["id"],
    where: { user_id: currentUser },
    include: {
      model: GameEdition,
      attributes: ["id", "platform", "price"],
      include: { model: Game, attributes: ["name"] },
    },
  });

export const deleteUserFavoriteGame = async (currentUser, favoriteId) =>
  await FavoriteGame.destroy({ where: { id: favoriteId } });
