import * as schemas from "@schemas/favorite.schema";
import * as exceptions from "@exceptions/http.exception";

export const validateCreate = async (req, _res, next) => {
  try {
    await schemas.FavoriteGameCreate.validateSync(req.body, {
      stripUnknown: true,
    });

    return next();
  } catch (err) {
    return next(new exceptions.BadRequest(err.errors));
  }
};

export const validateDelete = async (req, _res, next) => {
  try {
    await schemas.FavoriteGameDelete.validateSync(req.body, {
      stripUnknown: true,
    });

    return next();
  } catch (err) {
    return next(new exceptions.BadRequest(err.errors));
  }
};
