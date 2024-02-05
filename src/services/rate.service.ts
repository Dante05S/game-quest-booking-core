import dayjs from 'dayjs'
import Service, { type IService } from '.'
import { type Rate } from '../database/entity/Rate'
import { type CreateRate } from '../database/entity/Rate/dto/CreateRate'
import { RateRepository } from '../repositories/rate.repository'
import EventService from './event.service'
import { BadRequestError } from '../helpers/exceptions-errors'
import UserService from './user.service'

interface IRateService extends IService<Rate> {
  createRate: (rate: CreateRate) => Promise<Rate>
}

class RateService
  extends Service<Rate, typeof RateRepository>
  implements IRateService
{
  constructor() {
    super(RateRepository)
  }

  public async createRate(rate: CreateRate): Promise<Rate> {
    const eventService = new EventService()
    const event = await eventService.get(
      rate.event_id,
      'The event does not exist'
    )

    if (dayjs().isBefore(event.start_date)) {
      throw new BadRequestError(
        'Solo se puede comentar o calificar cuando el evento termine'
      )
    }

    const userService = new UserService()
    const user = await userService.get(rate.user_id, 'The user does not exist')

    const newRate = await this.create(rate)
    return {
      ...newRate,
      user
    }
  }

  public async getByEvent(eventId: string): Promise<Rate[]> {
    return await this.repository.find({
      select: {
        id: true,
        comment: true,
        score: true
      },
      relations: {
        user: true
      },
      where: {
        event_id: eventId
      },
      order: {
        created_at: 'DESC'
      }
    })
  }
}

export default RateService
