import {
  createNewFavoriteGameRepository,
  deleteUserFavoriteGameRepository,
  listUserFavoriteGamesRepository,
} from "@/repositories/favorite.repository";
import { Conflict, NotFound } from "@/exceptions/http.exception";
import { mapFavoriteGamesListPublic } from "@/mappers/favorite.mapper";

export const listUserFavoriteGamesService = async (currentUser) => {
  const favoritesDb = await listUserFavoriteGamesRepository(currentUser);

  const mapped = mapFavoriteGamesListPublic(favoritesDb);

  return mapped;
};

export const createNewFavoriteGameService = async (currentUser, favorite) => {
  const { created } = await createNewFavoriteGameRepository(
    currentUser,
    favorite,
  );

  if (!created)
    throw new Conflict("The game is already in the user's favorites list.");

  return created;
};

export const deleteUserFavoriteGameService = async (
  currentUser,
  favoriteId,
) => {
  const deleted = await deleteUserFavoriteGameRepository(
    currentUser,
    favoriteId,
  );

  if (!deleted) throw new NotFound("Game not found in the user's list");

  return deleted;
};
