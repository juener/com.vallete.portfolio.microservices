import env from '#start/env'
import puppeteer from 'puppeteer'
import UnauthorizedError from '../errors/unauthorized_error.js'

interface ChangePasswordInterface {
  uid: string
  oldPassword: string
  newPassword: string
}

export default class UsersService {
  async changePassword({ uid, oldPassword, newPassword }: ChangePasswordInterface) {
    let browser

    try {
      const urlAutoridadeTributaria = env.get('URL_AUTORIDADE_TRIBUTARIA')
      const authenticationNifTabElement = 'label[for="tab2"]'
      // for debug you may try to send the { headless: false, slowMo: 50 } as parameters
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
        ],
      })

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
      throw error
    } finally {
      await browser?.close()
    }
  }
}
