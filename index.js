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
    const user = users.find(u => u.id === req.params.id);
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

app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
  
    // Realiza la actualización del usuario
    user.name = req.body.name;
    user.email = req.body.email;
    res.json(user);
  });

  app.delete('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).send('Usuario no encontrado');
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.json(user);
  });

  app.post('/api/reservations', (req,res) => {
    const reservation = {
        id : uuidv4(),
        userId : req.body.userId,
        application: req.body.application,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    };
    reservations.push(reservation);
    res.status(201).json(reservation)
  });

  app.get('/api/reports/:userId'), (req,res)=>{
    const userId = req.params.userId;
    const userReservations = reservations.filter(r= r.userId === userId);

    res.json(userReservations);
  }

// Datos semilla para usuarios
const seedUsers = [
    {
      id: uuidv4(),
      name: "Usuario 1",
      email: "usuario1@example.com",
    },
    {
      id: uuidv4(),
      name: "Usuario 2",
      email: "usuario2@example.com",
    },
    {
      id: uuidv4(),
      name: "Usuario 3",
      email: "usuario3@example.com",
    },
  ];
  
  // Datos semilla para reservas
const seedReservations = [
    {
      id: uuidv4(),
      userId: seedUsers[0].id,
      application: "Aplicación A",
      startDate: "2023-09-10",
      endDate: "2023-09-20",
    },
    {
      id: uuidv4(),
      userId: seedUsers[1].id,
      application: "Aplicación B",
      startDate: "2023-09-15",
      endDate: "2023-09-25",
    },
    {
      id: uuidv4(),
      userId: seedUsers[0].id,
      application: "Aplicación C",
      startDate: "2023-09-12",
      endDate: "2023-09-22",
    },
];
  
  
  users.push(...seedUsers);
  reservations.push(...seedReservations);
  






app.listen(port, () => {
    console.log(`API  en el puerto ${port}`);
  });