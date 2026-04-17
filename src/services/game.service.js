import {
  mapGameEditionListPublic,
  mapGameEditionPublic,
} from "@mappers/game.mapper";

import { gameAllPagination } from "@paginations/game.pagination";

import {
  getAllGamesEditionRepository,
  retrieveGameEditionRepository,
} from "@/repositories/game.repository";

import { NotFound } from "@/exceptions/http.exception";

export const getAllGamesEditionService = async (page, limit, orderBy) => {
  switch (orderBy) {
    case "newest":
      orderBy = "DESC";
    case "oldest":
      orderBy = "ASC";
    default:
      orderBy = "DESC";
  }

  const { count, rows } = await getAllGamesEditionRepository(
    page,
    limit,
    orderBy,
  );

  const pagination = gameAllPagination(page, limit, orderBy, count);

  const mapped = mapGameEditionListPublic(rows);

  return { games: mapped, ...pagination };
};

export const retrieveGameEditionService = async (game_id) => {
  const gameDb = await retrieveGameEditionRepository(game_id);

  if (!gameDb) throw new NotFound("Game not found.");

  return mapGameEditionPublic(gameDb);
};
