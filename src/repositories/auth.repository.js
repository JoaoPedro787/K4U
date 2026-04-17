import { Op } from "sequelize";

import { User } from "@models";

export const createUserRepository = async (user, transaction = null) => {
  const userDb = await User.create(user, {
    transaction,
  });

  return userDb.id;
};

export const getUserByIdentifierRepository = async (identifier) => {
  return User.findOne({
    where: { [Op.or]: [{ username: identifier }, { email: identifier }] },
  });
};
