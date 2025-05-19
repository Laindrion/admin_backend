import app from './app.js';
import { sequelize } from './config/database.js';

const PORT = process.env.PORT || 3001;

const start = async () => {
   try {
      await sequelize.sync({
         alter: true
         /* force: true, */ // Set to true to drop and recreate tables
      }); // /* auto-creates tables if not exist */
      console.log('Database connected successfully');
      app.listen(PORT, () => {
         console.log(`🚀 Server running at http://localhost:${PORT}`);
      });
   } catch (error) {
      console.error("❌ Failed to start server:", error);
   }
}

sequelize.sync()
start();