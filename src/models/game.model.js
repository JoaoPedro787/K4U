import { DataTypes } from "sequelize";

import sequelize from "@configs/db";

import { generateGameKey } from "@utils/game.format";

import { KeyStatusEnum } from "@/schemas/keys.schema";

const Game = sequelize.define("Game", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  released_at: { type: DataTypes.DATE, allowNull: false },
});

const GameAsset = sequelize.define("GameAsset", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  carousel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const GameEdition = sequelize.define(
  "GameEdition",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    public_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },

    platform: {
      type: DataTypes.ENUM("PC", "XBOX", "PLAYSTATION"),
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },

    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    stock_count: {
      type: DataTypes.VIRTUAL,
      get() {
        if (this.GameKeys) {
          return this.GameKeys.filter(
            (key) => key.status === KeyStatusEnum.AVAILABLE,
          ).length;
        }
        return 0;
      },
    },
  },

  { indexes: [{ unique: true, fields: ["public_id"] }] },
);

const GameKey = sequelize.define(
  "GameKey",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    public_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },

    key: {
      type: DataTypes.STRING(17),
      allowNull: false,
      unique: true,
      defaultValue: generateGameKey,
    },

    status: {
      type: DataTypes.ENUM("AVAILABLE", "RESERVED", "SOLD"),
      allowNull: false,
      defaultValue: "AVAILABLE",
    },

    reserved_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    used_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    game_edition_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { indexes: [{ unique: true, fields: ["public_id"] }] },
);

export { Game, GameAsset, GameEdition, GameKey };
