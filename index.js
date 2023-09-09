const express = require('express');
const app = express();
const port = 3002;
const cors = require('cors');


app.use(cors());
app.use(express.json());
const users = [];
const reservations = [];
const { v4: uuidv4 } = require('uuid');

app.get('/api/users', (req, res) => {
    res.json(users);
  });
