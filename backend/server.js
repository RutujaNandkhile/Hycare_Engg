const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "db.json");

const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Signup
app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;
  const db = readDB();

  if (db.users.find(u => u.email === email)) {
    return res.status(400).json({ message: "Email already registered" });
  }

  db.users.push({ name, email, password });
  writeDB(db);

  res.json({ message: "Signup successful" });
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  res.json({ message: "Login successful", user });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
