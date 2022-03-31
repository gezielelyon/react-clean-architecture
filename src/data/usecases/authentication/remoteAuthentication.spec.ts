import faker from 'faker'

import { RemoteAuthentication } from '@/data/usecases/authentication/remoteAuthentication'
import { HttpPostClientSpy } from '@/data/mocks/mockHttpPostClient'
import { HttpStatusCode } from '@/data/protocols/http/httpResponse'

import { mockAccountModel, mockAuthentication } from '@/domain/tests/mockAccount'
import { InvalidCredentialsError } from '@/domain/errors/invalidCredentialsError'
import { UnexpectedError } from '@/domain/errors/unexpectedError'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models/accountModel'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()

    const { sut, httpPostClientSpy } = makeSut(url) // SUT meaning Suit Under Tests

    await sut.auth(mockAuthentication())

    expect(httpPostClientSpy.url).toBe(url) // toBe Compare pointers
  })

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthentication()

    await sut.auth(authenticationParams)

    expect(httpPostClientSpy.body).toEqual(authenticationParams) // toEqual Compare object values
  })

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      status: HttpStatusCode.unauthorized
    }

    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      status: HttpStatusCode.badRequest
    }

    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      status: HttpStatusCode.notFound
    }

    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      status: HttpStatusCode.serverError
    }

    const promise = sut.auth(mockAuthentication())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockAccountModel()

    httpPostClientSpy.response = {
      status: HttpStatusCode.ok,
      body: httpResult
    }

    const account = await sut.auth(mockAuthentication())

    expect(account).toEqual(httpResult)
  })
})
