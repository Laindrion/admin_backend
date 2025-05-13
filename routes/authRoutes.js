
import express from 'express';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

const router = express.Router();

router.post("/register", async (req, res) => {
   const { username, password } = req.body;

   try {
      const hash = await bcrypt.hash(password, 10);
      await Admin.create({ username, password: hash });
      res.json({ messahe: "Admin registered successfully" });
   } catch (error) {
      res.status(400).json({ error: 'Username already exists' });
   }
})

router.get("/check", (req, res) => {
   if (req.session.adminId) {
      return res.json({ loggedIn: true });
   }
   res.status(401).json({ loggedIn: false });
});

router.post("/login", async (req, res) => {
   const { username, password } = req.body;

   const admin = await Admin.findOne({ where: { username } });

   if (!admin) return res.status(401).json({ error: "Invalid credentials" });

   const valid = await bcrypt.compare(password, admin.password);
   if (!valid) return res.status(401).json({ error: "Invalid credentials" });

   req.session.adminId = admin.id;
   res.json({ message: "Login successful" });
})


router.post("/logout", (req, res) => {
   req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Logout successful" });
   });
})

export default router;