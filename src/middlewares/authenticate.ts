import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError
} from 'jsonwebtoken'
import { ResponseCode, error, http } from '../helpers/request'
import { type NextFunction, type Request, type Response } from 'express'
import { type TokenPayload } from '../interfaces/token-payload.interface'
import { type CustomRequest } from '../interfaces/custom-request'
import { UserRepository } from '../repositories/user.repository'
import { AdminRepository } from '../repositories/admin.repository'
import { NotAuthorizedError } from '../helpers/exceptions-errors'

export const authenticate = async(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.headers.authorization === undefined) {
      res
        .status(ResponseCode.NOT_AUTHORIZED)
        .send(error.authorizationHeaderDoesntExist)
        return
    }
    const bearer = req.headers.authorization.split(' ')[0]

    if (bearer !== 'Bearer') {
      res.status(ResponseCode.NOT_AUTHORIZED).send(error.invalidBodyToken)
      return
    }

    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(
      token,
      process.env.TOKEN_SECRET_KEY ?? ''
    ) as TokenPayload

    let user = null
    switch (payload.type) {
      case 'USER':
        user = await UserRepository.findOneBy({ id: payload.id })
        break
      case 'ADMIN':
        user = await AdminRepository.findOneBy({ id: payload.id })
        break
    }

    if (user === null) {
      throw new NotAuthorizedError('Invalid Token')
    }

    (req as unknown as CustomRequest).token = token;
    (req as unknown as CustomRequest).id = payload.id;
    (req as unknown as CustomRequest).type = payload.type

    next()
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      res.status(ResponseCode.NOT_AUTHORIZED).send(error.expiredToken)
      return
    }
    if (e instanceof JsonWebTokenError || e instanceof NotBeforeError) {
      res
        .status(ResponseCode.NOT_AUTHORIZED)
        .send(error.invalidToken(e.message))
      return
    }
    res
      .status(ResponseCode.SERVER_ERROR)
      .send(http.error(null, ResponseCode.SERVER_ERROR, [(e as Error).message]))
      
  }
}
