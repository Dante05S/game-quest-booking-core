import { type ResponseController } from '../types/ResponseController'
import { Controller } from '../decorators/Controller'
import EventService from '../services/event.service'
import { type Request } from 'express'
import { type ResponseObjectData } from '../helpers/request'
import { type EventCreate } from '../database/entity/Event/dto/CreateEvent'
import { type Event } from '../database/entity/Event'

interface IEventController {
  create: (
    req: Request<ResponseObjectData, any, EventCreate>
  ) => Promise<ResponseController<EventCreate>>
  getAll: () => Promise<ResponseController<Event[]>>
  uploadImage: (
    req: Request<{ id: string }, any, any>
  ) => Promise<ResponseController<Event>>
}

@Controller()
class EventController implements IEventController {
  public async create(
    req: Request<ResponseObjectData, any, EventCreate>
  ): Promise<ResponseController<EventCreate>> {
    const data = req.body
    const service = new EventService()
    const event = await service.create(data)

    const payload: EventCreate = {
      name: event.name,
      description: event.description,
      start_date: event.start_date,
      available_quotas: event.available_quotas
    }

    return [payload, 'Create event successfully']
  }

  public async getAll(): Promise<ResponseController<Event[]>> {
    const service = new EventService()
    const events = await service.getAll()
    return [events, 'Get all events successfully']
  }

  public async uploadImage(
    req: Request<{ id: string }, any, any>
  ): Promise<ResponseController<Event>> {
    const id = req.params.id
    const service = new EventService()
    const event = await service.uploadImage(id, req.file!)
    return [event, 'Upload image succesfully']
  }
}

const eventController = new EventController()
export default eventController
