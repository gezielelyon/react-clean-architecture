import { HttpResponse } from './httpResponse'

export type HttpPostParams = {
  url: string
  body?: object
}

export interface IHttpPostClient {
  post: (params: HttpPostParams) => Promise<HttpResponse>
}
