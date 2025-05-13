import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* export async function connectDB() {
   const db = await open({
      filename: path.join(__dirname, "database.sqlite"),
      driver: sqlite3.Database,
   });

   await db.exec(`
      CREATE TABLE IF NOT EXISTS admins (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         username TEXT UNIQUE NOT NULL,
         password TEXT NOT NULL
      )
   `);

   return db;
} */

const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: path.join(__dirname, '../database.sqlite'),
});

export { sequelize };