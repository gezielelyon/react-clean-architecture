import { HttpPostParams, IHttpPostClient } from '@/data/protocols/http/httpPostClient'
import { HttpResponse, HttpStatusCode } from '@/data/protocols/http/httpResponse'

export class HttpPostClientSpy<T, R> implements IHttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    status: HttpStatusCode.ok
  }

  public async post ({ url, body }: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = url
    this.body = body

    return await Promise.resolve(this.response)
  }
}
