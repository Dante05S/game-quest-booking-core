import { AppDataSource } from '../database/data-source'
import { Booking } from '../database/entity/Booking'

export const BookingRepository =
  AppDataSource.getRepository(Booking).extend({})
