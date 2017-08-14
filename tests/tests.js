/* eslint-disable no-console */
const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, '../src/config/.env'),
})

const Users = require('../src/models/users')

Users.getUsers()
  .then((users) => {
    console.log('users --> ', users)
    return Users.createUser('foo@bar.com', 'foo', 'bar', 'foobar')
  })
  .then((createdUser) => {
    console.log('createdUser --> ', createdUser)
    return Users.getUserByEmail('foo@bar.com')
  })
  .then((user) => {
    console.log('user --> ', user)
    return Users.getUserByID(user.id)
  })
  .then((user) => {
    console.log('user --> ', user)
    return Users.deleteUserByEmail('foo@bar.com')
  })
  .then((deletedUser) => {
    return console.log('deletedUser --> ', deletedUser)
  })
  .then(() => {
    console.log('Completely done. Exit with CTRL-C')
  })
  .catch(error =>
    console.error(error),
  )
