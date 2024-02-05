import { type Event } from '..'
import { type BaseAttributes } from '../../../../services'

export interface EventCreate
  extends Omit<Event, keyof BaseAttributes | 'image' | 'bookings' | 'rates'> {}
