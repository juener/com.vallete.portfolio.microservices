import pdfExtract from 'pdf-extract'
import { atcudExtractor } from '../utils/atcud_extractor.js'

interface OcrPdfRequest {
  filePath: string
  options: OptionsParams
}

interface OptionsParams {
  type: string
  ocr_flags: string[]
  density?: number
  preprocess?: string
  scale?: number
  brightness?: number
  contrast?: number
}

export default class OcrPdfService {
  async post({ filePath, options }: OcrPdfRequest) {
    const extractedText = await processPdf(filePath, options)
    const atcudExtracted = atcudExtractor(String(extractedText))

    return { atcudExtracted }
  }
}

function processPdf(filePath: string, options: OptionsParams): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!filePath) return reject(new Error('No input file (PDF) specified.'))

    const processor = pdfExtract(filePath, options, (error: Error) => {
      if (error) {
        reject(error)
      }
    })

    processor.on('complete', (data: any) => {
      console.log(data.text_pages)
      resolve(data.text_pages)
    })

    processor.on('error', (error: Error) => reject(error))
  })
}
