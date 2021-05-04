const express = require('express');
const route = express.Router();
const {registerOwner, createCar, fetchCars, updateCar, deleteCar, getCar} = require('../controllers/ownerController');
const multer = require('../middlewares/multer');
const {Owner, auth} = require('../middlewares/validToken');

route.post('/registerowner', registerOwner);
route.get('/cars/fetch', Owner, auth, fetchCars)
route.post('/addcar',Owner, auth,multer, createCar);
route.put('/updateCar/:id',Owner, auth,multer, updateCar)
route.delete('/deleteCar/:id',Owner, auth, deleteCar)
route.get('/car/:id',Owner, auth, getCar)

module.exports = route;