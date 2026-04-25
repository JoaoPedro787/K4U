import { updateUserInfoService } from "@/services/user.service";
import { to } from "@/utils";

export const updateUserInfo = async (req, res, next) => {
  const user = req.user;

  const to_update = req.body;

  const { error, data } = await to(updateUserInfoService(user, to_update));

  if (error) return next(error);

  req.logMessage = "user updated some info.";

  return res.status(200).json(data);
};
