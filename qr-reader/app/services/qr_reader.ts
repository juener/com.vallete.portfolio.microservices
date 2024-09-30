import jsqr from 'jsqr'
import fs from 'node:fs'
import sharp from 'sharp'

interface QrReaderRequest {
  library: string
  options: {
    resize: number
    threshold: number
  }
  file: any
}

interface ReadWithJsqrRequest {
  attempts: {
    resize: number
    threshold: number
    blur: number
  }[]
  image: any
}

interface QRResult {
  [key: string]: string
}

const keyMapping: { [key: string]: string } = {
  A: 'nifDoEmitente',
  B: 'nifDoAdquirente',
  C: 'paisDoAdquirente',
  D: 'tipoDeDocumento',
  E: 'estadoDoDocumento',
  F: 'dataDoDocumento',
  G: 'idDoDocumento',
  H: 'ATCUD',
  I1: 'espacoFiscal',
  I7: 'baseTributavelDeIvaTaxaNormal',
  I8: 'totalIvaTaxaNormal',
  N: 'totalDeImpostos',
  O: 'totalDoDocumentoComImpostos',
  Q: 'caracteresDoHash',
  R: 'numDoCertificado',
}

export default class QrReaderService {
  async post({ library, options, file }: QrReaderRequest) {
    const attempts = [
      { resize: options.resize, threshold: options.threshold, blur: 0.5 },
      { resize: 1000, threshold: 128, blur: 0.5 },
      { resize: 1500, threshold: 150, blur: 0.3 },
      { resize: 800, threshold: 100, blur: 0.7 },
      { resize: 1800, threshold: 180, blur: 0.3 },
      { resize: 2200, threshold: 220, blur: 0.3 },
      { resize: 400, threshold: 50, blur: 1 },
    ]

    const image = await this.convertPdfToPng(file)

    if (!image) {
      throw new Error('Failed to process image')
    }

    const qr = library === 'zxing' ? () => 1 + 1 : await this.readWithJsqr({ attempts, image })

    if (!qr) {
      throw new Error('Failed to read QR code')
    }

    const parts = String(qr).split('*')

    const result: QRResult = parts.reduce((acc, curr) => {
      const [key, value] = curr.split(':')
      if (key && value !== undefined) {
        const newKey = keyMapping[key] || key
        acc[newKey] = value
      }
      return acc
    }, {} as QRResult)

    return { result }
  }

  async readWithJsqr({ attempts, image }: ReadWithJsqrRequest) {
    for (const attempt of attempts) {
      try {
        const processedImageBuffer = await sharp(image.buffer || image.tmpPath)
          .resize(attempt.resize, attempt.resize, { fit: 'inside' })
          .greyscale()
          .sharpen()
          .normalize()
          .blur(attempt.blur)
          .threshold(attempt.threshold)
          .png()
          .toBuffer()

        const { data, info } = await sharp(processedImageBuffer)
          .raw()
          .toBuffer({ resolveWithObject: true })

        const qr = jsqr(new Uint8ClampedArray(data), info.width, info.height)

        if (qr) {
          return qr.data
        }
      } catch (error) {
        console.error('Error processing image:', error)
      }
    }

    throw new Error('Failed to read QR code after all attempts')
  }

  async convertPdfToPng(file: any): Promise<{ buffer: Buffer; tmpPath?: string }> {
    if (file.extname !== 'pdf') {
      return { buffer: file.buffer, tmpPath: file.tmpPath }
    }

    throw new Error('Not available reading of PDF files.')
  }
}
