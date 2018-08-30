'use strict'

const Request = use('Request')

class ApplicationController {
  async getRecentMedia ({auth, view, response}) {
    try {
      const user = await auth.getUser()

      Request(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${user.token}`, function(error, resp, body) {
        if (!error && resp.statusCode == 200) {
          const instagramJSON = JSON.parse(body);
          console.log(instagramJSON)

          // return view.render('testing', {data: instagramJSON.data[0].id})
        }
      })
    } catch (e){
      console.log('Log in first!')
    }

  }
}

module.exports = ApplicationController
