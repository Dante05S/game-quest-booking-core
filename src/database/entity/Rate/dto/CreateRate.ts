import { type Rate } from '..'
import { type BaseAttributes } from '../../../../services'

export interface CreateRate extends Omit<Rate, keyof BaseAttributes> {}
