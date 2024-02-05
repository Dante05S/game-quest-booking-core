import { Router } from 'express'
import authRouter from './api/auth'
import adminRouter from './api/admin'
import eventRouter from './api/event'
import userRouter from './api/user'
import bookingRouter from './api/booking'
import rateRouter from './api/rate'
import { ResponseCode, http } from '../helpers/request'

const router = Router()

router.use('/auth', authRouter)
router.use('/admin', adminRouter)
router.use('/event', eventRouter)
router.use('/user', userRouter)
router.use('/booking', bookingRouter)
router.use('/rate', rateRouter)

router.get('/', (_req, res) => {
  res.json(
    http.response(null, ResponseCode.OK, 'Welcome to Game Quest Booking Core!')
  )
})

export default router
