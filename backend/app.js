const express = require("express");
const pool = require("./config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require('./model/Users');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Allow only your React app
    methods: ['GET', 'POST'],        // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Middleware to parse JSON bodies

// CREATE: Add a new user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const [result] = await pool.execute(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email],
    );
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const SECRET_KEY = "your_secret_key";
const users = [
  {
    email: "user@example.com",
    password: "$2y$10$G0u0awwHCncv6UYQMU6AleYwOHf2UEhX8RI4XwoCECRHCtiZtwD9i",
  },
]; // Hashed password

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
try {
    const user = await Users.findOne({ where: { username: req.body.username } });
     if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id }, "SECRET_KEY");
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
} catch (error) {
    console.error("FULL ERROR DETAILS:", error); // Look for 'sqlMessage' or 'code' here
     res.status(401).json({ message: "Invalid credentials" });
}
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
