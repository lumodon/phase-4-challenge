const Reviews = require('../db/reviews')

function getReviews() {
  return Reviews.getReviews()
}

function getAllByUserID(userID) {
  return Reviews.getAllByUserID(userID)
}

function getAllByAlbumID(albumID) {
  return Reviews.getAllByAlbumID(albumID)
}

function createReview(userID, albumID, reviewContent) {
  return Reviews.createReview(userID, albumID, reviewContent)
}

function deleteReviewByID(reviewID) {
  return Reviews.deleteReviewByID(reviewID)
}

module.exports = {
  getReviews,
  getAllByUserID,
  getAllByAlbumID,
  createReview,
  deleteReviewByID,
}
