import app from './app.js';
import { open } from 'sqlite';
import { sequelize } from './config/database.js';

const PORT = process.env.PORT || 3001;

const start = async () => {
   try {
      await sequelize.sync({}); // /* auto-creates tables if not exist */
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