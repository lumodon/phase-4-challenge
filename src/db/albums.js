const {_query} = require('./helpers')

function getAlbums() {
  return _query('SELECT * FROM albums', [], 'any')
}

function getAlbumsByID(albumID) {
  return _query(`
    SELECT * FROM albums
    WHERE id = $1
  `, [albumID], 'oneOrNone')
}

module.exports = {
  getAlbums,
  getAlbumsByID,
}
