/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const QrReaderController = () => import('#controllers/qr_reader')
import router from '@adonisjs/core/services/router'

router.get('/', async () => 'It works!')
router.post('/qr-reader', [QrReaderController, 'post'])
