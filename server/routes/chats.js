const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const pool = require("../db");

router.get("/", auth, async (req, res) => {
  const result = await pool.query(`
    SELECT c.id, u.first_name, u.last_name, u.avatar, u.specialty,
           (SELECT text FROM messages WHERE chat_id = c.id ORDER BY created_at DESC LIMIT 1) AS last_message
    FROM chats c
    JOIN users u ON (u.id = CASE WHEN c.user1 = $1 THEN c.user2 ELSE c.user1 END)
    WHERE c.user1 = $1 OR c.user2 = $1
  `, [req.user.id]);

  const chats = result.rows.map(row => ({
    id: row.id,
    partner: {
      first_name: row.first_name,
      last_name: row.last_name,
      avatar: row.avatar,
      specialty: row.specialty,
    },
    last_message: row.last_message || "",
  }));

  res.json(chats);
});

router.get("/:id", auth, async (req, res) => {
  const result = await pool.query(
    "SELECT id, sender_id, text, created_at FROM messages WHERE chat_id = $1 ORDER BY created_at ASC",
    [req.params.id]
  );

  const messages = result.rows.map((msg) => ({
    ...msg,
    fromMe: msg.sender_id === req.user.id,
  }));

  res.json(messages);
});

router.post("/:id", auth, async (req, res) => {
  const { text } = req.body;

  const result = await pool.query(
    "INSERT INTO messages (chat_id, sender_id, text, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
    [req.params.id, req.user.id, text]
  );

  res.json(result.rows[0]);
});

router.post("/", auth, async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.user.id;

  if (!receiverId) {
    return res.status(400).json({ message: "Receiver ID required" });
  }

  try {
    const existing = await pool.query(
      "SELECT * FROM chats WHERE (user1 = $1 AND user2 = $2) OR (user1 = $2 AND user2 = $1)",
      [senderId, receiverId]
    );
    
    if (existing.rows.length > 0) {
      return res.status(200).json(existing.rows[0]);
    }
    
    const result = await pool.query(
      "INSERT INTO chats (user1, user2) VALUES ($1, $2) RETURNING *",
      [senderId, receiverId]
    );
    

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error starting chat:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
