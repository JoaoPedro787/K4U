import redis from "@configs/redis";
import {
  createUserService,
  createUserTokenService,
} from "@services/auth.service.js";
import { to } from "@utils";

export const postNewUser = async (req, res, next) => {
  const user = req.body;

  const { error } = await to(createUserService(user));

  if (error) {
    return next(error);
  }

  res.status(201).json({ detail: "User created. Please sign in." });
};

export const authenticateUser = async (req, res, next) => {
  const user = req.body;

  const { data, error } = await to(createUserTokenService(user));

  if (error) return next(error);

  res
    .cookie("access_token", data, {
      httpOnly: true,
      secure: true,
      signed: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    })
    .status(204)
    .send();
};

export const logOutUser = async (req, res) => {
  const token = req.signedCookies.access_token;

  await redis.set(`revoked:${token}`, 1);
  res.status(204).send();
};
