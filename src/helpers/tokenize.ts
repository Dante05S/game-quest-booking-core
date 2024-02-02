import dayjs from 'dayjs'
import { type TokenPayload } from '../interfaces/token_payload.interface'
import jwt from 'jsonwebtoken'
import { ServerError } from './exceptions_errors'

export const createToken = (
  userId: string,
  type: 'access' | 'refresh' = 'access'
): string => {
  const exp =
    type === 'access'
      ? dayjs().add(5, 'hour').endOf('hour').unix()
      : dayjs().add(2, 'month').endOf('month').unix()

  const payload: TokenPayload = {
    user_id: userId,
    pusher_channel: `USER_${userId}`,
    iat: dayjs().unix(),
    exp
  }
  if (type === 'refresh') {
    if (process.env.REFRESH_TOKEN_SECRET_KEY === undefined) {
      throw new ServerError('The token secret is required')
    }
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY)
  }

  if (process.env.TOKEN_SECRET_KEY === undefined) {
    throw new ServerError('The token secret is required')
  }
  return jwt.sign(payload, process.env.TOKEN_SECRET_KEY)
}
