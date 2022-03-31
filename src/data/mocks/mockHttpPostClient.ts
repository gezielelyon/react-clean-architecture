import { HttpPostParams, IHttpPostClient } from '@/data/protocols/http/httpPostClient'
import { HttpResponse, HttpStatusCode } from '@/data/protocols/http/httpResponse'

export class HttpPostClientSpy implements IHttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    status: HttpStatusCode.ok
  }

  public async post ({ url, body }: HttpPostParams): Promise<HttpResponse> {
    this.url = url
    this.body = body

    return await Promise.resolve(this.response)
  }
}
