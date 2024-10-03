import vine from '@vinejs/vine'

export const ocrPdfValidator = vine.compile(
  vine.object({
    file: vine.file({
      size: '5mb',
      extnames: ['pdf'],
    }),
    options: vine.object({
      type: vine.enum(['ocr']),
      ocr_flags: vine.array(vine.enum(['-l por', '-l eng', '--oem 1', '--psm 1', '--psm 6'])),
      density: vine.number().optional(),
      preprocess: vine.string().optional(),
      scale: vine.number().optional(),
      brightness: vine.number().optional(),
      contrast: vine.number().optional(),
    }),
  })
)
