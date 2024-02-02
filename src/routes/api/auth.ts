/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express'
import authController from '../../controllers/auth'

const router = Router()

router.get('/', authController.index)

export default router
