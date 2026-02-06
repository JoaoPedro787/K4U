import { BadRequest } from "@/exceptions/http.exception";

export const schemaValidation = (schema) => async (req, _res, next) => {
  try {
    await schema.validateSync(req.body, { stripUnknown: true });

    return next();
  } catch (err) {
    return next(new BadRequest(err.errors));
  }
};
