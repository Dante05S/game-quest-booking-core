import { Entity, Column } from 'typeorm'
import { BaseAttributes } from '../../../services'

@Entity()
export class Event extends BaseAttributes {
  @Column({ nullable: false, default: '' })
  name!: string

  @Column({ nullable: false, type: 'text' })
  description!: string

  @Column({
    nullable: false
  })
  start_date!: Date

  @Column({ nullable: false, default: 0 })
  available_quotas!: number
}
