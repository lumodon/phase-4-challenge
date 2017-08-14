const pgp = require('pg-promise')()

const dbName = process.env.DATABASE_NAME || 'vinyl'
const connectionString = `${process.env.DATABASE_URL}${dbName}` || `postgres://localhost:5432/${dbName}`
const client = pgp(connectionString)

function getAlbums() {
  return _query('SELECT * FROM albums', [], 'any')
}

function getAlbumsByID(albumID) {
  return _query('SELECT * FROM albums WHERE id = $1', [albumID], 'oneOrNone')
}

/**
 * Runs a pg-promise SQL query with early stateful catch and re-throw error handling.
 * @param {string} sql SQL statement to run.
 * @param {Array} variables Array of variables to pass into $NUMBER in SQL string.
 * @param {string} method Acting as enumeration for following choices: 'query' || 'one' || 'none' || 'oneOrNone' || 'many' || 'manyOrNone' || 'any'.
 * @returns {Promise} A standard promise.
 */
function _query(sql, variables, method) {
  console.log('QUERY ->', sql.replace(/[\n\s]+/g, ' '), variables)

  return client[method](sql, variables)
  .catch( error => {
    console.log(`QUERY -> !!ERROR!!\n\nSQL -> ${sql}\nState -> ${variables}`)
    console.error(error)
    throw error
  })
}

module.exports = {
  getAlbums,
  getAlbumsByID,
}
