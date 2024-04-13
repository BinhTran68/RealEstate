const Joi = require("joi");

exports.string = Joi.string().allow(null, '')
exports.stringRequired = Joi.string().required()
exports.numberRequired = Joi.string().required()
exports.number = Joi.string().allow(null, '')
exports.array = Joi.array().allow(null, '')
exports.arrayRequired = Joi.array().required()



