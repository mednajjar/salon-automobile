const express = require('express');
const route = express.Router();
const {login, logout} = require('../controllers/authController');

route.get('/login', login);
route.get('/logout', logout);

module.exports = route;