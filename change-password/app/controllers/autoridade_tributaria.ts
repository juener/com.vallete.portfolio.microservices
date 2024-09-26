import AutoridadeTributariaService from '#services/autoridade_tributaria'
import { changePasswordUserValidator } from '#validators/autoridade_tributaria_validator'
import { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'
import UnauthorizedError from '../errors/unauthorized_error.js'

export default class AutoridadeTributariaController {
  async changePassword({ request, response, auth }: HttpContext) {
    if (!auth.isAuthenticated) {
      throw new UnauthorizedError('Token is not valid.')
    }

    try {
      const requestBody = request.body()
      const { uid, oldPassword, newPassword } =
        await changePasswordUserValidator.validate(requestBody)

      const autoridadeTributariaService = new AutoridadeTributariaService()
      await autoridadeTributariaService.changePassword({ uid, oldPassword, newPassword })

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
