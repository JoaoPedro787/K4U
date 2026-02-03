import { Op } from "sequelize";
import { User } from "@models";

export const createUser = async (user, hashedPassword) => {
  const { username, email } = user;

  const [_userDb, created] = await User.findOrCreate({
    where: { [Op.or]: [{ username }, { email }] },
    defaults: { ...user, hashed_password: hashedPassword },
  });

  return { created };
};

export const getUserByIdentifier = async (identifier) => {
  return await User.findOne({
    where: { [Op.or]: [{ username: identifier }, { email: identifier }] },
  });
};
