import Service, { type IService } from '.'
import { type User } from '../database/entity/User'
import { type UserResRegister } from '../database/entity/User/dto/UserResRegister'
import { UserRepository } from '../repositories/user.repository'

interface IUserService extends IService<User> {
  getByEmail: (email: string) => Promise<UserResRegister>
}

class UserService
  extends Service<User, typeof UserRepository>
  implements IUserService
{
  constructor() {
    super(UserRepository)
  }

  public async getByEmail(email: string): Promise<UserResRegister> {
    const user = await this.getOne({ email }, 'El usario no existe ')
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    }
  }
}

export default UserService
