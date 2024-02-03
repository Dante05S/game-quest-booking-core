import { type User } from '../database/entity/User'
import Service, { type IService } from '.'
import CodeTokenService from './code-token.service'
import { getContentHtml } from '../utils/email-template'
import { sendEmail } from '../utils/nodemailer-service'
import { UserRepository } from '../repositories/user.repository'
import { type UserResRegister } from '../database/entity/User/dto/UserResRegister'
import { type UserResValidateCode } from '../database/entity/User/dto/UserResValidateCode'
import { type UserResLogin } from '../database/entity/User/dto/UserResLogin'
import { type UserLogin } from '../database/entity/User/dto/UserLogin'
import { type UserCreate } from '../database/entity/User/dto/UserCreate'
import { type RequestCode } from '../database/entity/User/dto/RequestCode'
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  ServerError
} from '../helpers/exceptions-errors'
import bcrypt from 'bcrypt'
import { createToken } from '../helpers/tokenize'
import { AdminRepository } from '../repositories/admin.repository'

interface IAuthService extends IService<User> {
  register: (data: UserCreate) => Promise<UserResRegister>
  validateCode: (data: UserLogin) => Promise<UserResValidateCode>
  login: (data: RequestCode) => Promise<UserResLogin>
  loginAdmin: (data: RequestCode) => Promise<UserResLogin>
  resendCode: (email: string) => Promise<null>
}

class AuthService
  extends Service<User, typeof UserRepository>
  implements IAuthService
{
  constructor() {
    super(UserRepository)
  }

  private async existUserByEmail(email: string): Promise<void> {
    const user = await this.repository.findOneBy({ email: email.toLowerCase() })

    if (user !== null) {
      throw new BadRequestError('Ya hay un usuario registrado con este email')
    }
  }

  private async generateVerifyCode(
    email: string,
    firstName: string,
    lastName: string,
    idUser: string
  ): Promise<void> {
    const codeTokenService = new CodeTokenService()
    const codeToken = await codeTokenService.generate(idUser)

    const contentHtml = getContentHtml(`${firstName} ${lastName}`, codeToken)
    const [success, message] = await sendEmail(
      `'ABS Mailer' <${process.env.NODEMAILER_EMAIL ?? ''}>`,
      email,
      'Codigo de verificación de GameQuestBooking',
      contentHtml
    )
    if (!success) {
      throw new ServerError(message)
    }
  }

  public async register(data: UserCreate): Promise<UserResRegister> {
    // Validate if user exist by name and email
    await this.existUserByEmail(data.email)

    const user = await this.create({
      ...data,
      password: bcrypt.hashSync(data.password, 12),
      email: data.email.toLowerCase()
    })
    await this.generateVerifyCode(
      user.email,
      user.first_name,
      user.last_name,
      user.id
    )
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    }
  }

  public async validateCode(data: UserLogin): Promise<UserResValidateCode> {
    const email = data.email
    const user = await this.repository.getUserByEmail(email)

    if (user === null) {
      throw new NotFoundError('No hay ningun usuario registrado con este email')
    }

    const codeTokenService = new CodeTokenService()
    await codeTokenService.verify(user.id, data.code_token)

    const token = createToken(user.id, 'USER')

    return {
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      },
      token
    }
  }

  public async login(data: RequestCode): Promise<UserResLogin> {
    const user = await this.repository.getUserByEmail(data.email)
    if (user === null)
      throw new NotFoundError('No hay ningun usuario registrado con este email')

    if (!bcrypt.compareSync(data.password, user.password)) {
      throw new NotAuthorizedError('La contraseña es incorrecta')
    }

    await this.generateVerifyCode(
      user.email,
      user.first_name,
      user.last_name,
      user.id
    )
    return {
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      },
      token: null
    }
  }

  public async loginAdmin(data: RequestCode): Promise<UserResLogin> {
    const admin = await AdminRepository.getAdminByEmail(data.email)
    if (admin === null)
      throw new NotFoundError(
        'No hay ningun administrador registrado con este email'
      )

    if (!bcrypt.compareSync(data.password, admin.password)) {
      throw new NotAuthorizedError('La contraseña es incorrecta')
    }

    const token = createToken(admin.id, 'ADMIN')
    return {
      user: {
        id: admin.id,
        first_name: admin.first_name,
        last_name: admin.last_name,
        email: admin.email
      },
      token
    }
  }

  public async resendCode(email: string): Promise<null> {
    const user = await this.repository.getUserByEmail(email)
    if (user === null)
      throw new NotFoundError('No hay ningun usuario registrado con este email')
    await this.generateVerifyCode(
      user.email.toLowerCase(),
      user.first_name,
      user.last_name,
      user.id
    )
    return null
  }
}

export default AuthService
