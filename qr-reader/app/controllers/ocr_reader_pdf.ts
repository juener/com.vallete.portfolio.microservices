import OcrReaderPdfService from '#services/ocr_reader_pdf'
import { HttpContext } from '@adonisjs/core/http'

export default class OcrReaderController {
  async post({ request, response }: HttpContext) {
    const file = request.file('file')
    if (!file?.tmpPath) {
      return response.status(400).send({ error: 'no tmpPath' })
    }

    const ocrReaderPdfService = new OcrReaderPdfService()
    const { extractedText } = await ocrReaderPdfService.post({ file })

    return response.status(200).send({ text: extractedText })
  }
}
