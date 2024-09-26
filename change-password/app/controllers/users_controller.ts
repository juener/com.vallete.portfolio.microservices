import UsersService from '#services/users_service'
import { postUserValidator } from '#validators/users_validator'
import { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'

export default class UsersController {
  async post({ request, response }: HttpContext) {
    try {
      const requestBody = request.body()
      const { fullName, email, password } = await postUserValidator.validate(requestBody)

      const userService = new UsersService()
      await userService.post({ fullName, email, password })

      return response.status(201)
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(400).json({ errors: error.messages })
      }

      return response.status(500).send({ errors: error })
    }
  }
}
