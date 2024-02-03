import { type User } from '..'
import { type BaseAttributes } from '../../../../services'

export interface UserCreate extends Omit<User, keyof BaseAttributes> {}
