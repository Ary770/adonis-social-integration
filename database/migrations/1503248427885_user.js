'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name').nullable()
      table.string('avatar').nullable()
      table.string('username', 80).nullable()
      table.string('email', 254).nullable()
      table.string('provider_id').nullable()
      table.string('provider').nullable()
      table.string('password', 60).nullable()
      table.string('token').nullable()
      table.string('bio').nullable()
      table.string('website').nullable()
      table.integer('follows').nullable()
      table.integer('followed_by').nullable()
      table.string('birthday').nullable()
      table.string('last_name').nullable()
      table.string('gender').nullable()
      table.string('hometown').nullable()
      table.integer('fb_id').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
