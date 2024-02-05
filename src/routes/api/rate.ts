/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express'
import rateController from '../../controllers/rate'
import { authenticate } from '../../middlewares/authenticate'
import { checkRoles } from '../../middlewares/checkRoles'
import { validateBody } from '../../middlewares/validateBody'
import { validateCreateSchema } from '../../validators/rate.validator'
import { validateParam } from '../../middlewares/validateParam'
import { publicRoute } from '../../middlewares/publicRoute'

const router = Router()

router.get(
  '/:eventId/by-event',
  publicRoute,
  validateParam(),
  rateController.getByEvent
)

router.post(
  '/',
  authenticate,
  checkRoles(['USER']),
  validateBody(validateCreateSchema()),
  rateController.create
)

export default router
