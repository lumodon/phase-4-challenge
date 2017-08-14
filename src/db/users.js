const {_query} = require('./helpers')

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
  `, [email.toLowerCase()], 'one')
}

function createUser(email, firstName, lastName, password) {
  return _query(`
    INSERT INTO users
      (email, first_name, last_name, password)
    VALUES
      ($1, $2, $3, $4)
    RETURNING *
  `, [email.toLowerCase(), firstName, lastName, password], 'oneOrNone')
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
