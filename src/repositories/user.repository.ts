import { AppDataSource } from '../database/data-source'
import { User } from '../database/entity/User'

export const UserRepository = AppDataSource.getRepository(User).extend({
  async getUserByEmail(email: string) {
    return await this.createQueryBuilder('user')
      .select([
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.email',
        'user.password'
      ])
      .where('user.email = :email', {
        email: email.toLowerCase()
      })
      .getOne()
  }
})
