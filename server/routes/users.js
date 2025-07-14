const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const pool = require("../db");

router.get("/me", auth, async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT id, first_name, last_name, email, specialty, skills, avatar FROM users WHERE id = $1",
        [req.user.id]
      );
      const user = result.rows[0];
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching current user:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
module.exports = router;
