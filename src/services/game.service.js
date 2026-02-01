import { GameEdition, Game } from "@models/game.model";

export const getAllGamesEdtion = async (page, limit, orderBy) => {
  switch (orderBy) {
    case "newest":
      orderBy = "DESC";
    case "oldest":
      orderBy = "ASC";
    default:
      orderBy = "DESC";
  }

  return await GameEdition.findAndCountAll({
    include: Game,
    offset: (page - 1) * limit,
    limit,
    order: [[["createdAt", orderBy]]],
  });
};

export const retriveGameEdition = async (game_id) =>
  await GameEdition.findByPk(game_id, { include: Game });
