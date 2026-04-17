import { Router } from "express";

import * as controllers from "@controllers/favorite.controller";

import { schemaValidation } from "@/utils/schema.validation";

import {
  FavoriteGameCreate,
  FavoriteGameDelete,
} from "@/schemas/favorite.schema";

const router = Router();

router.get("/games", controllers.getFavoriteGames);

router.post(
  "/games",
  schemaValidation(FavoriteGameCreate),
  controllers.postFavoriteGame,
);

router.delete(
  "/games",
  schemaValidation(FavoriteGameDelete),
  controllers.deleteFavoriteGame,
);

export default router;
