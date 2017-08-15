const router = require('express').Router()
const Albums = require('../../models/albums')
const Reviews = require('../../models/reviews')
const handleFlash = require('../../helpers/handleFlash')

function isLoggedIn(req, res, next) {
  if (req.session.user >= 0) {
    next()
  } else {
    req.session.flash = 'You must be logged in to do that.'
    res.redirect('/')
  }
}

router.route('/:albumID/reviews/new')
  .get(isLoggedIn, (req, res) => {
    const flash = handleFlash(req.session)
    Albums.getAlbumByID(req.params.albumID, req.session.user)
      .then((album) => {
        res.render('new_review', {album, flash})
      })
  })
  .post((req, res) => {
    const reviewContent = req.body.reviewContent
    if (reviewContent && reviewContent.length > 0) {
      Reviews.createReview(req.session.user, req.params.albumID, reviewContent)
        .then((creationConfirmation) => {
          if (creationConfirmation) {
            res.redirect(`/albums/${req.params.albumID}`)
          } else {
            res.redirect(`/albums/${req.params.albumID}/reviews/new`)
          }
        })
    } else {
      req.session.flash = 'Must type something into the review!'
      res.redirect(`/albums/${req.params.albumID}/reviews/new`)
    }
  })

router.get('/:albumID', (req, res) => {
  const albumID = req.params.albumID

  Reviews.getAllByAlbumID(albumID, req.session.user)
    .then((reviews) => {
      res.render('album', {reviews, album: reviews.album})
    })
    .catch((error) => {
      res.status(500).render('error', {error})
    })
})


module.exports = router
