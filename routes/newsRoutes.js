import express from 'express';
import multer from 'multer';
import path from 'path';
import News from '../models/News.js';
import { isAuthenticated } from '../middleware/authMiddleWare.js';
import fs from 'fs/promises';

const router = express.Router();

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'uploads/');
   },

   filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
      cb(null, uniqueName);
   }
});

const upload = multer({
   storage,
   limits: {
      fileSize: 2 * 1024 * 1024, // 2MB limit
   }
});

// POST /api/news
router.post("/", isAuthenticated, upload.single("image"), async (req, res) => {
   const { title, shortDescription } = req.body;

   try {
      const imagePath = `/uploads/${req.file.filename}`;

      await News.create({
         title,
         shortDescription,
         imagePath
      });
      res.status(201).json({ message: 'News created successfully' });
   } catch (error) {

      if (req.file) {
         await fs.unlink(`uploads/${file.filename}`);
      }

      res.status(500).json({ error: "Failed to create news" });
   }
});

// GET /api/news
router.get("/", async (req, res) => {
   try {
      const allNews = await News.findAll({ order: [['createdAt', 'DESC']] });
      res.json(allNews)
   } catch (error) {
      console.error('❌ Error fetching news:', error);
      res.status(500).json({ error: "Failed to fetch news" });
   }
})


// DELETE /api/news/:id

router.delete("/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const deleted = await News.destroy({ where: { id } });

      if (deleted) {
         res.json({ message: "News deleted successfully" });
      } else {
         res.status(404).json({ error: "News not found" });
      }
   } catch (error) {
      console.error('❌ Error deleting news:', error);
      res.status(500).json({ error: "Failed to delete news" });
   }
})


// PUT /api/news/:id

router.put("/:id", async (req, res) => {
   try {
      const { title, shortDescription } = req.body;
      const id = req.params.id;

      const [updated] = await News.update(
         { title, shortDescription },
         { where: { id } }
      )

      if (updated) {
         res.json({ message: 'News updated successfully' });
      } else {
         res.status(404).json({ error: 'News not found' });
      }
   } catch (error) {
      console.error('❌ Error updating news:', error);
      res.status(500).json({ error: "Failed to update news" });
   }
})

export default router;