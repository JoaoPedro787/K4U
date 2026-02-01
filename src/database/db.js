import { Sequelize } from "sequelize";
import Settings from "@config/settings";

const sequelize = new Sequelize(
  Settings.DB_DATABASE,
  Settings.DB_USER,
  Settings.DB_PASSWORD,
  {
    host: Settings.DB_HOST,
    port: Settings.DB_PORT,
    dialect: "postgres",
    logging: false,
    define: {
      underscored: true,
    },
  },
);

export default sequelize;
