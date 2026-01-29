import * as Yup from "yup";

export const UserCreate = Yup.object({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
  repeat_password: Yup.string()
    .oneOf([Yup.ref("password")])
    .required(),
  profile_photo: Yup.string().notRequired(),
});

export const UserPublic = Yup.object({
  id: Yup.number(),
  username: Yup.string(),
  email: Yup.string().email(),
  profile_photo: Yup.string(),
});

export const UserSignIn = Yup.object({
  identifier: Yup.string().required(),
  password: Yup.string().min(8).required(),
});
