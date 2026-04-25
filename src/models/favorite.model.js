import sequelize from "@configs/db";
import { DataTypes } from "sequelize";

export const FavoriteGame = sequelize.define("FavoriteGame", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  game_edition_id: { type: DataTypes.INTEGER, allowNull: false },
});
