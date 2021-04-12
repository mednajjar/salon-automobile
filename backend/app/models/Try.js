const mongoose = require('mongoose');

const trySchema = mongoose.Schema({
    id_car: {type: mongoose.Schema.Types.ObjectId, ref: 'Car'},
    id_client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
})

module.exports = mongoose.model('Try', trySchema);