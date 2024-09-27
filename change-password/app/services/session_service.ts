import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { errors as authErrors } from '@adonisjs/auth'

interface LoginInterface {
  email: string
  password: string
}

export default class SessionService {
  async login({ email, password }: LoginInterface) {
    try {
      const user = await User.findBy('email', email)
      if (!user) {
        throw new authErrors.E_INVALID_CREDENTIALS()
      }

      const isPasswordValid = await hash.verify(user.password, password)
      if (!isPasswordValid) {
        throw new authErrors.E_INVALID_CREDENTIALS()
      }

      const token = await User.accessTokens.create(user, ['server:create', 'server:read', '*'], {
        name: 'auth_token',
      })

      return {
        token,
      }
    } catch (error) {
      throw error
    }
  }
}
