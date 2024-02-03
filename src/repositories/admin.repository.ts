import { AppDataSource } from '../database/data-source'
import { Admin } from '../database/entity/Admin'

export const AdminRepository = AppDataSource.getRepository(Admin).extend({
  async getAdminByEmail(email: string) {
    return await this.createQueryBuilder('admin')
      .select([
        'admin.id',
        'admin.first_name',
        'admin.last_name',
        'admin.email',
        'admin.password'
      ])
      .where('admin.email = :email', {
        email: email.toLowerCase()
      })
      .getOne()
  }
})
