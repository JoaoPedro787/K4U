import { FavoriteGame, GameEdition, Game, GameAsset } from "@models";

export const createNewFavoriteGameRepository = async (
  currentUser,
  game_edition_id,
) => {
  const [favoriteDb, created] = await FavoriteGame.findOrCreate({
    where: { user_id: currentUser, game_edition_id: game_edition_id },
  });

  if (created) {
    await favoriteDb.reload({
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
  }

  return { favoriteDb, created };
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
    where: { id: favoriteId, user_id: currentUser },
  });
