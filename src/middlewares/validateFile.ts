import { type NextFunction, type Request, type Response } from 'express'
import { ResponseCode, http } from '../helpers/request'

export const validateFile = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.file === undefined) {
    res
      .status(ResponseCode.BAD_REQUEST)
      .json(
        http.error(null, ResponseCode.BAD_REQUEST, [
          'Debe enviar alguna imagen en el campo file'
        ])
      )
    return
  }
  next()
}
