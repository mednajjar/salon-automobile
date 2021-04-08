const Owner = require('../models/Owner');
const Client = require('../models/Client');
const bcrypt = require('bcrypt');
const {registerOwner, addCar} = require('../validation/validationForms');
const Car = require('../models/Car');
const Fawn = require("fawn");
const {ifEmailExist} = require('../functions/functions')



exports.registerOwner = async (req, res)=>{
     // check validaton
     const {error} = registerOwner(req.body);
     if(error) return res.status(400).json({err: error.details[0].message, ...req.body}); 
        const {email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 12);
        const ifEmailExist = await Owner.findOne({email}) || await Client.findOne({email});
        if(ifEmailExist) return res.status(400).json('email already exist!');
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
        if(saved) return res.status(201).json('Owner created');
    } catch (error) {
        return res.status(500).json('Error server!')
    }
}

exports.createCar = async (req, res)=>{
    const {error} = addCar(req.body);
    if(error) return res.status(400).json({err: error.details[0].message, ...req.body});
    console.log(req.file);
    try {
        const car = new Car({  
            ...req.body,
            image: req.file.path
        });
        const saveCar = await car.save();
        if(saveCar) return res.status(201).json({message: 'car created', car});
    }catch (err) {
        res.status(400).json({err:'bad reaquest'});
    }
}