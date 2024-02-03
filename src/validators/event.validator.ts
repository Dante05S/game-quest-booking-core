import Joi from 'joi'

export const validateCreateSchema = (): Joi.ObjectSchema => {
  return Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    start_date: Joi.date().required(),
    available_quotas: Joi.number().integer().positive().allow(0).required()
  })
}
