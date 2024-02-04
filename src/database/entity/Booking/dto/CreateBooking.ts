import { type Booking } from '..'
import { type BaseAttributes } from '../../../../services'

export interface CreateBooking
  extends Omit<Booking, keyof BaseAttributes | 'status'> {}
