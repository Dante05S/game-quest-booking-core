import { type ResponseController } from '../types/ResponseController'
import { Controller } from '../decorators/Controller'
import AuthService from '../services/auth.service'
import { type ResponseObjectData } from '../helpers/request'
import { type UserCreate } from '../database/entity/User/dto/UserCreate'
import { type UserLogin } from '../database/entity/User/dto/UserLogin'
import { type UserResValidateCode } from '../database/entity/User/dto/UserResValidateCode'
import { type RequestCode } from '../database/entity/User/dto/RequestCode'
import { type UserResLogin } from '../database/entity/User/dto/UserResLogin'
import { type UserResRegister } from '../database/entity/User/dto/UserResRegister'
import { type User } from '../database/entity/User'
import { type Request } from 'express'

interface IAuthController {
  register: (
    req: Request<ResponseObjectData, any, UserCreate>
  ) => Promise<ResponseController<UserResRegister>>
  validateCode: (
    req: Request<ResponseObjectData, any, UserLogin>
  ) => Promise<ResponseController<UserResValidateCode>>
  login: (
    req: Request<ResponseObjectData, any, RequestCode>
  ) => Promise<ResponseController<UserResLogin>>
  loginAdmin: (
    req: Request<ResponseObjectData, any, RequestCode>
  ) => Promise<ResponseController<UserResLogin>>
  resendCode: (
    req: Request<ResponseObjectData, any, Pick<User, 'email'>>
  ) => Promise<ResponseController>
}

@Controller()
class AuthController implements IAuthController {
  public async register(
    req: Request<ResponseObjectData, any, UserCreate>
  ): Promise<ResponseController<UserResRegister>> {
    const data = req.body
    const authService = new AuthService()
    const user = await authService.register(data)
    return [user, 'User register successfully']
  }

  public async validateCode(
    req: Request<ResponseObjectData, any, UserLogin>
  ): Promise<ResponseController<UserResValidateCode>> {
    const data = req.body
    const authService = new AuthService()
    const user = await authService.validateCode(data)
    return [user, 'Login user Successfully']
  }

  public async login(
    req: Request<ResponseObjectData, any, RequestCode>
  ): Promise<ResponseController<UserResLogin>> {
    const data = req.body
    const authService = new AuthService()
    const request = await authService.login(data)
    return [request, 'Login user Successfully']
  }

  public async loginAdmin(
    req: Request<ResponseObjectData, any, RequestCode>
  ): Promise<ResponseController<UserResLogin>> {
    const data = req.body
    const authService = new AuthService()
    const request = await authService.loginAdmin(data)
    return [request, 'Login admin Successfully']
  }

  public async resendCode(
    req: Request<ResponseObjectData, any, Pick<User, 'email'>>
  ): Promise<ResponseController> {
    const data = req.body
    const authService = new AuthService()
    const request = await authService.resendCode(data.email)
    return [request, 'Resend verification code Successfully']
  }
}

const authController = new AuthController()
export default authController
