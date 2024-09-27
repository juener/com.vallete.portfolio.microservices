import AutoridadeTributariaService from '#services/autoridade_tributaria'
import { changePasswordUserValidator } from '#validators/autoridade_tributaria_validator'
import { errors as authErrors } from '@adonisjs/auth'
import { HttpContext } from '@adonisjs/core/http'

export default class AutoridadeTributariaController {
  async changePassword({ request, response, auth }: HttpContext) {
    try {
      if (!auth.isAuthenticated) {
        throw new authErrors.E_UNAUTHORIZED_ACCESS('Token is not valid.', {
          guardDriverName: 'api',
        })
      }

      const requestBody = request.body()
      const { uid, oldPassword, newPassword } =
        await changePasswordUserValidator.validate(requestBody)

      const autoridadeTributariaService = new AutoridadeTributariaService()
      await autoridadeTributariaService.changePassword({ uid, oldPassword, newPassword })

      return response.status(200)
    } catch (error) {
      throw error
    }
  }
}
