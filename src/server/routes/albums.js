const router = require('express').Router()
const Albums = require('../../models/albums')

router.get('/:albumID', (req, res) => {
  const albumID = req.params.albumID

  Albums.getAlbumByID(albumID)
    .then((album) => {
      res.render('album', {album})
    })
    .catch((error) => {
      res.status(500).render('error', {error})
    })
})

module.exports = router
