import { PDFExtract } from 'pdf.js-extract'

interface QrReaderRequest {
  file: any
}

export default class OcrReaderPdfService {
  async post({ file }: QrReaderRequest) {
    const extractedText = await extractTextFromPDF(file)

    return { extractedText }
  }
}

async function extractTextFromPDF(pdfPath: string): Promise<string> {
  const pdfExtract = new PDFExtract()

  return new Promise((resolve, reject) => {
    pdfExtract.extract(pdfPath, { firstPage: 0 }, (err, data) => {
      if (err || !data) {
        reject(err)
      } else {
        const text = data.pages
          .map((page) => page.content.map((item) => item.str).join(' '))
          .join('\n')
        resolve(text)
      }
    })
  })
}
