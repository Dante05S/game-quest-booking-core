import { Entity, Column, Unique } from 'typeorm'
import { BaseAttributes } from '../../../services'

@Entity()
@Unique(['email'])
export class Admin extends BaseAttributes {
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
}
