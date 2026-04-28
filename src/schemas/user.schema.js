import * as Yup from "yup";

export const UserCreate = Yup.object({
  username: Yup.string().trim().required(),
  email: Yup.string().trim().email().required(),
  password: Yup.string().trim().min(8).required(),
  repeat_password: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")])
    .required(),
  profile_photo: Yup.string().trim().notRequired(),
});

export const UserSignIn = Yup.object({
  identifier: Yup.string().trim().required(),
  password: Yup.string().trim().min(8).required(),
});

export const UserUpdate = Yup.object({
  profile_photo: Yup.string()
    .trim()
    .matches(/^https:\/\//)
    .required(),
});
