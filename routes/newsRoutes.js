import express from 'express';
import multer from 'multer';
import path, { parse } from 'path';
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
   const { title_en, title_ru, title_uz, shortDescription_en, shortDescription_ru, shortDescription_uz, content_en, content_ru, content_uz } = req.body;

   try {
      const imagePath = `/uploads/${req.file.filename}`;

      await News.create({
         title_en, title_ru, title_uz,
         shortDescription_en, shortDescription_ru, shortDescription_uz,
         content_en, content_ru, content_uz,
         imagePath
      });
      res.status(201).json({ message: 'News created successfully' });
   } catch (error) {
      // Remove uploaded image if something fails
      if (req.file) {
         fs.unlink(`uploads/${req.file.filename}`);
      }
      console.error('❌ Error creating news:', error);
      res.status(500).json({ error: "Failed to create news" });
   }
});

// GET /api/news
router.get("/", async (req, res) => {
   try {
      const page = parseInt(req.query.page) || 1;
      const limit = 4;
      /*  const offset = (page - 1) * limit; */

      if (page) {
         const offset = (page - 1) * limit;
         const { count, rows } = await News.findAndCountAll({
            limit,
            offset,
            order: [["createdAt", "DESC"]],
         })

         const totalPages = Math.ceil(count / limit);

         res.json({
            items: rows,
            totalPages
         });
      } else {
         // If no pagination, return full list (maybe for admin or select)
         const allNews = await News.findAll({ order: [['createdAt', 'DESC']] });
         res.json(allNews);
      }

   } catch (error) {
      console.error('❌ Error fetching news:', error);
      res.status(500).json({ error: "Failed to fetch news" });
   }
})

/* Inner news */
router.get("/:id", async (req, res) => {
   const id = req.params.id;

   try {
      const newsItem = await News.findByPk(id);

      if (!newsItem) {
         return res.status(404).json({ error: "News not found" });
      }
      res.json(newsItem);
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

router.put("/:id", upload.single("image"), async (req, res) => {
   const id = req.params.id;
   const {
      title_en, title_ru, title_uz,
      shortDescription_en, shortDescription_ru, shortDescription_uz,
      content_en, content_ru, content_uz,
   } = req.body;

   try {
      const newsItem = await News.findByPk(id);
      if (!newsItem) {
         return res.status(404).json({ error: "News not found" });
      }

      /* Delete new image if new one is uploaded */
      let imagePath = newsItem.imagePath;

      if (req.file) {
         const oldPath = path.join('uploads', path.basename(newsItem.imagePath));
         try {
            await fs.unlink(oldPath);
         } catch (error) {
            console.error('❌ Error deleting old image:', error);
         }
         imagePath = `/uploads/${req.file.filename}`;
      }

      /* const imagePath = req.file ? `/uploads/${req.file.filename}` : newsItem.imagePath; */

      await newsItem.update({
         title_en, title_ru, title_uz,
         shortDescription_en, shortDescription_ru, shortDescription_uz,
         content_en, content_ru, content_uz,
         imagePath,
      })

      res.json({ message: 'News updated successfully' });
   } catch (error) {
      console.error('❌ Error updating news:', error);
      res.status(500).json({ error: "Failed to update news" });
   }
})

export default router;