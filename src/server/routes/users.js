const router = require('express').Router()
const Users = require('../../models/users')
const Reviews = require('../../models/reviews')

router.get('/:userID', (req, res) => {
  const userID = req.params.userID

  Reviews.getAllByUserID(userID)
    .then((content) => {
      const userReviewAlbumContainer = {reviews: []}
      console.log('content --> ', content)
      if (content) {
        // Grab the user only once
        if (content[0].user_id) {
          userReviewAlbumContainer.user = {
            name: content[0].user_name,
            email: content[0].user_email,
            date_created: content[0].user_date,
            user_id: content[0].user_id,
          }
        }

        // Loop through all the Review contents and Album contents
        content.forEach((contentValue) => {
          if (contentValue.review_id) {
            userReviewAlbumContainer.reviews.push({
              review_content: contentValue.review_content,
              review_date: contentValue.review_date,
              review_id: contentValue.review_id,
              review_album_title: contentValue.album_title,
              review_album_id: contentValue.album_id,
              review_album_artist: contentValue.album_artist,
              review_album_date: contentValue.album_date,
            })
          }
        })

        return userReviewAlbumContainer
      }
      return {user: null, reviews: null}
    })
    .then(({user, reviews}) => {
      res.render('profile', {user, reviews})
    })
    .catch((error) => {
      res.status(500).render('error', {error})
    })
})

module.exports = router
