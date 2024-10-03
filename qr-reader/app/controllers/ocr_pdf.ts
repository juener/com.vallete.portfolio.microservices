import OcrPdfService from '#services/ocr_pdf'
import { ocrPdfValidator } from '#validators/ocr_pdf_validator'
import { HttpContext } from '@adonisjs/core/http'

export default class OcrPdfController {
  async post({ request, response }: HttpContext) {
    const file = request.file('file')
    const optionsJson = request.input('options')
    const options = JSON.parse(optionsJson)
    // const options = {
    //   type: 'ocr',
    //   ocr_flags: ['-l por', '--oem 1', '--psm 1'],
    //   // preprocess: 'threshold,blur,scale',
    //   // contrast: 50,
    //   // brightness: 10,
    //   // scale: 2,
    //   // preprocess: 'threshold,blur,sharpen',
    //   density: 300,
    //   // preprocess: 'threshold,sharpen',
    // }

    if (!file?.tmpPath) {
      return response.status(400).send({ error: 'no tmpPath' })
    }

    const ocrPdfService = new OcrPdfService()
    const { atcudExtracted } = await ocrPdfService.post({ filePath: file.tmpPath, options })

    return response.status(200).send({ atcudExtracted })
  }
}
