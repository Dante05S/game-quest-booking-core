import { AppDataSource } from '../database/data-source'
import { Event } from '../database/entity/Event'

export const EventRepository = AppDataSource.getRepository(Event).extend({})
