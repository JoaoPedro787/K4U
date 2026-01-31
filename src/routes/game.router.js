import { Router } from "express";

import * as controller from "@controller/game.controller";

const router = Router();

router.get("/edition", controller.getAllGamesEdtion);

export default router;
