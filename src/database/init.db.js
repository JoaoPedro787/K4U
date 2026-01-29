import sequelize from "./db";
import "@models";

const createDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

createDb();
