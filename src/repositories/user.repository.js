import { User } from "@/models";

export const updateUserInfoRepository = (user_id, toUpdate) =>
  User.update(
    { profile_photo: toUpdate.profile_photo },
    { where: { id: user_id, disabled: false }, returning: true },
  );

export const getUserEmail = async (userId, transaction = null) => {
  const result = await User.findOne({
    attributes: ["email"],
    where: { id: userId },
    transaction,
  });

  return result.email;
};
