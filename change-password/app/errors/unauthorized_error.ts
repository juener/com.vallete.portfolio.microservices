export default class UnauthorizedError extends Error {
  constructor(message: string) {
    super(`Unauthorized. ${message}`)
  }
}
