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

export const UserSignIn = Yup.object({
  identifier: Yup.string().required(),
  password: Yup.string().min(8).required(),
});

export const UserUpdate = Yup.object({
  profile_photo: Yup.string().required(),
});
