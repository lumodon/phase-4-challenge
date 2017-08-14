const pgp = require('pg-promise')()

const dbName = process.env.DATABASE_NAME || 'vinyl'
const connectionString = `${process.env.DATABASE_URL}${dbName}` || `postgres://localhost:5432/${dbName}`

module.exports = pgp(connectionString)