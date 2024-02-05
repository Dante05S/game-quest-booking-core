import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { BaseAttributes } from '../../../services'
import { Event } from '../Event'
import { User } from '../User'

@Entity()
export class Rate extends BaseAttributes {
  @Column({ nullable: false, type: 'text' })
  comment!: string

  @Column({ nullable: true, type: 'tinyint', default: 0 })
  score!: number

  @Column({ nullable: false })
  event_id!: string

  @Column({ nullable: false })
  user_id!: string

  @ManyToOne(() => Event, (event) => event.rates)
  @JoinColumn({ name: 'event_id' })
  event!: Event

  @ManyToOne(() => User, (user) => user.rates)
  @JoinColumn({ name: 'user_id' })
  user!: User
}
