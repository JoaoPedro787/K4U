import { updateUserInfoRepository } from "@/repositories/user.repository";

import { mapUserToRep } from "@/mappers/auth.mapper";
import { NotFound } from "@/exceptions/http.exception";

export const updateUserInfoService = async (user, toUpdate) => {
  const user_db = await updateUserInfoRepository(user, toUpdate);

  if (!user_db[0]) {
    throw new NotFound("User not found.");
  }

  const rep = mapUserToRep(user_db[1][0]);

  return rep;
};
