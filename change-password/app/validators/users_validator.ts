import vine from '@vinejs/vine'

export const getUserValidator = vine.compile(
  vine.object({
    id: vine.number().transform((param) => Number(param)),
  })
)

export const postUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(3).optional(),
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)

export const putUserValidator = vine.compile(
  vine.object({
    id: vine.number(),
    fullName: vine.string().minLength(3).optional(),
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)

export const deleteUserValidator = vine.compile(
  vine.object({
    id: vine.number().transform((param) => Number(param)),
  })
)
