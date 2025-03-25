const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config(); // For environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// DB Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'event_ease_user',
  password: process.env.DB_PASSWORD || 'manish123@',
  database: process.env.DB_NAME || 'event_ease_db',
});

// Check DB Connection
connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to DB:', err);
    return;
  }
  console.log('✅ Connected to MySQL Database!');
});

// Test Route
app.get('/', (req, res) => {
  res.send('Welcome to EventEase Auth API!');
});

// SIGNUP Route
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  connection.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ message: 'Error inserting user' });
    }
    res.status(200).json({ message: 'User registered successfully!' });
  });
});

// LOGIN Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required!' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ message: 'Error during login' });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    // Your insert query...
    connection.query('INSERT INTO users SET ?', { username, email, password }, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email already exists!' });
        }
        return res.status(500).json({ error: 'Server error' });
      }
      res.status(201).json({ message: 'User registered!' });
    });
  });
  