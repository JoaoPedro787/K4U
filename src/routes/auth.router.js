import { Router } from "express";
import * as controllers from "@controllers/auth.controller.js";
import * as middlewares from "@middlewares/auth.middleware.js";

const router = Router();

router.post("/sign-up", middlewares.validateSignUp, controllers.postNewUser);
router.post(
  "/sign-in",
  middlewares.validateSignIn,
  controllers.authenticateUser,
);
router.delete(
  "/log-out",
  middlewares.verifyAuthentication,
  controllers.logOutUser,
);

export default router;
