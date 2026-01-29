import { DataTypes } from "sequelize";
import sequelize from "@database/db.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
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
});

export default User;
