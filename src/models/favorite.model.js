import sequelize from "@database/db";
import { DataTypes } from "sequelize";
import { User, GameEdition } from "@models";

export const FavoriteGame = sequelize.define("FavoriteGame", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  game_edition_id: { type: DataTypes.INTEGER, allowNull: false },
});

// 1:N
FavoriteGame.belongsTo(User, {
  foreignKey: "user_id",
});

// N:1
FavoriteGame.belongsTo(GameEdition, {
  foreignKey: "game_edition_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// 1:N
User.hasMany(FavoriteGame, {
  foreignKey: "user_id",
});

// 1:N
GameEdition.hasMany(FavoriteGame, {
  foreignKey: "game_edition_id",
});
