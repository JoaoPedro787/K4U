import { Router } from "express";
import * as controllers from "@controller/user.controller.js";
import * as middlewares from "@middlewares/user.middleware.js";

const router = Router();

router.post("/sign-up", middlewares.validateSignUp, controllers.postNewUser);
router.post(
  "/sign-in",
  middlewares.validateSignIn,
  controllers.authenticateUser,
);

export default router;
