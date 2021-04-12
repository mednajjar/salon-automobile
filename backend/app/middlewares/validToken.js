const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner');
const Client = require('../models/Client');

exports.authOwner = (req, res, next) => {
    res.type = "owner";
    next();
}
exports.authClient = (req, res, next) => {
    res.type = "client";
    next();
}

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth_token'];
    console.log(token)
    try{
      const verify = await jwt.verify(token, process.env.TOKEN_SECRET);
      const userLog = verify; 
      console.log(userLog)
    if(verify && userLog.role == res.type){
        if(res.type === 'owner'){
            let auth = await Owner.findById(userLog.id).select('-password');
            res.locals.auth = auth;
            console.log(res.locals.auth._id);
            next();
        }else{
            auth = await Client.findById(userLog.id).select('-password');
            res.locals.auth = auth;
            console.log(res.locals.auth);
            console.log(res.locals.auth._id);
            next();

        }
    }
    else{
        res.status(400).json(`1 private root need ${res.type} to login`);
    }
      
    } catch(err) {
        res.locals.user = null;
        res.cookie('auth_token', '', { maxAge: 1 });
        res.status(400).json(`2 private root need ${res.type} to login`);
    }
};