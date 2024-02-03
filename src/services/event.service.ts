import Service, { type IService } from '.'
import { type Event } from '../database/entity/Event'
import { EventRepository } from '../repositories/event.repository'

interface IEventService extends IService<Event> {}

class EventService
  extends Service<Event, typeof EventRepository>
  implements IEventService
{
  constructor() {
    super(EventRepository)
  }
}

export default EventService
