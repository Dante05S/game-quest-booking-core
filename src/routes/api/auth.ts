/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express'
import authController from '../../controllers/auth'
import { publicRoute } from '../../middlewares/publicRoute'
import { validateBody } from '../../middlewares/validateBody'
import {
  validateLoginSchema,
  validateRegisterSchema,
  validateRequestCodeSchema,
  validateResendCodeSchema
} from '../../validators/auth.validator'

const router = Router()

router.post(
  '/register',
  publicRoute,
  validateBody(validateRegisterSchema()),
  authController.register
)
router.post(
  '/validate-code',
  publicRoute,
  validateBody(validateLoginSchema()),
  authController.validateCode
)
router.post(
  '/login',
  publicRoute,
  validateBody(validateRequestCodeSchema()),
  authController.login
)
router.post(
  '/login/admin',
  publicRoute,
  validateBody(validateRequestCodeSchema()),
  authController.loginAdmin
)

router.post(
  '/resend-code',
  publicRoute,
  validateBody(validateResendCodeSchema()),
  authController.resendCode
)

export default router
