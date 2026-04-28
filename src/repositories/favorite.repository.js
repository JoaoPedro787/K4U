import { FavoriteGame, GameEdition, Game, GameAsset } from "@models";

export const createNewFavoriteGameRepository = async (
  currentUser,
  game_edition_id,
) => {
  const result = await FavoriteGame.create({
    user_id: currentUser,
    game_edition_id: game_edition_id,
  });

  await result.reload({
    include: {
      model: GameEdition,
      include: {
        model: Game,
        include: [
          {
            model: GameAsset,
          },
        ],
      },
    },
  });

  return result;
};

export const listUserFavoriteGamesRepository = (currentUser) =>
  FavoriteGame.findAll({
    where: { user_id: currentUser },
    include: {
      model: GameEdition,
      include: {
        model: Game,
        include: [
          {
            model: GameAsset,
          },
        ],
      },
    },
    order: [["createdAt", "DESC"]],
  });

export const deleteUserFavoriteGameRepository = (currentUser, favoriteId) =>
  FavoriteGame.destroy({
    where: { public_id: favoriteId, user_id: currentUser },
  });
