'use strict'

const Schema = use('Schema')

class MediaSchema extends Schema {
  up () {
    this.create('media', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('user')  
      table.string('text').nullable()
      table.string('image').nullable()
      table.integer('likes').nullable()
      table.string('location').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('media')
  }
}

module.exports = MediaSchema
