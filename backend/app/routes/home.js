const express = require('express');
const route = express.Router();
const { fetchCars } = require('../controllers/homeController');
const { Client, auth } = require('../middlewares/validToken');
const { getCar, tryCar, buyCar } = require('../controllers/clientController');

route.get('/cars', Client , auth, fetchCars)
route.get('/:id', Client, auth, getCar);
route.post('/try/:id', Client, auth, tryCar);
route.post('/buy/:id', Client, auth, buyCar);

module.exports = route;