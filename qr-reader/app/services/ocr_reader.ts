import fs from 'node:fs'
import os from 'node:os'
import { join } from 'node:path'
import { convert } from 'pdf-poppler'
import Tesseract from 'tesseract.js'
import { atcudExtractor } from '../utils/atcud_extractor.js'

interface OcrReaderRequest {
  file: any
}

export default class OcrReaderService {
  async post({ file }: OcrReaderRequest) {
    let pngPath = file.tmpPath

    if (file.extname === 'pdf') {
      pngPath = await convertPdfToPng(file.tmpPath)
    }

    const ocrText = await performOCR(pngPath)
    const atcudExtracted = atcudExtractor(ocrText)

    return { atcudExtracted }
  }
}

async function convertPdfToPng(file: any): Promise<string> {
  const outputDir = os.tmpdir()
  const outputFile = join(outputDir, `${file.clientName.replace('.pdf', '')}-1.png`)

  try {
    await convert(file.tmpPath, {
      format: 'png',
      out_dir: outputDir,
      out_prefix: file.clientName.replace('.pdf', ''),
      dpi: 600,
      antialiasing: 4,
      density: 4600,
      quality: 100,
    })

    return outputFile
  } catch (error) {
    throw new Error('Failed to convert PDF to PNG')
  }
}

async function performOCR(imagePath: string): Promise<string> {
  if (!fs.existsSync(imagePath)) {
    throw new Error('Imagem não encontrada: ' + imagePath)
  }

  const result = await Tesseract.recognize(imagePath, 'por+eng')

  // console.log(result.data.text)
  return result.data.text
}
