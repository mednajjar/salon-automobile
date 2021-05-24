const Joi = require('joi');

exports.registerOwner = data=>{

    const schema = Joi.object({
    first_name: Joi.string().min(3).max(100).required(),
    last_name: Joi.string().min(3).max(100).required(),
    cin: Joi.string().min(4).max(10).required(),
    email: Joi.string().email().required(),
    rib: Joi.string().min(24).required(),
    phone:Joi.string().min(10).max(14).required(),
    password:Joi.string().min(6).required()
})
    return schema.validate(data)
}
exports.registerClient = data=>{

    const schema = Joi.object({
    first_name: Joi.string().min(3).max(100).required(),
    last_name: Joi.string().min(3).max(100).required(),
    cin: Joi.string().min(4).max(10).required(),
    email: Joi.string().email().required(),
    phone:Joi.string().min(10).max(14).required(),
    password:Joi.string().min(6).required()
})
    return schema.validate(data)
}
exports.loginValidation = data=>{

    const schema = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().required()
})
    return schema.validate(data)
}

exports.addCar = data=>{

    const schema = Joi.object({
    registration_number: Joi.string().required(),
    name: Joi.string().required(),
    mark: Joi.string().required(),
    color: Joi.string().required(),
    price:Joi.number().required(),
    fuel:Joi.string().required()
})
    return schema.validate(data)
}