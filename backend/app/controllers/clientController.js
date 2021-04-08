const Client = require('../models/Client');
const Owner = require('../models/Owner');
const bcrypt = require('bcrypt');
const {registerClient} = require('../validation/validationForms');
const Fawn = require("fawn");


exports.registerClient = async (req, res)=>{
     // check validaton
     const {error} = registerClient(req.body);
     if(error) return res.status(400).json({err: error.details[0].message, ...req.body});
        const {email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 12);
        const ifEmailExist = await Client.findOne({email}) || await Owner.findOne({email}) ;
        if(ifEmailExist) return res.status(400).json('email already exist!');
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
        if(saved) return res.status(201).json('Client created');
    } catch (error) {
        throw Error(error)
    }
}