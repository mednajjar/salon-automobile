const express = require('express');
const route = express.Router();
const {fetchCars} = require('../controllers/homeController');
// const {authClient, auth} = require('../middlewares/validToken');

route.get('/cars', fetchCars)

module.exports = route;