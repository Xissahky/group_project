const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require("./routes/profile");
const teammatesRoute = require("./routes/teammates");
const chatRoutes = require("./routes/chats");
const usersRoutes = require("./routes/users");



const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use('/api/auth', authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/teammates", teammatesRoute);
app.use("/api/chats", chatRoutes);
app.use("/api/users", usersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
