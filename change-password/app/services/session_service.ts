import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import UnauthorizedError from '../errors/unauthorized_error.js'

interface LoginInterface {
  email: string
  password: string
}

export default class SessionService {
  async login({ email, password }: LoginInterface) {
    try {
      const user = await User.findBy('email', email)
      if (!user) {
        throw new UnauthorizedError('Email or password is not valid.')
      }

      const isPasswordValid = await hash.verify(user.password, password)
      if (!isPasswordValid) {
        throw new UnauthorizedError('Email or password is not valid.')
      }

      const token = await User.accessTokens.create(user, ['server:create', 'server:read', '*'], {
        name: 'auth_token',
      })

      return {
        token,
      }
    } catch (error) {
      throw error
    } finally {
    }
  }
}
