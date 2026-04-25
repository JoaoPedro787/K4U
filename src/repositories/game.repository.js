import { GameEdition, Game, GameKey, GameAsset } from "@/models";
import { KeyStatusEnum } from "@/schemas/keys.schema";

import { Op } from "sequelize";

export const getAllGamesEditionRepository = (page, search, limit, orderBy) =>
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
      },
    ],
    offset: (page - 1) * limit,
    limit,
    order: [orderBy],
    distinct: true,
  });

export const retrieveGameEditionRepository = (game_id) =>
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
    ],
    where: { id: game_id },
  });
