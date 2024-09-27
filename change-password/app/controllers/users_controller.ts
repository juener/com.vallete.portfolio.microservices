import UsersService from '#services/users_service'
import {
  deleteUserValidator,
  getUserValidator,
  postUserValidator,
  putUserValidator,
} from '#validators/users_validator'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async getUser({ request, response }: HttpContext) {
    try {
      const requestParams = request.params()
      const { id } = await getUserValidator.validate(requestParams)

      const usersService = new UsersService()
      const user = usersService.getUser({ id })

      return response.status(200).send({ user })
    } catch (error) {
      throw error
    }
  }

  async getUsers({ response }: HttpContext) {
    try {
      const usersService = new UsersService()
      const users = await usersService.getUsers()

      return response.status(200).send({ users })
    } catch (error) {
      throw error
    }
  }

  async post({ request, response }: HttpContext) {
    try {
      const requestBody = request.body()
      const { fullName, email, password } = await postUserValidator.validate(requestBody)

      const usersService = new UsersService()
      await usersService.post({ fullName, email, password })

      return response.status(201)
    } catch (error) {
      throw error
    }
  }

  async put({ request, response }: HttpContext) {
    try {
      const requestBody = request.body()
      const { id, fullName, email, password } = await putUserValidator.validate(requestBody)

      const usersService = new UsersService()
      await usersService.put({ id, fullName, email, password })

      return response.status(200)
    } catch (error) {
      throw error
    }
  }

  async delete({ request, response }: HttpContext) {
    try {
      const requestParams = request.params()
      const { id } = await deleteUserValidator.validate(requestParams)

      const usersService = new UsersService()
      await usersService.delete({ id })

      return response.status(200)
    } catch (error) {}
  }
}
