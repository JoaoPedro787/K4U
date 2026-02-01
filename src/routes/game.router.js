import { Router } from "express";

import * as controller from "@controller/game.controller";

const router = Router();

router.get("/editions", controller.getAllGamesEdtion);
router.get("/editions/:id", controller.retriveGameEdition);

export default router;
