const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());

let db = new sqlite3.Database('./data.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

app.get('/get_product', (req, res) => {
  const page = req.query.page || 1;
  const limit = 100;
  const offset = (page - 1) * limit;
  const searchQuery = req.query.search || '';

  let sql;
  if (searchQuery) {
    sql = `SELECT * FROM data_table WHERE title LIKE ? LIMIT ? OFFSET ?`;
  } else {
    sql = `SELECT * FROM data_table LIMIT ? OFFSET ?`;
  }

  const params = searchQuery ? [`%${searchQuery}%`, limit, offset] : [limit, offset];

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log(rows)
    res.json(rows);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  process.exit(0);
});

//hello