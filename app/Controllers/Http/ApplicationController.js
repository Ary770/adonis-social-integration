'use strict'

const request = use('Request')
const https = require('https');
const Media = use('App/Models/Media')

class ApplicationController {
  async getUserInfo ({auth, response}) {
    try {
      const user = await auth.getUser()

      https.get(`https://api.instagram.com/v1/users/self/?access_token=${user.token}`, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          const userData = JSON.parse(data).data
          user.bio = userData.bio
          user.website = userData.website
          user.follows = userData.counts.follows
          user.followed_by = userData.counts.followed_by
          user.save()
        });
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      })

      return response.redirect('/')

    } catch (e) {
      console.log(e)
    }
  }

  async getRecentMedia ({auth, view, response}) {
    try {
      const user = await auth.getUser()

      request(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${user.token}`, { json: true }, (err, res, body) => {

        if (err) { return console.log(err); }

        const userMediaJSON = body.data

        userMediaJSON.map( mediaJSON => {
          const media = new Media()
          media.location = mediaJSON.location.name
          media.image = mediaJSON.images.low_resolution.url
          media.likes = mediaJSON.likes.count
          if (mediaJSON.caption) {
            media.text = mediaJSON.caption.text
          }
          user.media().save(media)
        })
      });

      debugger
      // return response.send(user)

    } catch (e){
      console.log('Log in first!')
    }
  }
}

module.exports = ApplicationController
