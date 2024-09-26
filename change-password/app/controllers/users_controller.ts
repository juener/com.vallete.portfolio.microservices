import UsersService from '#services/users_services'
import { changePasswordUserValidator } from '#validators/users_validator'
import { HttpContext } from '@adonisjs/core/http'
import UnauthorizedError from '../errors/unauthorized_error.js'
import { errors } from '@vinejs/vine'

export default class UsersController {
  async changePassword({ request, response }: HttpContext) {
    try {
      const requestBody = request.body()
      const { uid, oldPassword, newPassword } =
        await changePasswordUserValidator.validate(requestBody)

      const service = new UsersService()
      await service.changePassword({ uid, oldPassword, newPassword })

      return response.status(200)
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(400).json({ errors: error.messages })
      }
      if (error instanceof UnauthorizedError) {
        return response.status(401).json({ errors: error.message })
      }

      return response.status(500).json({ errors: error.message })
    }
  }
}
