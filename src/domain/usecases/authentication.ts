import { AccountModel } from '@/domain/models/accountModel'

export type AuthenticationParams = {
  email: string
  password: string
}

export interface IAuthentication {
  auth: (params: AuthenticationParams) => Promise<AccountModel>
}
