// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

function connectWithRetry() {
  db = mysql.createConnection(dbConfig);

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      setTimeout(connectWithRetry, 30000); // Retry after 30s seconds
      return;
    }
    console.log("Connected to MySQL");
  });

  return db;
}
connectWithRetry();
// Routes will go here


const registerUser = (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
  
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
      if (err) return res.status(500).send('Error registering user');
      res.status(200).send('User registered successfully');
    });
  };
  
  const loginUser = (req, res) => {
    const { email, password } = req.body;
  
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return res.status(500).send('Error logging in');
      if (results.length === 0) return res.status(404).send('User not found');
  
      const user = results[0];
      const passwordIsValid = bcrypt.compareSync(password, user.password);
  
      if (!passwordIsValid) return res.status(401).send('Invalid password');
  
      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: 86400 });
      res.status(200).send({ auth: true, token });
    });
  };
  
  app.post('/register', registerUser);
  app.post('/login', loginUser);
  
// server.js (continued)
const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send('No token provided');
  
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) return res.status(500).send('Failed to authenticate token');
      req.userId = decoded.id;
      next();
    });
  };
  
  const addTask = (req, res) => {
    const { title, description, due_date } = req.body;
    const userId = req.userId;
  
    db.query('INSERT INTO tasks (title, description, due_date, user_id) VALUES (?, ?, ?, ?)', [title, description, due_date, userId], (err, result) => {
      if (err) return res.status(500).send('Error adding task');
      res.status(200).send('Task added successfully');
    });
  };
  
  const updateTask = (req, res) => {
    const { id, status } = req.body;
  
    db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id], (err, result) => {
      if (err) return res.status(500).send('Error updating task');
      res.status(200).send('Task updated successfully');
    });
  };
  
  const deleteTask = (req, res) => {
    const { id } = req.body;
  
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).send('Error deleting task');
      res.status(200).send('Task deleted successfully');
    });
  };
  
  const getTasks = (req, res) => {
    const userId = req.userId;
  
    db.query('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, results) => {
      if (err) return res.status(500).send('Error fetching tasks');
      res.status(200).send(results);
    });
  };
  
  app.post('/tasks', verifyToken, addTask);
  app.put('/tasks', verifyToken, updateTask);
  app.delete('/tasks', verifyToken, deleteTask);
  app.get('/tasks', verifyToken, getTasks);
  

app.listen(8000, () => {
  console.log('Server started on port 8000****');
});
