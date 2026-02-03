import { Router } from "express";
import * as FavoriteMiddlewares from "@middlewares/favorite.middleware";
import * as FavoriteController from "@controller/favorite.controller";

const router = Router();

router.get("/favorite-games", FavoriteController.getFavoriteGames);

router.post(
  "/favorite-games",
  FavoriteMiddlewares.validateCreate,
  FavoriteController.postFavoriteGame,
);

router.delete(
  "/favorite-games",
  FavoriteMiddlewares.validateDelete,
  FavoriteController.deleteFavoriteGame,
);

export default router;
