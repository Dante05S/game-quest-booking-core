/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express'
import { authenticate } from '../../middlewares/authenticate'
import { checkRoles } from '../../middlewares/checkRoles'
import bookingController from '../../controllers/booking'
import { validateBody } from '../../middlewares/validateBody'
import { validateCreateSchema } from '../../validators/booking.validator'
import { validateParam } from '../../middlewares/validateParam'

const router = Router()

router.get(
  '/by-user',
  authenticate,
  checkRoles(['USER']),
  bookingController.getAllByUser
)

router.post(
  '/',
  authenticate,
  checkRoles(['USER']),
  validateBody(validateCreateSchema()),
  bookingController.create
)

router.patch(
  '/:id/cancel',
  authenticate,
  checkRoles(['USER']),
  validateParam(),
  bookingController.cancel
)

export default router
