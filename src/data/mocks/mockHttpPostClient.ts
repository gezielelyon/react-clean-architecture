import { HttpPostParams, IHttpPostClient } from '@/data/protocols/http/httpPostClient'

export class HttpPostClientSpy implements IHttpPostClient {
  url?: string
  body?: object

  public async post ({ url, body }: HttpPostParams): Promise<void> {
    this.url = url
    this.body = body

    return await Promise.resolve()
  }
}
