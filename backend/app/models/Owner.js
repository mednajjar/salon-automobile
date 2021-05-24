const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ownerSchema = mongoose.Schema({
    first_name:{type: String, required: true},
    last_name:{type: String, required: true},
    cin: {type: String, required: true},
    email: {type: String, unique: true,required: true},
    rib: {type: String, required: true},
    phone: {type: String, required: true},
    password:{type:String, required: true},
    role:{type:String, default: 'owner'}
})

ownerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Owner', ownerSchema);