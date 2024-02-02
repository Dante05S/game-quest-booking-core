import { type ResponseController } from '../types/ResponseController'
import { Controller } from '../decorators/Controller'
import AuthService from '../services/auth.service'

interface IAuthController {
  index: () => ResponseController<{ msg: string }>
}

@Controller()
class AuthController implements IAuthController {
  public index(): ResponseController<{ msg: string }> {
    const service = new AuthService()
    const data = service.index()
    return [data, 'Get data auth successfully']
  }
}

const authController = new AuthController()
export default authController
