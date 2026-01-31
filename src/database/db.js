import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: `${process.cwd()}/src/config/db.env` });

const { DB_USER, DB_HOST, DB_PASSWORD, DB_PORT, DB_DATABASE } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: console.log,

  define: {
    underscored: true,
  },
});

export default sequelize;
