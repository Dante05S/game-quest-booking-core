/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express'
import eventController from '../../controllers/event'
import { publicRoute } from '../../middlewares/publicRoute'
import { validateBody } from '../../middlewares/validateBody'
import { validateCreateSchema } from '../../validators/event.validator'
import multipartFormDataParser from '../../middlewares/multiFormDataParser'
import { validateFile } from '../../middlewares/validateFile'
import { validateParam } from '../../middlewares/validateParam'

const router = Router()
router.get('/', publicRoute, eventController.getAll)
router.get('/:id', publicRoute, validateParam(), eventController.getById)
router.post(
  '/',
  publicRoute,
  validateBody(validateCreateSchema()),
  eventController.create
)
router.put(
  '/:id/upload-image',
  publicRoute,
  validateParam(),
  multipartFormDataParser.single('file'),
  validateFile,
  eventController.uploadImage
)

export default router
