import Service, { type IService } from '.'
import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
interface IAuthService extends IService<User> {
  index: () => { msg: string }
}

class AuthService extends Service<User> implements IAuthService {
  constructor() {
    super(AppDataSource.getRepository(User))
  }

  public index(): { msg: string } {
    return { msg: 'Data AuthService' }
  }
}

export default AuthService
