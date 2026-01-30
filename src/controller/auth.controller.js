import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import argon2 from "argon2";
import * as services from "@services/user.service.js";
import {
  Conflict,
  NotFound,
  Unauthorized,
} from "@exceptions/http.exceptions.js";
import { UserPublic } from "@schemas/user.schema.js";

dotenv.config({ path: `${process.cwd()}/src/config/auth.env` });

export const postNewUser = async (req, res, next) => {
  const user = req.body;

  const hashedPassword = await argon2.hash(user.password);

  const { userDb, created } = await services.createUser(user, hashedPassword);

  if (!created) {
    return next(new Conflict("User already exists."));
  }

  // Mudar para user created ou algo do tipo
  return res
    .status(201)
    .json(UserPublic.validateSync(userDb, { stripUnknown: true }));
};

export const authenticateUser = async (req, res, next) => {
  const user = req.body;

  const userDb = await services.getUserByIdentifier(user.identifier);

  if (!userDb) return next(new NotFound("Invalid username or password."));

  const verified = await argon2.verify(userDb.hashed_password, user.password);

  if (!verified)
    return next(
      new Unauthorized(
        "Couldn't sign in. Check your information and try again.",
      ),
    );

  const token = jwt.sign({ user_id: userDb.id }, process.env.JWT_SECRET, {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: process.env.JWT_EXPIRE_MINUTE * 60, // In hour
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
