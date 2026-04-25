import jwt from "jsonwebtoken";

import Settings from "@/settings";

import { get } from "@/configs/redis";

import { Unauthorized } from "@/exceptions/http.exception";

export const verifyAuthentication = async (req, _res, next) => {
  const token = req.signedCookies.access_token;

  try {
    // Checking if token is revoked
    if (await get(`revoked:${token}`)) throw new jwt.JsonWebTokenError();

    const verified = jwt.verify(token, Settings.JWT_SECRET);

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
