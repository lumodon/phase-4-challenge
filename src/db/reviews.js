const {_query} = require('../helpers/query')

const LIST_OPTIONS = `
  reviews.id AS review_id,
  review_content,
  reviews.date_created AS review_date,
  users.id AS user_id,
  users.date_created AS user_date,
  users.name AS user_name,
  users.email AS user_email,
  albums.id AS album_id,
  albums.title AS album_title,
  albums.artist AS album_artist
`

function getReviewsWithLimit(limit) {
  return _query(`
    SELECT ${LIST_OPTIONS}
    FROM reviews
    JOIN albums
      ON albums.id = reviews.album_id
    JOIN users
      ON users.id = reviews.user_id
    ORDER BY reviews.date_created DESC
    ${limit > 0 ? 'LIMIT $1' : ''}
  `, [limit], 'any')
}

function getAllByUserID(userID) {
  return _query(`
    SELECT ${LIST_OPTIONS}
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
  SELECT ${LIST_OPTIONS}
  FROM reviews
  JOIN users
  ON users.id = reviews.user_id
  RIGHT JOIN albums
  ON albums.id = reviews.album_id
  WHERE albums.id = $1
  ORDER BY reviews.date_created DESC
  `, [albumID], 'any')
}
// getAllByAlbumID should return Albums EVEN IF there are no reviews for that Album

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
  getReviewsWithLimit,
  getAllByUserID,
  getAllByAlbumID,
  createReview,
  deleteReviewByID,
}
