import app from "./app.js";
import { connectDB } from "./config/database.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
   try {
      const db = await connectDB();

      app.locals.db = db;  // make accesible via req.app.locals.db

      app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
      })
   } catch (error) {
      console.error("Failed to connect to the database:", error);
   }
}

startServer();