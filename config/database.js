import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: path.join(__dirname, '../database.sqlite'),
});

export { sequelize };