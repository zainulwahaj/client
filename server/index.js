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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
