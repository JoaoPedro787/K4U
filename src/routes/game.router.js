import { Router } from "express";

import * as controller from "@controllers/game.controller";

const router = Router();

router.get("/editions", controller.getAllGamesEdtion);
router.get("/editions/:id", controller.retrieveGameEdition);

export default router;
