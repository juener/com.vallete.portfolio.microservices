import vine from '@vinejs/vine'

export const loginSessionValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)
