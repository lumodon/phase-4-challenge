const router = require('express').Router()
const Reviews = require('../../models/reviews')

router.delete('/:reviewID/delete', (req, res) => {
  const reviewID = req.params.reviewID

  Reviews.deleteReviewByID(reviewID)
    .then(() => {
      res.sendStatus(200)
    })
    .catch((error) => {
      res.status(500).render('error', {error})
    })
})

module.exports = router
