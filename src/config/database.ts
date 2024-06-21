import { Sequelize } from "sequelize";
import { ENVIRONMENT } from "../../env-config";

const { DB_NAME, DB_USER_NAME, DB_PASSWORD, DB_HOST, DB_PORT } = ENVIRONMENT;

export const sequelizeInstance = () => {
  return new Sequelize(DB_NAME, DB_USER_NAME as string, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "postgres",
    port: DB_PORT,
    logging: false,
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
    },
  });
};

const sequelize = sequelizeInstance();
export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Something Went Wrong With Database Connection", error);
  }
};

export { sequelize };
