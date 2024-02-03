/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express'
import eventController from '../../controllers/event'
import { authenticate } from '../../middlewares/authenticate'
import { checkRoles } from '../../middlewares/checkRoles'
import { publicRoute } from '../../middlewares/publicRoute'
import { validateBody } from '../../middlewares/validateBody'
import { validateCreateSchema } from '../../validators/event.validator'

const router = Router()

router.post(
  '/',
  authenticate,
  checkRoles(['ADMIN']),
  validateBody(validateCreateSchema()),
  eventController.create
)
router.get('/', publicRoute, eventController.getAll)

export default router
