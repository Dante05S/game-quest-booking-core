import { Entity, Column, OneToMany } from 'typeorm'
import { BaseAttributes } from '../../../services'
import { Booking } from '../Booking'
import { Rate } from '../Rate'

@Entity()
export class Event extends BaseAttributes {
  @Column({ nullable: false, default: '' })
  name!: string

  @Column({ nullable: false, type: 'text' })
  description!: string

  @Column({ nullable: true, default: null })
  image!: string

  @Column({
    nullable: false
  })
  start_date!: Date

  @Column({ nullable: false, default: 0 })
  available_quotas!: number

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings!: Booking[]

  @OneToMany(() => Rate, (rate) => rate.event)
  rates!: Rate[]
}
