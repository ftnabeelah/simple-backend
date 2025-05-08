const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

// Environment variables
const PORT = process.env.PORT || 8080;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT || 3306;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

if (!DB_HOST || !DB_NAME || !DB_USER || !DB_PASSWORD) {
  console.error('Missing one or more required database environment variables.');
  process.exit(1);
}

// Create a connection pool so the app can handle concurrent requests efficiently.
const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Simple health-check route so you know your app is up.
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Example API route that fetches rows from a sample table.
app.get('/products', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    console.error('Error querying MySQL:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
}); 