import sequelize from "@/configs/db";

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

export const getAllGamesEditionService = async (
  page,
  search,
  limit,
  orderBy,
  user,
) => {
  switch (orderBy) {
    case "newest":
      orderBy = [["Game", "released_at", "DESC"]];
      break;
    case "oldest":
      orderBy = [["Game", "released_at", "ASC"]];
      break;
    case "price_desc":
      orderBy = [["price", "DESC"]];
      break;
    case "price_asc":
      orderBy = [["price", "ASC"]];
      break;
    case "random":
      orderBy = sequelize.random();
      break;
    default:
      orderBy = [["Game", "released_at", "DESC"]];
  }

  const { count, rows } = await getAllGamesEditionRepository(
    page,
    search,
    limit,
    orderBy,
    user,
  );

  const pagination = gameAllPagination(page, limit, orderBy, count);

  const mapped = mapGameEditionListPublic(rows);

  return { games: mapped, ...pagination };
};

export const retrieveGameEditionService = async (game_id, user) => {
  const gameDb = await retrieveGameEditionRepository(game_id, user);

  if (!gameDb) throw new NotFound("Game not found.");

  return mapGameEditionPublic(gameDb);
};
