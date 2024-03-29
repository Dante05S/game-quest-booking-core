import { type NextFunction, type Request, type Response } from 'express'
import { ResponseCode, http, error } from '../helpers/request'

export const rootRoute = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const apiKey = req.headers['api-key']
  const frontApiKey = process.env.ROOT_API_KEY

  if (frontApiKey === undefined) {
    res
      .status(ResponseCode.SERVER_ERROR)
      .json(http.error(null, ResponseCode.SERVER_ERROR, ['Access denied']))
    return
  }

  if (apiKey === undefined) {
    res.status(ResponseCode.NOT_AUTHORIZED).send(error.apiKeyHeaderDoesntExist)
    return
  }

  if (apiKey !== frontApiKey) {
    res.status(ResponseCode.NOT_AUTHORIZED).send(error.invalidApiKey)
    return
  }

  next()
}
