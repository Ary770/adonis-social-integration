'use strict'

const User = use('App/Models/User')
const Request = require("request")

class AuthController {

  async redirectToProvider ({ally, params}) {
    await ally.driver(params.provider).redirect()
  }

  async handleProviderCallback ({params, ally, auth, response}) {
    const provider = params.provider
    try {
        const userData = await ally.driver(params.provider).getUser()

        const authUser = await User.query().where({
            'provider': provider,
            'provider_id': userData.getId()
        }).first()
        if (!(authUser === null)) {
            await auth.loginViaId(authUser.id)
            return response.redirect('/')
        }

        const user = new User()
        user.name = userData.getName()
        user.username = userData.getNickname()
        user.email = userData.getEmail()
        user.provider_id = userData.getId()
        user.avatar = userData.getAvatar()
        user.provider = provider
        user.token = userData.getAccessToken()
        await user.save()

        await auth.loginViaId(user.id)
        return response.redirect('/')
      } catch (e) {
        console.log(e)
        response.redirect('/auth/' + provider)
      }
  }

  async logout ({auth, response}) {
    await auth.logout()
    response.redirect('/')
  }

  async getRecentMedia ({auth, response}) {

    try {
      const user = await auth.getUser()

      Request(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${user.token}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          const jsonData = JSON.parse(body);
          console.log(jsonData)
          debugger
        } else {
          console.log(error)
        }
      });
      // return response.send(user)
      return view.render('testing')
    } catch(e) {
      console.log(e)
      return response.send('You are not logged in')
    }

    // request({
    //   uri: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=ACCESS-TOKEN',
    //   // qs: {
    //   //   api_key: '123456',
    //   //   query: 'World of Warcraft: Legion'
    //   // }
    // }).pipe(res);
    // return view.render('testing')
  }
}

module.exports = AuthController
