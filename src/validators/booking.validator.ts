import Joi from 'joi'

export const validateCreateSchema = (): Joi.ObjectSchema => {
  return Joi.object({
    user_id: Joi.string().required(),
    event_id: Joi.string().required()
  })
}
