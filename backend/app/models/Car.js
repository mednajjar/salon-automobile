const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const carSchema = new Schema({
    registration_number:{type: String, required: true},
    name:{type: String, required: true},
    image:{type: String, required: true},
    mark: {type: String, required: true},
    color: {type: String, required: true},
    price: {type: Number, required: true},
    fuel: {type: String, required: true},
    is_saled: {type: Boolean, default: false},
    id_owner: {type: String}
})

module.exports = model('Car', carSchema);