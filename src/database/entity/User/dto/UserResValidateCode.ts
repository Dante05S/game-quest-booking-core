import { type UserResRegister } from './UserResRegister'

export interface UserResValidateCode {
  user: UserResRegister
  token: string
}
