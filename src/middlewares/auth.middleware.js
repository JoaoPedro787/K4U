import jwt from "jsonwebtoken";

import Settings from "@/settings";

import { get } from "@/configs/redis";

import { Unauthorized } from "@/exceptions/http.exception";

export const verifyAuthentication = (pass = false) => {
  return async (req, _res, next) => {
    const token = req.signedCookies.access_token;

    if (!token) {
      if (pass) return next();
      return next(new Unauthorized("Token não encontrado"));
    }

    try {
      const isRevoked = await get(`revoked:${token}`);
      if (isRevoked) throw new Error("Revogado");

      const verified = jwt.verify(token, Settings.JWT_SECRET);

      req.user = verified.user_id;

      return next();
    } catch (err) {
      if (pass) return next();
      return next(new Unauthorized("Inválido"));
    }
  };
};
