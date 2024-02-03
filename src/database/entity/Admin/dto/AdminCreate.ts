import { type Admin } from '..'
import { type BaseAttributes } from '../../../../services'

export interface AdminCreate extends Omit<Admin, keyof BaseAttributes> {}
