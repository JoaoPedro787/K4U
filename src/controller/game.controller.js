import { to } from "@/utils";

import {
  getAllGamesEditionService,
  retrieveGameEditionService,
} from "@services/game.service";

export const getAllGamesEdtion = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 30;
  const orderBy = req.query.order_by || "newest";
  const search = req.query.search || null;

  const user = req.user;

  const result = await getAllGamesEditionService(
    page,
    search,
    limit,
    orderBy,
    user,
  );

  res.json(result);
};

export const retrieveGameEdition = async (req, res, next) => {
  const editionId = req.params.id;

  const user = req.user;

  const { data, error } = await to(retrieveGameEditionService(editionId, user));

  if (error) return next(error);

  res.json(data);
};
