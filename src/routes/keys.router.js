import { Router } from "express";

import * as controllers from "@controllers/keys.controller.js";

const router = Router();

router.get("/keys", controllers.getKeys);
router.get("/:id/keys", controllers.getKeyByQuery);

export default router;
