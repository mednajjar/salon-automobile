const Owner = require('../models/Owner');
const Client = require('../models/Client');
const bcrypt = require('bcrypt');
const { registerOwner, addCar } = require('../validation/validationForms');
const Car = require('../models/Car');
const Fawn = require("fawn");
const Place = require('../models/Place');



exports.registerOwner = async (req, res) => {
    // check validaton
    // const { error } = registerOwner(req.body);
    // if (error) return res.status(400).json({ err: error.details[0].message, ...req.body });
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const ifEmailExist = await Owner.findOne({ email }) || await Client.findOne({ email });
    if (ifEmailExist) return res.status(400).json('email already exist!');
    const owner = new Owner({
        ...req.body
    })
    owner.password = hashPassword;
    try {
        // const task =  Fawn.Task();
        // const copy = await task.save('Owner', owner)
        // .save('Auth',
        // {_id: owner._id, user_email: owner.email, user_pass: owner.password, user_role: owner.role }
        // )
        // .run({ useMongoose: true })
        // if (task) return res.status(201).json({ copy })
        const saved = await owner.save();
        if (saved) return res.status(201).json('Owner created');
    } catch (error) {
        return res.status(500).json('Error server!')
    }
}

exports.createCar = async (req, res) => {
    const { error } = addCar(req.body);
    if (error) return res.status(400).json({ err: error.details[0].message, ...req.body });
    delete req.body.image;
    const car = new Car({
        ...req.body,
        image: req.file.path,
        id_owner: res.auth._id
    });;
    const places = await Place.findOne({ is_free: true });
    try {
        const task = Fawn.Task();
        const taches = await task.save('Car', car)
            .save('OwnerCar',
                { id_owner: res.auth._id, id_car: car._id, id_place: places._id }
            )
            .update('place',
                {_id: places._id}, {is_free: false})
            .run({ useMongoose: true })
        if (task) return res.status(201).json({ taches })
        // const saveCar = await car.save();
        // if(saveCar) return res.status(201).json({message: 'car created', car});
    } catch (err) {
        res.status(400).json({ err: 'bad reaquest' });
    }
}

exports.fetchPlace = async (req, res) => {
    try {
        const places = await Place.find({ is_free: true });
        if (places) return res.status(201).json(places)
    } catch (error) {
        throw Error(error)
    }
}

exports.fetchCars = async (req, res) => {
    try {
        const getData = await Car.find({ is_saled: false });
        if (getData) return res.status(201).json(getData)

    } catch (error) {
        res.status(500).json({ err: 'no data found' });
    }

}
