const mongoose = require('mongoose');

const reserveSchema = mongoose.Schema({
    id_car:{type: mongoose.Schema.Types.ObjectId, ref: 'Car'},
    id_client:{type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
    id_owner:{type: mongoose.Schema.Types.ObjectId, ref: 'Owner'},
    proposed_reduction: {type: Number, required: true},
    is_accepted: {type: Boolean, required: true},
})

module.exports = mongoose.model('Reserve', reserveSchema);