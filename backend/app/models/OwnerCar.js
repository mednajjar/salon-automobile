const mongoose = require('mongoose');

const ownerCarSchema = mongoose.Schema({
    id_car:{type: mongoose.Schema.Types.ObjectId, ref: 'Car'},
    id_owner:{type: mongoose.Schema.Types.ObjectId, ref: 'Owner'},
    id_place:{type: mongoose.Schema.Types.ObjectId, ref: 'Place'},
})

module.exports = mongoose.model('OwnerCar', ownerCarSchema);