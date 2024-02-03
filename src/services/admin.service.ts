import Service, { type IService } from '.'
import { type Admin } from '../database/entity/Admin'
import { AdminRepository } from '../repositories/admin.repository'

interface IAdminService extends IService<Admin> {}

class AdminService
  extends Service<Admin, typeof AdminRepository>
  implements IAdminService
{
  constructor() {
    super(AdminRepository)
  }
}

export default AdminService
