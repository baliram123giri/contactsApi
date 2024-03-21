const Joi = require("joi");

const createWebsiteValidation = Joi.object({
    name: Joi.string().required(),
})
const updateWebsiteValidation = Joi.object({
    name: Joi.string().optional(),
})

module.exports = { createWebsiteValidation, updateWebsiteValidation }