import jwt from "jsonwebtoken";
import argon2 from "argon2";

import Settings from "@/settings";

import sequelize from "@/configs/db";
import { set } from "@/configs/redis";

import { Unauthorized } from "@exceptions/http.exception.js";

import { mapUserToDb, mapUserToRep } from "@/mappers/auth.mapper";

import { createUserCartRepository } from "@/repositories/cart.repository";

import {
  createUserRepository,
  getUserByIdentifierRepository,
} from "@/repositories/auth.repository";
import { parseUniqueError } from "@/helpers/auth.helper";
import { minuteToSeconds } from "@/utils/time.format";

export const createUserService = async (user) => {
  const t = await sequelize.transaction();

  try {
    const hashedPassword = await argon2.hash(user.password);

    const userMapped = mapUserToDb(user, hashedPassword);

    const userDb = await createUserRepository(userMapped, t);

    await createUserCartRepository(userDb.id, t);

    t.commit();

    const rep = mapUserToRep(userDb);

    return rep;
  } catch (err) {
    if (!t.finished) await t.rollback();

    const parsed = parseUniqueError(err);
    if (parsed) throw parsed;

    throw err;
  }
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

  return { user_id: userDb.id, token };
};

export const logOutUserService = async (access_token) =>
  await set(
    `revoked:${access_token}`,
    1,
    minuteToSeconds(Settings.JWT_EXPIRE_MINUTE),
  );
