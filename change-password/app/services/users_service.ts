import User from '#models/user'

interface PostUserInterface {
  fullName?: string | null
  email: string
  password: string
}

export default class UsersService {
  async post({ fullName, email, password }: PostUserInterface) {
    try {
      await User.create({ fullName, email, password })
    } catch (error) {
      throw error
    }
  }
}
