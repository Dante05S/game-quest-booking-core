import { type ResponseController } from '../types/ResponseController'
import { Controller } from '../decorators/Controller'
import BookingService from '../services/booking.service'
import { type Request } from 'express'
import { type CreateBooking } from '../database/entity/Booking/dto/CreateBooking'
import { type ResBooking } from '../database/entity/Booking/dto/ResBooking'
import { type CustomRequest } from '../interfaces/custom-request'
import { type Booking } from '../database/entity/Booking'

interface IBookingController {
  create: (
    req: Request<any, any, CreateBooking>
  ) => Promise<ResponseController<ResBooking>>
  getAllByUser: (req: CustomRequest) => Promise<ResponseController<Booking[]>>
  cancel: (
    req: Request<{ id: string }, any, any>
  ) => Promise<ResponseController<ResBooking>>
}

@Controller()
class BookingController implements IBookingController {
  public async create(
    req: Request<any, any, CreateBooking>
  ): Promise<ResponseController<ResBooking>> {
    const data = req.body
    const service = new BookingService()

    // Validate if exist a booking
    await service.validateExistBooking(data)

    // Validate if there are 2 events with equal dates
    await service.duplicateDates(data)

    // Create a booking
    const booking = await service.createBooking(data)
    return [booking, 'Create booking successfully']
  }

  public async getAllByUser(
    req: CustomRequest
  ): Promise<ResponseController<Booking[]>> {
    const userId = req.id
    const service = new BookingService()
    const bookings = await service.getAllByUser(userId)
    return [bookings, 'get bookings by user successfully']
  }

  public async cancel(
    req: Request<{ id: string }, any, any>
  ): Promise<ResponseController<ResBooking>> {
    const id = req.params.id
    const service = new BookingService()
    const bookings = await service.cancel(id)
    return [bookings, 'Cancel booking successfully']
  }
}

const bookingController = new BookingController()
export default bookingController
