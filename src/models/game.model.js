import { DataTypes } from "sequelize";
import sequelize from "@configs/db";
import { generateGameKey } from "@utils/game.format";

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
});

const GameEdition = sequelize.define(
  "GameEdition",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["game_id", "platform"],
      },
    ],
  },
);

const GameKey = sequelize.define("GameKey", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  key: {
    type: DataTypes.STRING(17),
    allowNull: false,
    unique: true,
    defaultValue: generateGameKey,
  },

  status: {
    type: DataTypes.ENUM("AVAILABLE", "RESERVED", "USED"),
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
});

// Relations

Game.hasMany(GameEdition, {
  foreignKey: "game_id",
  onDelete: "CASCADE",
});

GameEdition.belongsTo(Game, {
  foreignKey: "game_id",
});

GameEdition.hasMany(GameKey, {
  foreignKey: "game_edition_id",
  onDelete: "CASCADE",
});

GameKey.belongsTo(GameEdition, {
  foreignKey: "game_edition_id",
});

export { Game, GameEdition, GameKey };
