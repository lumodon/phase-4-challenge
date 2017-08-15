const client = require('../db/pgp')

// PHASE-4-DEVELOPMENT NOTE:
// Got this formatting from https://github.com/Microsoft/vscode/issues/3842

/**
 * Runs a pg-promise SQL query with early stateful catch and re-throw error handling.
 * @param {string} sql SQL statement to run.
 * @param {Array} variables Array of variables to pass into $NUMBER in SQL string.
 * @param {string} method Acting as enumeration for following choices:
 * 'query' || 'one' || 'none' || 'oneOrNone' || 'many' || 'manyOrNone' || 'any'.
 * @returns {Promise} A standard promise.
 */
function _query(sql, variables, method) {
  console.log('QUERY ->', sql.replace(/[\n\s]+/g, ' '), variables) // eslint-disable-line no-console

  return client[method](sql, variables)
    .catch((error) => {
      console.log(`QUERY -> !!ERROR!!\n\nSQL -> ${sql}\nState -> ${variables}`) // eslint-disable-line no-console
      console.error(error) // eslint-disable-line no-console
      throw error
    })
}

module.exports = {
  _query,
}
