const Owner = require('../models/Owner');
const Client = require('../models/Client');
const {loginValidation} = require('../validation/validationForms');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res)=>{
    const {email, password} = req.body;
    // check validaton
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json({err: error.details[0].message});

    try {
        // check email user
        const Email = await Owner.findOne({email}) || await Client.findOne({email});
        if(!Email)  return res.status(400).json({err: 'Invalid email or password'});
        console.log(Email.role)
        // compare password user
        const match = await bcrypt.compare(password, Email.password);
        if(!match) return res.status(400).json({err: 'Invalid email or password'});
        const token = jwt.sign({id: Email._id, role: Email.role}, process.env.TOKEN_SECRET, {expiresIn:process.env.EXPIRATION_IN});
        res.cookie('auth_token', token, {maxAge:process.env.EXPIRATION_IN,httpOnly: true});
        return res.status(200).json({token});
    } catch (err) {
        res.status(500).json({error: 'bad request'});
    }
}

exports.logout = (req, res) => {
    res.cookie('auth_token', '', {maxAge: 0, httpOnly: true});
    res.status(200).json('loged out')  
}