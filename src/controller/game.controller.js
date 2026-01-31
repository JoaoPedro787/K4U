import * as services from "@services/game.service";

export const getAllGamesEdtion = async (req, res, next) => {
  const editions = await services.getAllGamesEdtion();

  console.log(editions);
  return res.json(editions);
};
