import { config } from "dotenv";

config();

const {DB_USER_NAME, DB_PASSWORD, DB_NAME='grocery_store', DB_HOST, DB_PORT="5432", DEVELOPMENT_PORT} = process.env;

export const ENVIRONMENT = {
  DB_USER_NAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT: parseInt(DB_PORT),
  DEVELOPMENT_PORT,
};
