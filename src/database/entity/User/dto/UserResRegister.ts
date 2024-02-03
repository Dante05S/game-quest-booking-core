import { type User } from '..'

export type UserResRegister = Pick<
  User,
  'id' | 'first_name' | 'last_name' | 'email'
>
