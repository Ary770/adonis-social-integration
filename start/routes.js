'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')
const Database = use('Database')

Route.on('/').render('welcome')

Route.get('/users', async () => {
  return await Database.table('users').select('*')
})

Route.get('/logout', 'AuthController.logout').as('logout')
Route.get('/auth/:provider', 'AuthController.redirectToProvider').as('social.login')
Route.get('/authenticated/:provider', 'AuthController.handleProviderCallback').as('social.login.callback')
