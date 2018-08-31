'use strict'

const Model = use('Model')

class Media extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Media
