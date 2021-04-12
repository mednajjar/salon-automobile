const express = require('express');
const route = express.Router();
const {registerOwner, createCar, fetchPlace} = require('../controllers/ownerController');
const multer = require('../middlewares/multer');
const {authClient, auth} = require('../middlewares/validToken');

route.post('/registerowner', registerOwner);
route.get('/places', fetchPlace);
route.post('/addcar', multer, createCar);

module.exports = route;