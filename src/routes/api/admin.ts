/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express'
import adminController from '../../controllers/admin'
import { rootRoute } from '../../middlewares/rootRoute'
import { validateBody } from '../../middlewares/validateBody'
import { validateRegisterSchema } from '../../validators/auth.validator'

const router = Router()

router.post(
  '/',
  rootRoute,
  validateBody(validateRegisterSchema()),
  adminController.create
)

export default router
