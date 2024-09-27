import ConflictException from '#exceptions/conflict_exception'
import User from '#models/user'
import ResourceNotFoundException from '#exceptions/resource_not_found_exception'

interface GetUserRequest {
  id: number
}

interface GetUsersResponse {
  users: {
    id: number
    fullName?: string | null
    email: string
  }[]
}

interface PostUserRequest {
  fullName?: string | null
  email: string
  password: string
}

interface PutUserRequest {
  id: number
  fullName?: string | null
  email: string
  password: string
}

interface DeleteUserRequest {
  id: number
}

export default class UsersService {
  async getUser({ id }: GetUserRequest) {
    try {
      const user = await User.findBy({ id })
      return { user }
    } catch (error) {
      throw error
    }
  }

  async getUsers(): Promise<GetUsersResponse> {
    try {
      const users = await User.all()

      if (users.length === 0) {
        throw new ResourceNotFoundException()
      }

      return { users }
    } catch (error) {
      throw error
    }
  }

  async post({ fullName, email, password }: PostUserRequest) {
    try {
      await User.create({ fullName, email, password })
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException()
      }
      throw error
    }
  }

  async put({ id, fullName, email, password }: PutUserRequest) {
    try {
      await User.query().where('id', id).update({ fullName, email, password })
    } catch (error) {
      throw error
    }
  }

  async delete({ id }: DeleteUserRequest) {
    try {
      const user = await User.findOrFail({ id })
      await user.delete()
    } catch (error) {
      throw error
    }
  }
}
