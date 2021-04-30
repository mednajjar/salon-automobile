const Client = require('../models/Client');
const Owner = require('../models/Owner');
const Car = require('../models/Car');
const Try = require('../models/Try');
const bcrypt = require('bcrypt');
const { registerClient } = require('../validation/validationForms');
// const Fawn = require("fawn");
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

let transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    auth: {
        type: 'custom',
        user: process.env.GM_E,
        pass: process.env.GM_P
    }
}));

exports.registerClient = async (req, res) => {
    // check validaton
    const { error } = registerClient(req.body);
    if (error) return res.status(400).json({ err: error.details[0].message, ...req.body });
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const ifEmailExist = await Client.findOne({ email }) || await Owner.findOne({ email });
    if (ifEmailExist) return res.status(400).json('email already exist!');
    const client = new Client({
        ...req.body
    })
    client.password = hashPassword;
    try {
        // const task =  Fawn.Task();
        // const copy = await task.save('Client', client)
        // .save('Auth',
        // {_id: client._id, user_email: client.email, user_pass: client.password, user_role: client.role }
        // )
        // .run({ useMongoose: true })
        // if (task) return res.status(201).json({ copy })
        const saved = await client.save();
        if (saved) return res.status(201).json('Client created');
    } catch (error) {
        throw Error(error)
    }
}

exports.getCar = async (req, res) => {
    try {
        const oneCar = await Car.findById(req.params.id);
        if (oneCar) return res.status(201).json(oneCar)

    } catch (error) {
        return res.status(404).json('Not Found!');

    }

}

exports.tryCar = async (req, res) => {
    // id car
    // id client
    // table client (increment global tries)
    try {

        const tryCar = await Try.findOne({ id_car: req.params.id });
        if (tryCar) return res.status(401).json('Your already try this car');
        const client = await Client.findById(res.locals.auth._id);
        console.log(client.global_tries)
        if (client.global_tries >= 10) return res.status(401).json('You attend number of tries 10');

        const newTry = new Try({
            id_car: req.params.id,
            id_client: client._id
        })
        const updateGlobalTries = await Client.updateOne({ _id: res.locals.auth._id }, { $inc: { global_tries: 1 } });
        const saved = await newTry.save();
        if (updateGlobalTries && saved) return res.status(200).json(`You successfully reserve car for try`);
    } catch (error) {
        throw Error(error)
    }

}

exports.buyCar = async (req, res) => {
    try {
        const buyCar = await Car.findById(req.params.id);
        if (buyCar) res.status(200);
        const owner = await Owner.findOne({ _id: buyCar.id_owner })
        const updateIsSaled = await Car.updateOne({ _id: buyCar._id }, { is_saled: true });
        if (updateIsSaled) res.status(200).json('Please check your email to complet your order! Thank you.')
        const mailOptions = {
            from: process.env.GM_E,
            to: res.locals.auth.email,
            subject: 'fly ticket order',
            html: `<div><h1> You successfully order a car: 😎</h1> <br> <h3>Name:</h3><h4> ${buyCar.name}</h4> <br> <h3>Price:</h3><h4> ${buyCar.price} DH</h4> <br> <h3>mark:</h3> <h4>${buyCar.mark}</h4> <br> <h3>fuel:</h3> <h4>${buyCar.fuel}</h4> <br> <h3>rib of owner:</h3> <h4>${owner.rib}</h4></div>`
        };
        return transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);

            }
        });
    } catch (error) {
        throw Error(error)
    }
}

