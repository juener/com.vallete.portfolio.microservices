/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const QrReaderController = () => import('#controllers/qr_reader')
const OcrReaderController = () => import('#controllers/ocr_reader')
const OcrReaderPdfController = () => import('#controllers/ocr_reader_pdf')
import router from '@adonisjs/core/services/router'

router.get('/', async () => 'It works!')
router.post('/qr-reader', [QrReaderController, 'post'])
router.post('/ocr-reader', [OcrReaderController, 'post'])
router.post('/ocr-reader_pdf', [OcrReaderPdfController, 'post'])
