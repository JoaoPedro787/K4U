import { DataTypes } from "sequelize";
import sequelize from "@configs/db";

export const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    public_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      allowNull: false,
      unique: true,
    },
    hashed_password: { type: DataTypes.TEXT, allowNull: false },
    profile_photo: { type: DataTypes.TEXT, allowNull: true },
    disabled: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { indexes: [{ unique: true, fields: ["public_id"] }] },
);
