import { type Admin } from '..'

export type AdminResRegister = Pick<
  Admin,
  'id' | 'first_name' | 'last_name' | 'email'
>
