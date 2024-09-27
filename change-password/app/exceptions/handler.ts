import ConflictException from '#exceptions/conflict_exception'
import { errors as authErrors } from '@adonisjs/auth'
import { errors as validationErrors } from '@vinejs/vine'
import { ExceptionHandler, HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import ThirdAppException from './third_app_exception.js'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof authErrors.E_INVALID_CREDENTIALS) {
      return ctx.response.status(401).send({ errors: error.message })
    }

    if (error instanceof authErrors.E_UNAUTHORIZED_ACCESS) {
      return ctx.response.status(401).send({ errors: error.message })
    }

    if (error instanceof validationErrors.E_VALIDATION_ERROR) {
      return ctx.response.status(400).send({ errors: error.messages })
    }

    if (error instanceof ConflictException) {
      return ctx.response.status(409)
    }

    if (error instanceof ThirdAppException) {
      return ctx.response.status(400).send({ errors: error.message })
    }

    return super.handle(error, ctx)
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
