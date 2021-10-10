import faker from 'faker'

import { RemoteAuthentication } from '@/data/usecases/authentication/remoteAuthentication'
import { HttpPostClientSpy } from '@/data/mocks/mockHttpPostClient'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()

    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
