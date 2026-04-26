const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let users = [];

// Signup
app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  const exists = users.find(u => u.email === email);
  if (exists) return res.json({ message: "User already exists" });

  users.push({ email, password });
  res.json({ message: "Signup successful" });
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.json({ message: "Invalid credentials" });

  res.json({ message: "Login successful" });
});

// Test route
app.get('/', (req, res) => {
  res.send("Cloud Coffee API Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
