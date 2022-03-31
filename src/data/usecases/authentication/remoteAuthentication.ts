import { IHttpPostClient } from '@/data/protocols/http/httpPostClient'
import { HttpStatusCode } from '@/data/protocols/http/httpResponse'
import { InvalidCredentialsError } from '@/domain/errors/invalidCredentialsError'
import { AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication {
  // All that's not common to every class instancy is passed by constructor
  constructor (
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient
  ) {}

  public async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: params })

    switch (httpResponse.status) {
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        return await Promise.resolve()
    }
  }
}
