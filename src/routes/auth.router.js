import { Router } from "express";
import * as controllers from "@controllers/auth.controller.js";
import { verifyAuthentication } from "@middlewares/auth.middleware.js";
import { schemaValidation } from "@/utils/schema.validation";
import { UserCreate, UserSignIn } from "@/schemas/auth.schema";

const router = Router();

router.post("/sign-up", schemaValidation(UserCreate), controllers.postNewUser);

router.post(
  "/sign-in",
  schemaValidation(UserSignIn),
  controllers.authenticateUser,
);

router.delete("/log-out", verifyAuthentication, controllers.logOutUser);

export default router;
