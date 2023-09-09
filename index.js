const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');


app.use(cors());
app.use(express.json());
const users = [];
const { v4: uuidv4 } = require('uuid');