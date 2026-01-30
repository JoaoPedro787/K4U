import { BadRequest } from "@exceptions/http.exceptions.js";
import { UserCreate, UserSignIn } from "@schemas/user.schema.js";

export const validateSignUp = async (req, _res, next) => {
  try {
    await UserCreate.validateSync(req.body, { stripUnknown: true });

    return next();
  } catch (err) {
    return next(new BadRequest(err.errors));
  }
};

export const validateSignIn = async (req, _res, next) => {
  try {
    await UserSignIn.validateSync(req.body, { stripUnknown: true });

    return next();
  } catch (err) {
    return next(new BadRequest(err.errors));
  }
};
