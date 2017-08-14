const Users = require('../db/users')
const bcrypt = require('bcrypt')

function getUsers() {
  return Users.getUsers()
}

function getUserByID(userID) {
  return Users.getUserByID(userID)
}

function getUserByEmail(email) {
  return Users.getUserByEmail(email)
}

function createUser(email, firstName, lastName, password) {
  return bcrypt.hash(password, 10)
    .then(encryptedPassword =>
      Users.createUser(email, firstName, lastName, encryptedPassword),
    )
}

function deleteUserByEmail(email) {
  return Users.deleteUserByEmail(email)
}

module.exports = {
  getUsers,
  getUserByID,
  getUserByEmail,
  createUser,
  deleteUserByEmail,
}
