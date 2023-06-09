//imported required NPM modules for the project

const express = require('express');
const fetch = require('isomorphic-fetch');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());



// Static credentials for login
const users = [
  { id: 1, email: 'user1@example.com', password: 'password1' },
  { id: 2, email: 'user2@example.com', password: 'password2' },
  { id: 3, email: 'user3@example.com', password: 'password3' },
];

// Secret key for JWT token
const secretKey = 'your-secret-key';

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, secretKey);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

// Search route
app.get('/api/search', authenticateToken, async (req, res) => {
  const { title } = req.query;
  console.log("heyyyyyyyyyyy");

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });

  }

  //  code for search query


  try {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(title)}`);
    const data = await response.json();
    res.json(data);
    console.log("sucess");

  } catch (error) {
    console.error('Error occurred during search:', error);
    res.status(500).json({ error: 'Internal server error' });
    console.log("error");

  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
