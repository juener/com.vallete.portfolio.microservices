/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const SessionController = () => import('#controllers/session_controller')
const AutoridadeTributariaController = () => import('#controllers/autoridade_tributaria')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

/*
    /session
*/
router.post('/session/login', [SessionController, 'login'])

/*
    /users
*/
router.get('/users/:id', [UsersController, 'getUser'])
router.get('/users', [UsersController, 'getUsers'])
router.post('/users', [UsersController, 'post'])
router.put('/users', [UsersController, 'put'])
router.delete('/users/:id', [UsersController, 'delete'])

/*
    /users
*/
router
  .put('/autoridade-tributaria/change-password', [AutoridadeTributariaController, 'changePassword'])
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )
