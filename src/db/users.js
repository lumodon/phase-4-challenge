const {_query} = require('../helpers/query')

function getUsers() {
  return _query('SELECT * FROM users', [], 'any')
}

function getUserByID(userID) {
  return _query(`
    SELECT * FROM users
    WHERE id = $1
  `, [userID], 'oneOrNone')
}

function getUserByEmail(email) {
  return _query(`
    SELECT * FROM users
    WHERE lower(email) = $1
  `, [email.toLowerCase()], 'oneOrNone')
}

function createUser(email, name, password) {
  return _query(`
    INSERT INTO users
      (email, name, password)
    VALUES
      ($1, $2, $3)
    RETURNING *
  `, [email.toLowerCase(), name, password], 'oneOrNone')
}

function deleteUserByEmail(email) {
  return _query(`
    DELETE FROM users
    WHERE lower(email) = $1
    RETURNING *
  `, [email.toLowerCase()], 'oneOrNone')
}

module.exports = {
  getUsers,
  getUserByID,
  getUserByEmail,
  createUser,
  deleteUserByEmail,
}
