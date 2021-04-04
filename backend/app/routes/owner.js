const express = require('express');
const route = express.Router();
const {registerOwner} = require('../controllers/ownerController');

route.post('/', registerOwner);

module.exports = route;