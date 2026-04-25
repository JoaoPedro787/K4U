import redis from "@configs/redis";

import { to } from "@utils";

import {
  createUserService,
  createUserTokenService,
  logOutUserService,
} from "@services/auth.service.js";

export const postNewUser = async (req, res, next) => {
  const user = req.body;

  const { error, data } = await to(createUserService(user));

  if (error) {
    return next(error);
  }

  req.logMessage = "user created";
  req.user = data.id;

  res.status(201).json(data);
};

export const authenticateUser = async (req, res, next) => {
  const user = req.body;

  const { data, error } = await to(createUserTokenService(user));

  if (error) return next(error);

  req.logMessage = "access token created";
  req.user = data.user_id;

  res
    .cookie("access_token", data.token, {
      httpOnly: true,
      secure: true,
      signed: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    })
    .status(204)
    .send();
};

export const logOutUser = async (req, res) => {
  const token = req.signedCookies.access_token;

  await logOutUserService(token);

  req.logMessage = "access token revoked";
  req.logExtras = { access_token: token };

  res.status(204).send();
};
