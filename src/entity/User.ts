import { Entity, Column } from 'typeorm'
import { BaseAttributes } from '../services'

@Entity()
export class User extends BaseAttributes {
  @Column()
  firstName!: string

  @Column()
  lastName!: string

  @Column()
  age!: number
}
