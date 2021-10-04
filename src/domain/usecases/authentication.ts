import { AccountModel } from '../models/accountModel'

type AuthenticationParams = {
  email: string
  password: string
}

export interface IAuthenticationProps {
  auth (params: AuthenticationParams): Promise<AccountModel>
}
