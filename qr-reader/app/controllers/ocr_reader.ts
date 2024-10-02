import { HttpContext } from '@adonisjs/core/http'
import OcrReaderService from '#services/ocr_reader'

export default class OcrReaderController {
  async post({ request, response }: HttpContext) {
    const selectedFile = request.file('file')
    if (!selectedFile?.tmpPath) {
      throw new Error('no tmpPath')
    }

    const ocrReaderService = new OcrReaderService()
    const { atcudExtracted } = await ocrReaderService.post({ file: selectedFile })

    return response.status(200).send({ atcud: atcudExtracted })
  }
}
