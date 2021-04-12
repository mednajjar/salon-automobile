const express = require('express');
const route = express.Router();
const {registerClient, getCar, tryCar, buyCar} = require('../controllers/clientController');
const {authClient, auth} = require('../middlewares/validToken');

route.post('/registerclient', registerClient);
route.get('/:id', getCar);
route.post('/try/:id', tryCar);
route.post('/buy/:id', buyCar);

module.exports = route;