import { AppDataSource } from '../database/data-source'
import { Rate } from '../database/entity/Rate'

export const RateRepository =
  AppDataSource.getRepository(Rate).extend({})
