import jwt from "jsonwebtoken";
import argon2 from "argon2";
import Settings from "@/settings";
import { Unauthorized, Conflict } from "@exceptions/http.exception.js";
import {
  createUserRepository,
  getUserByIdentifierRepository,
} from "@/repositories/auth.repository";

export const createUserService = async (user) => {
  const hashedPassword = await argon2.hash(user.password);

  const { created } = await createUserRepository(user, hashedPassword);

  if (!created) throw new Conflict("User already exists.");

  return created;
};

export const createUserTokenService = async (user) => {
  const userDb = await getUserByIdentifierRepository(user.identifier);

  if (!userDb) throw new Unauthorized("Invalid username or password.");

  const verified = await argon2.verify(userDb.hashed_password, user.password);

  if (!verified)
    throw new Unauthorized(
      "Couldn't sign in. Check your information and try again.",
    );

  const token = jwt.sign({ user_id: userDb.id }, Settings.JWT_SECRET, {
    algorithm: Settings.JWT_ALGORITHM,
    expiresIn: Settings.JWT_EXPIRE_MINUTE * 60, // In hour
  });

  return token;
};
