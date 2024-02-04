import { type Booking } from '..'

export type ResBooking = Pick<Booking, 'id' | 'event_id' | 'user_id' | 'status'>
