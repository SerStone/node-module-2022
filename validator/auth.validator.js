const Joi = require("joi");

const regexp = require('../config/regexp.enum')

module.exports = {
    loginValidator: Joi.object({
        email: Joi.string().regex(regexp.EMAIL).lowercase().required(),
        password: Joi.string().regex(regexp.PASSWORD).required()
    })
}
