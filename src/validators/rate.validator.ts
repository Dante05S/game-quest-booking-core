import Joi from 'joi'

export const validateCreateSchema = (): Joi.ObjectSchema => {
  return Joi.object({
    user_id: Joi.string().required(),
    event_id: Joi.string().required(),
    comment: Joi.string().allow('').required(),
    score: Joi.number().min(0).max(5).allow(null).required()
  })
}
