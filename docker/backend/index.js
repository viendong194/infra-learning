const express = require("express");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");
const app = express();
const port = 8000;
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};
let db;
function connectWithRetry() {
  db = mysql.createConnection(dbConfig);

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      setTimeout(connectWithRetry, 30000); // Retry after 30s seconds
      return;
    }
    console.log("Connected to MySQL");
    runMigrations(db);
  });

  return db;
}

function runMigrations() {
  const migrationFilePath = path.join(__dirname, "migration.sql");
  const migrationSQL = fs.readFileSync(migrationFilePath, "utf-8");
  const migrationCommands = migrationSQL.split(';').filter(cmd => cmd.trim() !== '');

  migrationCommands.forEach((command) => {
    db.query(command, (err, results) => {
      if (err) {
        console.error("Error running migration command:", err);
        return;
      }
      console.log("Migration command ran successfully");
    });
  });
}

connectWithRetry();

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
  console.log(`Backend API listening at http://node:${port}`);
});
