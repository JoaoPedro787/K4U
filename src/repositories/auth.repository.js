import { User } from "@models";
import { Op } from "sequelize";

export const createUserRepository = async (user, hashedPassword) => {
  const { username, email } = user;

  const [userDb, created] = await User.findOrCreate({
    where: { [Op.or]: [{ username }, { email }] },
    defaults: { ...user, hashed_password: hashedPassword },
  });

  return { userDb, created };
};

export const getUserByIdentifierRepository = async (identifier) => {
  return User.findOne({
    where: { [Op.or]: [{ username: identifier }, { email: identifier }] },
  });
};
