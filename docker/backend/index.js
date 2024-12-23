const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 8000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.get("/users", (req, res) => {
  db.query("SELECT id, name, email FROM users", (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Error fetching users");
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Backend API listening at http://localhost:${port}`);
});
