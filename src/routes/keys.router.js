import { Router } from "express";

import * as controllers from "@controllers/keys.controller.js";

import { schemaValidation } from "@/utils/schema.validation";

import { ParamId } from "@/schemas/global.schema";

const router = Router();

router.get("/keys", controllers.getKeys);
router.get(
  "/:id/keys",
  schemaValidation(ParamId, "PARAMS"),
  controllers.getKeyByQuery,
);

export default router;
