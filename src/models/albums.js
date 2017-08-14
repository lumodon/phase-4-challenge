const albums = require('../db/albums')

function getAlbums() {
  return albums.getAlbums()
}

function getAlbumsByID(albumID) {
  return albums.getAlbumsByID(albumID)
}

module.exports = {
  getAlbums,
  getAlbumsByID,
}