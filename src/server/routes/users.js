const router = require('express').Router()
const Reviews = require('../../models/reviews')

router.get('/:userID', (req, res) => {
  const userID = req.params.userID

  Reviews.getAllByUserID(userID)
    .then(({user, reviews}) => {
      res.render('profile', {user, reviews})
    })
    .catch((error) => {
      res.status(500).render('error', {error})
    })
})

module.exports = router
