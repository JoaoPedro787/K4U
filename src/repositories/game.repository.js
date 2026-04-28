import { GameEdition, Game, GameKey, GameAsset, FavoriteGame } from "@/models";
import { KeyStatusEnum } from "@/schemas/keys.schema";

import { Op } from "sequelize";

export const getAllGamesEditionRepository = (
  page,
  search,
  limit,
  orderBy,
  userId = null,
) =>
  GameEdition.findAndCountAll({
    include: [
      {
        model: Game,
        where: search
          ? {
              name: {
                [Op.iLike]: `%${search}%`,
              },
            }
          : {},
        include: [
          {
            model: GameAsset,
          },
        ],
      },
      {
        model: GameKey,
        where: { status: KeyStatusEnum.AVAILABLE },
        separate: true,
      },
      {
        model: FavoriteGame,
        where: { user_id: userId },
        required: false,
      },
    ],
    offset: (page - 1) * limit,
    limit,
    order: orderBy,
    subQuery: false,
    distinct: true,
  });

export const retrieveGameEditionRepository = (game_id, userId = null) =>
  GameEdition.findOne({
    include: [
      {
        model: Game,
        include: [
          {
            model: GameAsset,
          },
        ],
      },
      {
        model: GameKey,
        where: { status: KeyStatusEnum.AVAILABLE },
      },
      {
        model: FavoriteGame,
        where: { user_id: userId },
        required: false,
      },
    ],
    where: { public_id: game_id },
  });
