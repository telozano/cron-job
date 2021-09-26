const Joi = require('joi')

const pokemonValidator = Joi.object().keys(
    {
        nombre: Joi.string().min(3).required(),
        peso: Joi.number().max(1000).required(),
        familia: Joi.valid('bajitos', 'medianos', 'altos').required()
    }
)

module.exports = pokemonValidator