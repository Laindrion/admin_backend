import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import newsRoutes from './routes/newsRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true
}));

app.use(express.json()); // ⬅️ this fixes req.body being undefined
app.use(express.urlencoded({ extended: true }));

app.use(
   session({
      secret: process.env.SESSION_SECRET || 'your-secret-key',
      resave: false,
      saveUninitialized: false,
   })
);

app.use('/api/auth', authRoutes);

// optionally serve uploaded images
app.use('/uploads', express.static(path.resolve('uploads')));

// Hook the News Route in app.js
app.use('/api/news', newsRoutes);

export default app;