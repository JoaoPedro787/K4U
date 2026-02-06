import jwt from "jsonwebtoken";
import Settings from "@/settings";
import redis from "@configs/redis";
import * as exceptions from "@exceptions/http.exception";
import * as schemas from "@schemas/user.schema.js";

export const verifyAuthentication = async (req, _res, next) => {
  const token = req.signedCookies.access_token;

  try {
    // Checking if token is revoked
    if (await redis.get(`revoked:${token}`)) throw new jwt.JsonWebTokenError();

    const verified = jwt.verify(token, Settings.JWT_SECRET);

    req.user = verified.user_id;

    return next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError)
      return next(
        new exceptions.Unauthorized(
          "Session expired. Please try signing in again.",
        ),
      );

    return next(
      new exceptions.Unauthorized(
        "Your session is invalid. Please log in again",
      ),
    );
  }
};

export const validateSignUp = async (req, _res, next) => {
  try {
    await schemas.UserCreate.validateSync(req.body, { stripUnknown: true });

    return next();
  } catch (err) {
    return next(new exceptions.BadRequest(err.errors));
  }
};

export const validateSignIn = async (req, _res, next) => {
  try {
    await schemas.UserSignIn.validateSync(req.body, { stripUnknown: true });

    return next();
  } catch (err) {
    return next(new exceptions.BadRequest(err.errors));
  }
};
