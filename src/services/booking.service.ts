import Service, { type IService } from '.'
import { notify } from '../config/pusher'
import { type Booking } from '../database/entity/Booking'
import { type CreateBooking } from '../database/entity/Booking/dto/CreateBooking'
import { type ResBooking } from '../database/entity/Booking/dto/ResBooking'
import { BookingStatus } from '../enum/booking-status'
import { BadRequestError } from '../helpers/exceptions-errors'
import { BookingRepository } from '../repositories/booking.repository'
import { getDate } from '../utils/formatDate'
import EventService from './event.service'

interface IBookingService extends IService<Booking> {
  createBooking: (data: CreateBooking) => Promise<ResBooking>
  duplicateDates: (data: CreateBooking) => Promise<void>
  getAllByUser: (userId: string) => Promise<Booking[]>
  cancel: (id: string) => Promise<ResBooking>
}

class BookingService
  extends Service<Booking, typeof BookingRepository>
  implements IBookingService
{
  constructor() {
    super(BookingRepository)
  }

  public async validateExistBooking(data: CreateBooking): Promise<void> {
    const booking = await this.repository.findOneBy({
      user_id: data.user_id,
      event_id: data.event_id
    })
    if (booking !== null && booking.status !== BookingStatus.CANCEL) {
      throw new BadRequestError('Ya tienes reservado este evento')
    } else if (booking !== null && booking.status === BookingStatus.CANCEL) {
      throw new BadRequestError('Tienes este evento cancelado')
    }
  }

  public async createBooking(data: CreateBooking): Promise<ResBooking> {
    const booking = await this.create(data)
    const eventService = new EventService()
    const event = await eventService.get(
      booking.event_id,
      'The event does not exist'
    )
    const updateEvent = await eventService.update(
      event.id,
      {
        available_quotas: event.available_quotas - 1
      },
      'The event does not exist'
    )

    // Pusher
    const pusherChannel = 'home-channel'
    const pusherMessage = {
      event: updateEvent
    }
    await notify(pusherChannel, 'change-quota', pusherMessage)

    return {
      id: booking.id,
      user_id: booking.user_id,
      event_id: booking.event_id,
      status: booking.status
    }
  }

  public async duplicateDates(data: CreateBooking): Promise<void> {
    const eventService = new EventService()
    const event = await eventService.get(
      data.event_id,
      'The event does not exist'
    )
    const booking = await this.repository.findOneBy({
      event: { start_date: event.start_date },
      user_id: data.user_id
    })

    if (booking !== null) {
      throw new BadRequestError(
        `Ya tienes un evento reservado para esta fecha (${getDate(event.start_date)})`
      )
    }
  }

  public async getAllByUser(userId: string): Promise<Booking[]> {
    return await this.repository.find({
      select: {
        id: true,
        status: true,
        user_id: true
      },
      relations: {
        event: true
      },
      where: {
        user_id: userId
      },
      order: {
        created_at: 'DESC'
      }
    })
  }

  public async cancel(id: string): Promise<Booking> {
    const booking = await this.update(
      id,
      { status: BookingStatus.CANCEL },
      'The booking does not exist'
    )

    const eventService = new EventService()
    const event = await eventService.get(
      booking.event_id,
      'The event does not exist'
    )
    const updateEvent = await eventService.update(
      event.id,
      {
        available_quotas: event.available_quotas + 1
      },
      'The event does not exist'
    )

    // Pusher
    const pusherChannel = 'home-channel'
    const pusherMessage = {
      event: updateEvent
    }
    await notify(pusherChannel, 'change-quota', pusherMessage)

    return {
      ...booking,
      event: updateEvent
    }
  }
}

export default BookingService
