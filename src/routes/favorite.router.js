import { Router } from "express";

import * as controllers from "@controllers/favorite.controller";

import { schemaValidation } from "@/utils/schema.validation";

import { ParamId } from "@/schemas/global.schema";
import { FavoriteGameCreate } from "@/schemas/favorite.schema";

const router = Router();

router.get("/", controllers.getFavoriteGames);

router.post(
  "/",
  schemaValidation(FavoriteGameCreate),
  controllers.postFavoriteGame,
);

router.delete(
  "/:id",
  schemaValidation(ParamId, "PARAMS"),
  controllers.deleteFavoriteGame,
);

export default router;
