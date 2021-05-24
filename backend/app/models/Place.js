const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    place_number: {type: Number, required: true},
    is_free: {type: Boolean, default: true},
})

module.exports = mongoose.model('Place', placeSchema);