import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Učitava .env fajl

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Isključi SQL logove radi čistoće
  }
);