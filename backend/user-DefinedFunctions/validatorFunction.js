const Joi = require('joi')
const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    passwordConfirm: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' }),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    cin: Joi.string().required(),
    phone: Joi.string().required(),
    dialCode: Joi.string().optional().default('+216'),
    street: Joi.string().optional().allow(null),
    governorate: Joi.string().optional().allow(null),
    postalcode: Joi.string().optional(),
    gender: Joi.string().valid('female', 'male', 'custom').required(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
    image: Joi.string().optional().allow(null)
})
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})
const updateTaskSchema = Joi.object({
    taskId: Joi.string().required(),
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    completed: Joi.boolean().optional()
})
const deleteTaskSchema = Joi.object({
    taskId: Joi.string().required()
})
const createTaskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    completed: Joi.boolean().optional().default(false)
})
module.exports = {
    registerSchema,
    loginSchema,
    createTaskSchema,
    updateTaskSchema,
    deleteTaskSchema
}
