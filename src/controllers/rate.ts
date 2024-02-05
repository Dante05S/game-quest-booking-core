import { type ResponseController } from '../types/ResponseController'
import { Controller } from '../decorators/Controller'
import RateService from '../services/rate.service'
import { type Request } from 'express'
import { type CreateRate } from '../database/entity/Rate/dto/CreateRate'
import { type Rate } from '../database/entity/Rate'

interface IRateController {
  create: (
    req: Request<any, any, CreateRate>
  ) => Promise<ResponseController<Rate>>
  getByEvent: (
    req: Request<{ eventId: string }, any, any>
  ) => Promise<ResponseController<Rate[]>>
}

@Controller()
class RateController implements IRateController {
  public async getByEvent(
    req: Request<{ eventId: string }, any, any>
  ): Promise<ResponseController<Rate[]>> {
    const eventId = req.params.eventId
    const service = new RateService()
    const rates = await service.getByEvent(eventId)
    return [rates, 'Get data rate successfully']
  }

  public async create(
    req: Request<any, any, CreateRate>
  ): Promise<ResponseController<Rate>> {
    const data = req.body
    const service = new RateService()
    const rate = await service.createRate(data)
    return [rate, 'Get data rate successfully']
  }
}

const rateController = new RateController()
export default rateController
