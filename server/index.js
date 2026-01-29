const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Signup API
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
    function (err) {
      if (err) {
        res.status(400).json({ message: "User already exists" });
      } else {
        res.json({ message: "Signup successful" });
      }
    }
  );
});

// Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, user) => {
      if (user) {
        res.json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  );
});

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection at:", promise, "reason:", reason);
});
