import faker from 'faker'

import { RemoteAuthentication } from '@/data/usecases/authentication/remoteAuthentication'
import { HttpPostClientSpy } from '@/data/mocks/mockHttpPostClient'
import { mockAuthentication } from '@/domain/tests/mockAuthentication'

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
    await sut.auth(mockAuthentication())

    expect(httpPostClientSpy.url).toBe(url) // toBe Compare pointers
  })

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthentication()

    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams) // toEqual Compare object values
  })
})
