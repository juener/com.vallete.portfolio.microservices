import { Exception } from '@adonisjs/core/exceptions'

export default class ThirdAppException extends Exception {
  constructor(message: string) {
    super(message)
  }
}
