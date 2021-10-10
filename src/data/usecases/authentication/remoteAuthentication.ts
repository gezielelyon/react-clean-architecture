import { IHttpPostClient } from '@/data/protocols/http/httpPostClient'
import { AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication {
  // All that's not common to every class instancy is passed by constructor
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient
  ) {}

  public async auth (params: AuthenticationParams): Promise<void> {
    await this.httpPostClient.post({ url: this.url, body: params })
  }
}
