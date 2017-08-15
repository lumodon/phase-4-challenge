const Reviews = require('../db/reviews')
const {REVIEWS_LIMIT} = require('../config/constants')
const populateReviewList = require('../helpers/populateReviewList')

function getReviewsWithLimit(viewingUser) {
  return Reviews.getReviewsWithLimit(REVIEWS_LIMIT)
    .then(content => populateReviewList(content, viewingUser))
}

// TODO: Needs better name but can't think of anything
// What this does is get all reviews by user, along with matching album info
// and user info themself, EVEN IF said user doesn't have any reviews
// AKA GetUserInfo - and while were at it - get reviews.

// Very unflexible but minimizes database calls which are slowest chokepoint in an app
function getAllByUserID(userID, viewingUser) {
  return Reviews.getAllByUserID(userID)
    .then((content) => {
      const userReviewAlbumContainer = {reviews: {list: [], reviews_are_deletable: true}}
      if (content) {
        // Grab the user only once, seperate it from the reviews (We'll only have one user)
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
            const debugTheThing = {
              review_content: contentValue.review_content,
              review_date: contentValue.review_date,
              review_id: contentValue.review_id,
              review_album_title: contentValue.album_title,
              review_album_id: contentValue.album_id,
              review_album_artist: contentValue.album_artist,
              review_album_date: contentValue.album_date,
              review_is_deletable: viewingUser === contentValue.user_id,
            }
            userReviewAlbumContainer.reviews.list.push(debugTheThing)
          }
        })

        return userReviewAlbumContainer
      }
      return {user: null, reviews: null}
    })
}

function getAllByAlbumID(albumID, viewingUser) {
  return Reviews.getAllByAlbumID(albumID)
    .then(content => populateReviewList(content, viewingUser))
}

function createReview(userID, albumID, reviewContent) {
  return Reviews.createReview(userID, albumID, reviewContent)
}

function deleteReviewByID(reviewID) {
  return Reviews.deleteReviewByID(reviewID)
}

module.exports = {
  getReviewsWithLimit,
  getAllByUserID,
  getAllByAlbumID,
  createReview,
  deleteReviewByID,
}
