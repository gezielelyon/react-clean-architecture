export class UnexpectedError extends Error {
  constructor () {
    super('Algo de errado aconteceu, por favor tente novamente mais tarde')
    this.name = 'UnexpectedError'
  }
}
