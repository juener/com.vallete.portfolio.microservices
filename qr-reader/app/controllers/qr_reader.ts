import QrReaderService from '#services/qr_reader'
import { qrReaderValidator } from '#validators/qr_reader_validator'
import { HttpContext } from '@adonisjs/core/http'

export default class QrReaderControllerX {
  async post({ request, response }: HttpContext) {
    const libraryParam = request.input('library', 'jsqr')
    const optionsJson = request.input('options', '{ resize: 1200, threshold: 140 }')
    const optionsParam = JSON.parse(optionsJson)
    const fileParam = request.file('file')

    const params = {
      library: libraryParam,
      options: optionsParam,
      file: fileParam,
    }

    const { library, options, file } = await qrReaderValidator.validate(params)

    if (!file) {
      return response.status(400).send({ message: 'Image has not been sent.' })
    }

    const qrReaderService = new QrReaderService()
    const { result } = await qrReaderService.post({
      library,
      options,
      file,
    })

    return response.status(200).send({ qrCodeData: result })
  }
}
