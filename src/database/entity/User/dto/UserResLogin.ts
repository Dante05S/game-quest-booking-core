import { type UserResRegister } from './UserResRegister'

export interface UserResLogin {
  user: UserResRegister
  token: string | null
}
