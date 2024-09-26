import vine from '@vinejs/vine'

export const postUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(3).optional(),
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)
