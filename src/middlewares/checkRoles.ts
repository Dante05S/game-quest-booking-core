import { type Request, type NextFunction, type Response } from 'express'
import { ResponseCode, http } from '../helpers/request'
import { type RolPayload } from '../interfaces/token-payload.interface'
import { type CustomRequest } from '../interfaces/custom-request'

export const checkRoles = (roles: RolPayload[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Verify checkRoles
      if (!roles.includes((req as CustomRequest).type)) {
        res
          .status(ResponseCode.NOT_AUTHORIZED)
          .json(
            http.error(null, ResponseCode.NOT_AUTHORIZED, [
              'No autorizado. El usuario no tiene permisos para esta acción'
            ])
          )
        return
      }
      next()
    } catch (e) {
      res
        .status(ResponseCode.SERVER_ERROR)
        .send(
          http.error(null, ResponseCode.SERVER_ERROR, [(e as Error).message])
        )
    }
  }
}
