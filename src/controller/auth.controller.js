import jwt from "jsonwebtoken";
import argon2 from "argon2";
import Settings from "@config/settings";
import client from "@caches/redis";
import * as services from "@services/user.service.js";
import * as exceptions from "@exceptions/http.exception.js";

export const postNewUser = async (req, res, next) => {
  const user = req.body;

  const hashedPassword = await argon2.hash(user.password);

  const { created } = await services.createUser(user, hashedPassword);

  if (!created) {
    return next(new exceptions.Conflict("User already exists."));
  }

  return res.status(201).json({ detail: "User created. Please sign in." });
};

export const authenticateUser = async (req, res, next) => {
  const user = req.body;

  const userDb = await services.getUserByIdentifier(user.identifier);

  if (!userDb)
    return next(new exceptions.NotFound("Invalid username or password."));

  const verified = await argon2.verify(userDb.hashed_password, user.password);

  if (!verified)
    return next(
      new exceptions.Unauthorized(
        "Couldn't sign in. Check your information and try again.",
      ),
    );

  const token = jwt.sign({ user_id: userDb.id }, Settings.JWT_SECRET, {
    algorithm: Settings.JWT_ALGORITHM,
    expiresIn: Settings.JWT_EXPIRE_MINUTE * 60, // In hour
  });

  res
    .cookie("access_token", token, {
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
  await client.set(`revoked:${token}`, 1);
  res.status(204).send();
};
