const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Pool } = require("pg");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get("/", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT email, specialty, skills, avatar, first_name, last_name, about, availability FROM users WHERE id = $1",
    [req.user.id]
  );
  
  res.json(result.rows[0]);
});


router.put("/", auth, async (req, res) => {
  const { specialty, skills, avatar, firstName, lastName, about, availability } = req.body;

  await pool.query(
    "UPDATE users SET specialty = $1, skills = $2, avatar = $3, first_name = $4, last_name = $5, about = $6, availability = $7 WHERE id = $8",
    [specialty, skills, avatar, firstName, lastName, about, availability, req.user.id]
);

  res.json({ message: "Profile updated" });
});

router.put("/password", auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const result = await pool.query("SELECT password FROM users WHERE id = $1", [req.user.id]);
  const user = result.rows[0];

  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) {
    return res.status(400).json({ error: "Current password is incorrect" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashedPassword, req.user.id]);

  res.json({ message: "Password updated successfully" });
});


router.post("/avatar", auth, upload.single("avatar"), async (req, res) => {
  const avatarPath = `http://localhost:5000/uploads/${req.file.filename}`;
  await pool.query("UPDATE users SET avatar = $1 WHERE id = $2", [avatarPath, req.user.id]);
  res.json({ avatar: avatarPath });
});

router.delete("/delete", auth, async (req, res) => {
  const { password } = req.body;

  const result = await pool.query("SELECT password FROM users WHERE id = $1", [req.user.id]);
  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "Password is incorrect" });
  }

  await pool.query("DELETE FROM users WHERE id = $1", [req.user.id]);
  res.json({ message: "Account deleted successfully" });
});


module.exports = router;
