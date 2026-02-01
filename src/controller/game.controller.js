import * as services from "@services/game.service";
import * as exceptions from "@exceptions/game.exception";
import * as mappers from "@mappers/game.mapper";
import * as paginations from "@paginations/game.pagination";

export const getAllGamesEdtion = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 30;
  const orderBy = req.query.order_by || "newest";

  const { count, rows } = await services.getAllGamesEdtion(
    page,
    limit,
    orderBy,
  );

  const pagination = paginations.gameAllPagination(page, limit, orderBy, count);

  const mapped = mappers.mapGameEditionListPublic(rows);

  return res.json({ games: mapped, ...pagination });
};

export const retriveGameEdition = async (req, res, next) => {
  const editionId = req.params.id;

  const data = await services.retriveGameEdition(editionId);

  if (!data) return next(new exceptions.GameNotFound());

  const mapped = mappers.mapGameEditionPublic(data);

  return res.json(mapped);
};
