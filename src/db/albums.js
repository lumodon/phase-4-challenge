const {_query} = require('../helpers/query')

function getAlbums() {
  return _query('SELECT * FROM albums', [], 'any')
}

function getAlbumByID(albumID) {
  return _query(`
    SELECT * FROM albums
    WHERE id = $1
  `, [albumID], 'oneOrNone')
}

module.exports = {
  getAlbums,
  getAlbumByID,
}
