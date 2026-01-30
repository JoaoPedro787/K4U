import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Unauthorized, BadRequest } from "@exceptions/http.exceptions";
import { UserCreate, UserSignIn } from "@schemas/user.schema.js";

dotenv.config({ path: `${process.cwd()}/src/config/auth.env` });

export const verifyAuthentication = (req, _res, next) => {
  const token = req.signedCookies.access_token;

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified.user_id;

    return next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError)
      return next(
        new Unauthorized("Session expired. Please try signing in again."),
      );

    return next(
      new Unauthorized("Your session is invalid. Please log in again"),
    );
  }
};

export const validateSignUp = async (req, _res, next) => {
  try {
    await UserCreate.validateSync(req.body, { stripUnknown: true });

    return next();
  } catch (err) {
    return next(new BadRequest(err.errors));
  }
};

export const validateSignIn = async (req, _res, next) => {
  try {
    await UserSignIn.validateSync(req.body, { stripUnknown: true });

    return next();
  } catch (err) {
    return next(new BadRequest(err.errors));
  }
};
