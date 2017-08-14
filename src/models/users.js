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

function verifyPasswordWithEmail(email, plainPassword) {
  return getUserByEmail(email)
    .then(user =>
      bcrypt.compare(plainPassword, user.password)
        .then((doesMatch) => { // eslint-disable-line arrow-body-style
          return doesMatch ? user : false
          // Had to disable eslint above because other way results in
          // linting error: No ambigious arrow
        }),
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
  verifyPasswordWithEmail,
}
