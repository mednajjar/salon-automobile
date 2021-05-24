const mongoose = require('mongoose');
const {Schema,model} = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const clientSchema = new Schema({
    first_name:{type: String, required: true},
    last_name:{type: String, required: true},
    cin:{type: String, required: true},
    email: {type: String,unique:true, required: true},
    phone: {type: String, required: true},
    password:{type:String, required: true},
    global_tries: {type: Number, default: 0},
    role:{type: String, default:'client'}
})
clientSchema.plugin(uniqueValidator);
module.exports = model('Client', clientSchema);