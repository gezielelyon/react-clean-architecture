import { HttpPostParams, IHttpPostClient, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

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
