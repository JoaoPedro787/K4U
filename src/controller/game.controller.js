import { to } from "@/utils";

import {
  getAllGamesEditionService,
  retrieveGameEditionService,
} from "@services/game.service";

export const getAllGamesEdtion = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 30;
  const orderBy = req.query.order_by || "newest";

  const result = await getAllGamesEditionService(page, limit, orderBy);

  res.json(result);
};

export const retrieveGameEdition = async (req, res, next) => {
  const editionId = req.params.id;

  const { data, error } = await to(retrieveGameEditionService(editionId));

  if (error) return next(error);

  res.json(data);
};
