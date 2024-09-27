import { Exception } from '@adonisjs/core/exceptions'

export default class ResourceNotFoundException extends Exception {
  static status = 500
}