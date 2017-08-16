const moment = require('moment')

module.exports = (dbContent, viewingUser) => {
  const reviewContainer = {list: [], reviews_are_deletable: true}
  if (dbContent) {
    // Grab album info if they exist seperate from reviews
    if (dbContent[0].album_id) {
      reviewContainer.album = {
        id: dbContent[0].album_id,
        title: dbContent[0].album_title,
        artist: dbContent[0].album_artist,
      }
    }

    // Loop through all the Review contents and Album contents
    dbContent.forEach((dbContentValue) => {
      if (dbContentValue.review_id) {
        reviewContainer.list.push({
          review_content: dbContentValue.review_content,
          review_date: moment(dbContentValue.review_date).format('MMM Mo YYYY'),
          review_id: dbContentValue.review_id,
          review_album_title: dbContentValue.album_title,
          review_album_id: dbContentValue.album_id,
          review_album_artist: dbContentValue.album_artist,
          review_album_date: dbContentValue.album_date,
          review_user_name: dbContentValue.user_name,
          review_user_id: dbContentValue.user_id,
          review_is_deletable: viewingUser === dbContentValue.user_id,
        })
      }
    })
    return reviewContainer
  }
  return {reviews: null}
}
