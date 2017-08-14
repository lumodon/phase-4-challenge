const Albums = require('../db/albums')

function getAlbums() {
  return Albums.getAlbums()
}

function getAlbumByID(albumID) {
  return Albums.getAlbumByID(albumID)
}

module.exports = {
  getAlbums,
  getAlbumByID,
}
