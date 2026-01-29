import Joi from "joi";

export const UserCreate = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  repeat_password: Joi.ref("password"),
  profile_photo: Joi.string().optional(),
});
