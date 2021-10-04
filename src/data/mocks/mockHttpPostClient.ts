import { IHttpPostClient } from '../protocols/http/httpPostClient'

export class HttpPostClientSpy implements IHttpPostClient {
  url?: string

  public async post (url: string): Promise<void> {
    this.url = url

    return await Promise.resolve()
  }
}
