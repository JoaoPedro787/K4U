import { FavoriteGame, GameEdition, Game } from "@models";

export const createNewFavoriteGameRepository = async (
  currentUser,
  favorite,
) => {
  const [_favoriteDb, created] = await FavoriteGame.findOrCreate({
    where: { user_id: currentUser, game_edition_id: favorite.game_edition_id },
  });

  return { created };
};

export const listUserFavoriteGamesRepository = (currentUser) =>
  FavoriteGame.findAll({
    attributes: ["id"],
    where: { user_id: currentUser },
    include: {
      model: GameEdition,
      attributes: ["id", "platform", "price"],
      include: { model: Game, attributes: ["name"] },
    },
  });

export const deleteUserFavoriteGameRepository = (currentUser, favoriteId) =>
  FavoriteGame.destroy({
    where: { id: favoriteId, user_id: currentUser },
  });
