import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS?.toString(), {
   host: process.env.DB_HOST || 'localhost',
   dialect: 'postgres',
   /* storage: path.join(__dirname, '../database.sqlite'), */
});

export { sequelize };