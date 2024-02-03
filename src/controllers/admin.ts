import { type ResponseController } from '../types/ResponseController'
import { Controller } from '../decorators/Controller'
import AdminService from '../services/admin.service'
import { type ResponseObjectData } from '../helpers/request'
import { type Request } from 'express'
import { type AdminCreate } from '../database/entity/Admin/dto/AdminCreate'
import { type AdminResRegister } from '../database/entity/Admin/dto/AdminResCreate'
import bcrypt from 'bcrypt'

interface IAdminController {
  create: (
    req: Request<ResponseObjectData, any, AdminCreate>
  ) => Promise<ResponseController<AdminResRegister>>
}

@Controller()
class AdminController implements IAdminController {
  public async create(
    req: Request<ResponseObjectData, any, AdminCreate>
  ): Promise<ResponseController<AdminResRegister>> {
    const data = req.body
    const service = new AdminService()
    const admin = await service.create({
      ...data,
      email: data.email.toLowerCase(),
      password: bcrypt.hashSync(data.password, 12)
    })
    const payload: AdminResRegister = {
      id: admin.id,
      first_name: admin.first_name,
      last_name: admin.last_name,
      email: admin.email
    }
    return [payload, 'Create admin Successfully']
  }
}

const adminController = new AdminController()
export default adminController
