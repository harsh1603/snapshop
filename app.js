const express = require('express');
const pool = require('./db');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// CREATE: Add a new user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const [result] = await pool.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ: Get all users
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE: Modify a user's email by ID
app.put('/users/:id', async (req, res) => {
  const { email } = req.body;
  try {
    await pool.execute('UPDATE users SET email = ? WHERE id = ?', [email, req.params.id]);
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
