import { BadRequest } from "@/exceptions/http.exception";

export const schemaValidation =
  (schema, type = "BODY") =>
  async (req, _res, next) => {
    try {
      let toValidate = null;

      if (type == "BODY") {
        toValidate = req.body;
      } else {
        toValidate = req.params;
      }

      await schema.validateSync(toValidate, { stripUnknown: true });

      return next();
    } catch (err) {
      return next(new BadRequest(err.errors));
    }
  };
