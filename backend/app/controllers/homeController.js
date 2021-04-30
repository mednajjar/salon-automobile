const Car = require('../models/Car');

exports.fetchCars = async (req, res) => {
    try {
        const getData = await Car.find({ is_saled: false });
        if (getData) return res.status(201).json(getData)

    } catch (error) {
        res.status(500).json({ err: 'no data found' });
    }

}
