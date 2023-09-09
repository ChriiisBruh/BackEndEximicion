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

app.get('/api/users/:id', (req,res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Usuario no encontrado');
    res.json(user);
});

app.post('/api/users', (req,res) =>{
    const user = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email
    };
    users.push(user);
    res.status(201).json(user);
});