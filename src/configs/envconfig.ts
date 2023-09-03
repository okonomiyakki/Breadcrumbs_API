import dotenv from 'dotenv';
import { EnvConfig } from '../types/envType';

dotenv.config();

const env: EnvConfig = {
  PORT: process.env.PORT,

  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
};

export default env;
