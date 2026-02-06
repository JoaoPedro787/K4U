import sequelize from ".";
import "@models";

const initDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

export default initDb;
