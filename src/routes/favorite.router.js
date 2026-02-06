import { Router } from "express";
import * as middlewares from "@middlewares/favorite.middleware";
import * as controllers from "@controllers/favorite.controller";

const router = Router();

router.get("/games", controllers.getFavoriteGames);

router.post("/games", middlewares.validateCreate, controllers.postFavoriteGame);

router.delete(
  "/games",
  middlewares.validateDelete,
  controllers.deleteFavoriteGame,
);

export default router;
