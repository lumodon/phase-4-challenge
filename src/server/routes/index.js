const router = require('express').Router()
const Albums = require('../../models/albums')

router.get('/', (req, res) => {
  Albums.getAlbums()
    .then((albums) => {
      res.render('index', {albums})
    })
    .catch((error) => {
      res.status(500).render('error', {error})
    })
})

router.use('/albums', require('./albums'))

module.exports = router
