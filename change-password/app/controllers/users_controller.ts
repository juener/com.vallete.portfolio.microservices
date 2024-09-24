import { HttpContext } from '@adonisjs/core/http'
import puppeteer from 'puppeteer' // puppeteer-core for performance // puppeteer for visual
import { z, ZodError } from 'zod'
import UnauthorizedError from '../errors/unauthorized_error.js'

export default class UsersController {
  async changePassword({ request, response }: HttpContext) {
    const changePasswordBodyRequest = z.object({
      uid: z.string().length(9),
      oldPassword: z.string().min(6),
      newPassword: z.string().min(6),
    })

    const { uid, oldPassword, newPassword } = changePasswordBodyRequest.parse(request.body())

    const urlAutoridadeTributaria =
      'https://www.acesso.gov.pt/alterarDadosAcessoForm?partID=PFAP&path=/geral/dashboard&authMethods=NIF,CARTAO_DE_CIDADAO'

    const authenticationNifTabElement = 'label[for="tab2"]'

    // for debug you may try to send the { headless: false, slowMo: 50 } as parameters
    const browser = await puppeteer.launch({
      slowMo: 50,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
      ],
    })

    try {
      const page = await browser.newPage()
      await page.goto(urlAutoridadeTributaria)
      await page.setViewport({ width: 1080, height: 1024 })

      await page.waitForSelector(authenticationNifTabElement)
      await page.click(authenticationNifTabElement)

      await page.waitForSelector('#username')
      await page.type('#username', uid)
      await page.type('#password-nif', oldPassword)
      await page.click('#sbmtLogin')

      const usernameError = await page.$('#username.error')
      const formError = await page.$('.error-message')

      if (usernameError || formError) {
        const usernameErrorExtractedText = usernameError
          ? await page.evaluate((el) => el.getAttribute('title'), usernameError)
          : ''

        const formErrorExtractedText = formError
          ? await page.evaluate((el) => el.innerText, formError)
          : ''

        throw new UnauthorizedError(`${usernameErrorExtractedText} ${formErrorExtractedText}`)
      }

      await page.waitForSelector('#changePassword')
      await page.click('#changePassword')

      await page.type('#newPassword', newPassword)
      await page.locator('#newPasswordConfirmation').fill(newPassword)
      await page.click('#submitButton')

      await page.waitForSelector('.user-quit a')
      await page.click('.user-quit a')
    } catch (error) {
      if (error instanceof ZodError) {
        return response.status(400).json({ message: `Validation errors: ${error.format()}` })
      }

      if (error instanceof UnauthorizedError) {
        return response.status(401).json({ message: `${error.message}` })
      }

      return response.status(500).json({ message: error.message })
    } finally {
      await browser.close()
    }

    return response.status(200).json({ message: 'The password has been changed successfully.' })
  }
}
