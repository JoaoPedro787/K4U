import { to } from "@/utils";

import {
  createNewFavoriteGameService,
  listUserFavoriteGamesService,
  deleteUserFavoriteGameService,
} from "@services/favorite.service";

export const getFavoriteGames = async (req, res) => {
  const currentUser = req.user;

  const result = await listUserFavoriteGamesService(currentUser);

  req.logMessage = "getting user's favorite games";

  res.json(result);
};

export const postFavoriteGame = async (req, res, next) => {
  const currentUser = req.user;
  const favorite = req.body;

  const { error, data } = await to(
    createNewFavoriteGameService(currentUser, favorite),
  );

  if (error) return next(error);

  req.logMessage = "user added game to favorites";
  req.logExtras = { game_edition_id: favorite.game_edition_id };

  res.status(201).json(data);
};

export const deleteFavoriteGame = async (req, res, next) => {
  const currentUser = req.user;
  const id = req.params.id;

  const { error } = await to(deleteUserFavoriteGameService(currentUser, id));

  if (error) return next(error);

  req.logMessage = "user removed game to favorites";
  req.logExtras = { favorite_id: id };

  res.status(204).send();
};
