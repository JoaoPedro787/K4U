import pino from "pino";

import sequelize from ".";
import "@models";

const logger = pino();

const initDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    logger.info("Connection has been established successfully with database.");
  } catch (err) {
    logger.error({ msg: "Unable to connect to the database", err });
  }
};

export default initDb;
