import { Entity, Column, Unique, OneToOne, OneToMany } from 'typeorm'
import { CodeToken } from '../CodeToken'
import { BaseAttributes } from '../../../services'
import { Booking } from '../Booking'
import { Rate } from '../Rate'

@Entity()
@Unique(['email'])
export class User extends BaseAttributes {
  @Column({ nullable: false, default: '' })
  first_name!: string

  @Column({ nullable: false, default: '' })
  last_name!: string

  @Column({
    nullable: false,
    default: ''
  })
  email!: string

  @Column({ nullable: false, default: '' })
  password!: string

  @OneToOne(() => CodeToken, (codeToken) => codeToken.user)
  code_token!: CodeToken

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings!: Booking[]

  @OneToMany(() => Rate, (rate) => rate.user)
  rates!: Rate[]
}
