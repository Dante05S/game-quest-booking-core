/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express'
import eventController from '../../controllers/event'
import { authenticate } from '../../middlewares/authenticate'
import { checkRoles } from '../../middlewares/checkRoles'
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
  authenticate,
  checkRoles(['ADMIN']),
  validateBody(validateCreateSchema()),
  eventController.create
)
router.put(
  '/:id/upload-image',
  authenticate,
  checkRoles(['ADMIN']),
  validateParam(),
  multipartFormDataParser.single('file'),
  validateFile,
  eventController.uploadImage
)

export default router
