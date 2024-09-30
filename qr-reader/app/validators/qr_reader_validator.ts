import vine from '@vinejs/vine'

export const qrReaderValidator = vine.compile(
  vine.object({
    library: vine.enum(['jsqr', 'zxing']),
    options: vine.object({
      resize: vine.number(),
      threshold: vine.number(),
    }),
    file: vine.file({
      size: '5mb',
      extnames: ['pdf', 'png', 'jpg', 'jpeg'],
    }),
  })
)
