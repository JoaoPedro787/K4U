import { Conflict, NotFound } from "@/exceptions/http.exception";

import {
  createNewFavoriteGameRepository,
  deleteUserFavoriteGameRepository,
  listUserFavoriteGamesRepository,
} from "@/repositories/favorite.repository";

import { retrieveGameEditionRepository } from "@/repositories/game.repository";

import {
  mapFavoriteGamesListPublic,
  mapFavoriteGamesPublic,
} from "@/mappers/favorite.mapper";

export const listUserFavoriteGamesService = async (currentUser) => {
  const favoritesDb = await listUserFavoriteGamesRepository(currentUser);

  const mapped = mapFavoriteGamesListPublic(favoritesDb);

  return mapped;
};

export const createNewFavoriteGameService = async (currentUser, favorite) => {
  const { game_edition_id } = favorite;

  const game = await retrieveGameEditionRepository(game_edition_id);

  if (!game) {
    throw new NotFound("Game not found.");
  }

  const { favoriteDb, created } = await createNewFavoriteGameRepository(
    currentUser,
    game.id,
  );

  if (!created)
    throw new Conflict("The game is already in the user's favorites list.");

  const rep = mapFavoriteGamesPublic(favoriteDb);

  return rep;
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
