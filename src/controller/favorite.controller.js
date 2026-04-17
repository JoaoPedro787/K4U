import { to } from "@/utils";

import {
  createNewFavoriteGameService,
  listUserFavoriteGamesService,
  deleteUserFavoriteGameService,
} from "@services/favorite.service";

export const getFavoriteGames = async (req, res) => {
  const currentUser = req.user;

  const result = await listUserFavoriteGamesService(currentUser);

  res.json(result);
};

export const postFavoriteGame = async (req, res, next) => {
  const currentUser = req.user;
  const favorite = req.body;

  const { error } = await to(
    createNewFavoriteGameService(currentUser, favorite),
  );

  if (error) return next(error);

  res.status(201).json({ detail: "Favorite game added to user's list." });
};

export const deleteFavoriteGame = async (req, res, next) => {
  const currentUser = req.user;
  const favorite = req.body;

  const { error } = await to(
    deleteUserFavoriteGameService(currentUser, favorite.id),
  );

  if (error) return next(error);

  res.status(204).send();
};
