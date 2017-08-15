const {_query} = require('../helpers/query')

function getReviews() {
  return _query(`
    SELECT * FROM reviews
    ORDER BY date_created DESC
  `, [], 'any')
}

function getAllByUserID(userID) {
  return _query(`
    SELECT
      reviews.id AS review_id,
      users.id AS user_id,
      albums.id AS album_id,
      review_content,
      reviews.date_created AS review_date,
      users.date_created AS user_date,
      albums.title AS album_title,
      albums.artist AS album_artist,
      users.name AS user_name,
      users.email AS user_email
    FROM reviews
    JOIN albums
      ON albums.id = reviews.album_id
    RIGHT JOIN users
      ON users.id = reviews.user_id
    WHERE users.id = $1
    ORDER BY reviews.date_created DESC
  `, [userID], 'any')
}
// getAllByUserID should return users EVEN IF there are no reviews by that user
// bug finally solved: right join must be the LAST join.

function getAllByAlbumID(albumID) {
  return _query(`
  SELECT
    reviews.id AS review_id,
    users.id AS user_id,
    albums.id AS album_id,
    review_content,
    reviews.date_created AS review_date,
    users.date_created AS user_date,
    albums.title AS album_title,
    albums.artist AS album_artist,
    users.name AS user_name,
    users.email AS user_email
  FROM reviews
  JOIN users
    ON users.id = reviews.user_id
  JOIN albums
    ON albums.id = reviews.album_id
  WHERE album_id = $1
`, [albumID], 'any')
}

function createReview(userID, albumID, reviewContent) {
  return _query(`
    INSERT INTO reviews
      (user_id, album_id, review_content)
    VALUES
      ($1, $2, $3)
    RETURNING *
  `, [userID, albumID, reviewContent], 'oneOrNone')
}

function deleteReviewByID(reviewID) {
  return _query(`
    DELETE FROM reviews
    WHERE id = $1
    RETURNING *
  `, [reviewID], 'oneOrNone')
}

module.exports = {
  getReviews,
  getAllByUserID,
  getAllByAlbumID,
  createReview,
  deleteReviewByID,
}
