const express = require('express');
const route = express.Router();
const {registerClient} = require('../controllers/clientController');

route.post('/', registerClient);

module.exports = route;