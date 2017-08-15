const router = require('express').Router()
const Albums = require('../../models/albums')
const Reviews = require('../../models/reviews')


router.get('/:albumID', (req, res) => {
  const albumID = req.params.albumID

  Reviews.getAllByAlbumID(albumID)
    .then((reviews) => {
      res.render('album', {reviews, album: reviews.album})
    })
    .catch((error) => {
      res.status(500).render('error', {error})
    })
})

module.exports = router
