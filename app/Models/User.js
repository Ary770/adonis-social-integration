'use strict'

const Hash = use('Hash')
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get table () {
    return 'users'
  }

  static get primaryKey () {
    return 'id'
  }

  media() {
    return this.hasMany('App/Models/Media')
  }
}

module.exports = User
