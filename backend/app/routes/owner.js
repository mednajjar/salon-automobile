const express = require('express');
const route = express.Router();
const {registerOwner, createCar} = require('../controllers/ownerController');
const multer = require('../middlewares/multer');

route.post('/registerOwner', registerOwner);
route.post('/addcar',multer, createCar);

module.exports = route;