import SessionService from '#services/session_service'
import { loginSessionValidator } from '#validators/session_validator'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async login({ request, response }: HttpContext) {
    try {
      const requestBody = request.only(['email', 'password'])
      const { email, password } = await loginSessionValidator.validate(requestBody)

      const sessionService = new SessionService()
      const { token } = await sessionService.login({ email, password })

      return response.status(200).send({ token })
    } catch (error) {
      throw error
    }
  }
}
