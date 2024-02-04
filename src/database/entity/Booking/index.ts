import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { BaseAttributes } from '../../../services'
import { User } from '../User'
import { Event } from '../Event'
import { BookingStatus } from '../../../enum/booking-status'

@Entity()
export class Booking extends BaseAttributes {
  @Column({ nullable: false })
  user_id!: string

  @Column({ nullable: false })
  event_id!: string

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.ACTIVE
  })
  status!: BookingStatus

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'user_id' })
  user!: User

  @ManyToOne(() => Event, (event) => event.bookings)
  @JoinColumn({ name: 'event_id' })
  event!: Event
}
