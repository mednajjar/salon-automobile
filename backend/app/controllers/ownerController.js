const Owner = require('../models/Owner');
const Client = require('../models/Client');
const bcrypt = require('bcrypt');
const { registerOwner, addCar } = require('../validation/validationForms');
const Car = require('../models/Car');
const Fawn = require("fawn");
const Place = require('../models/Place');
const fs = require('fs');


exports.registerOwner = async (req, res) => {
    // check validaton
    const { error } = registerOwner(req.body);
    if (error) return res.status(400).json({ err: error.details[0].message, ...req.body });
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const ifEmailExist = await Owner.findOne({ email }) || await Client.findOne({ email });
    if (ifEmailExist) return res.status(400).json('email already exist!');
    const owner = new Owner({
        ...req.body
    })
    owner.password = hashPassword;
    try {
        const saved = await owner.save();
        if (saved) return res.status(201).json('Owner created');
    } catch (error) {
        return res.status(500).json('Error server!')
    }
}

exports.createCar = async (req, res) => {
    const { error } = addCar(req.body);
    if (error) return res.status(400).json({ err: error.details[0].message, ...req.body });

    const car = new Car({
        ...req.body,
        image: req.file.path,
        id_owner: res.auth._id
    });

    const places = await Place.findOne({ is_free: true });
    if (!places) return res.status(400).json('no place aviable');
    console.log('places', places)
    try {
        const task = Fawn.Task();
        const taches = await task.save('Car', car)
            .save('OwnerCar',
                { id_owner: res.auth._id, id_car: car._id, id_place: places._id }
            )
            .update('place',
                { _id: places._id }, { is_free: false })
            .run({ useMongoose: true })
        console.log('task', task)
        if (task) return res.status(201).json({ taches })
    } catch (err) {
        res.status(400).json({ err: 'bad reaquest' });
    }
}

exports.updateCar = async (req, res) => {
    try {
        const data = req.file ? {
            ...req.body,
            image: req.file.path
        } : { ...req.body }
        const car = await Car.updateOne({ _id: req.params.id }, { ...data });
        if (car) res.status(201).json(car)
    } catch (error) {
        throw Error(error)
    }

}
exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findOne({ _id: req.params.id });
        const filename = car.image.split('uploads\\')[1];
        console.log(filename)
        fs.unlink(`uploads/${filename}`, async () => {
            const deleted = await Car.deleteOne({ _id: car._id })
            if (deleted) return res.status(200).json('car deleted')
        })

    } catch (error) {
        throw Error(error)
    }

}

exports.fetchPlace = async (req, res) => {
    try {
        const places = await Place.find({ is_free: true });
        if (places) return res.status(200).json(places)
    } catch (error) {
        throw Error(error)
    }
}

exports.fetchCars = async (req, res) => {
    try {
        const getData = await Car.find();
        if (getData) return res.status(200).json(getData)

    } catch (error) {
        res.status(500).json({ err: 'no data found' });
    }

}

exports.getCar = async (req, res) => {
    try {
        const oneCar = await Car.findOne({ _id: req.params.id });
        if (oneCar) return res.status(200).json(oneCar)

    } catch (error) {
        return res.status(404).json('Not Found!');

    }

}
