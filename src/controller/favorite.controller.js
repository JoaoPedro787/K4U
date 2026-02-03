import * as services from "@services/favorite.service";
import * as exceptions from "@exceptions/http.exception";
import * as mappers from "@mappers/favorite.mapper";

export const getFavoriteGames = async (req, res) => {
  const currentUser = req.user;

  const favorites = await services.listUserFavoriteGames(currentUser);

  const mapped = mappers.mapFavoriteGamesListPublic(favorites);

  res.json(mapped);
};

export const postFavoriteGame = async (req, res, next) => {
  const currentUser = req.user;
  const favorite = req.body;

  const { created } = await services.createNewFavoriteGame(
    currentUser,
    favorite,
  );

  if (!created)
    return next(
      new exceptions.Conflict(
        "The game is already in the user's favorites list.",
      ),
    );

  res.status(201).json({ detail: "Favorite game added to user's list." });
};

export const deleteFavoriteGame = async (req, res, next) => {
  const currentUser = req.user;
  const favorite = req.body;

  const deleted = await services.deleteUserFavoriteGame(
    currentUser,
    favorite.id,
  );

  if (!deleted)
    return next(new exceptions.NotFound("Game not found in the user's list"));

  res.status(204).send();
};
