import Service, { type IService } from '.'
import { type Event } from '../database/entity/Event'
import { EventRepository } from '../repositories/event.repository'
import { uploadImage } from '../utils/storage-service'

interface IEventService extends IService<Event> {
  uploadImage: (id: string, file: Express.Multer.File) => Promise<Event>
}

class EventService
  extends Service<Event, typeof EventRepository>
  implements IEventService
{
  constructor() {
    super(EventRepository)
  }

  public async uploadImage(
    id: string,
    file: Express.Multer.File
  ): Promise<Event> {
    await this.get(id, 'The event doesn`t exist')
    const url = await uploadImage(file, `event/${id}`, id)
    const updateEvent = await this.update(
      id,
      { image: url },
      'The event doesn`t exist'
    )
    return updateEvent
  }
}

export default EventService
