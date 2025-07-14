const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const pool = require("../db");

router.get("/", auth, async (req, res) => {
  try {
    const currentUserRes = await pool.query(
      "SELECT skills FROM users WHERE id = $1",
      [req.user.id]
    );

    const currentUser = currentUserRes.rows[0];

    if (!currentUser || !Array.isArray(currentUser.skills)) {
      return res.status(400).json({ message: "Current user has no skills" });
    }

    const currentSkills = currentUser.skills;

    const result = await pool.query(
      `
      SELECT id, first_name, last_name, specialty, skills, avatar, availability, about
      FROM users
      WHERE id != $1
      AND skills && $2
      `,
      [req.user.id, currentSkills]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching teammates:", error);
    res.status(500).json({ message: "Failed to fetch teammates" });
  }
});


module.exports = router;
