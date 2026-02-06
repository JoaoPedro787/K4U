import { GameEdition, Game } from "@/models";

export const getAllGamesEditionRepository = (page, limit, orderBy) =>
  GameEdition.findAndCountAll({
    include: Game,
    offset: (page - 1) * limit,
    limit,
    order: [[["createdAt", orderBy]]],
  });

export const retrieveGameEditionRepository = (game_id) =>
  GameEdition.findByPk(game_id, { include: Game });
