import vine from '@vinejs/vine'

export const changePasswordUserValidator = vine.compile(
  vine.object({
    uid: vine.string().fixedLength(9),
    oldPassword: vine.string().minLength(6),
    newPassword: vine.string().minLength(6),
  })
)
