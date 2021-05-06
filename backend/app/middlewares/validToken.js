const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner');
const Client = require('../models/Client');

exports.Owner = (req, res, next) => {
    res.role = "owner";
    res.Model = Owner
    console.log("Owner")
    next();
}
exports.Client = (req, res, next) => {
    res.role = "client";
    res.Model = Client;
    next();
}

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth_token'];
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (decodedToken && res.role === decodedToken.role) {
                res.auth = await res.Model.findOne({ _id: decodedToken.id }).select('-password')
                next()
            } else {
                res.clearCookie('auth_token').json({ role: '', isAuthenticated: false })
            }
        });

    } else {
        return res.json({ role: '', isAuthenticated: false });
    }
};

exports.isAuth = (req, res) => {
    const token = req.cookies['auth_token'];
    if (token) {
        // console.log(token)
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                console.log('error')
                return res.clearCookie('auth_token').json({ role: '', isAuthenticated: false });
            } else {
                console.log('not error')
                console.log(decodedToken)
                return res
                    .status(200)
                    .json({ role: decodedToken.role, isAuthenticated: true });
            }
        });

    } else {
        console.log('notToken')
        return res.json({ role: '', isAuthenticated: false });
    }
};