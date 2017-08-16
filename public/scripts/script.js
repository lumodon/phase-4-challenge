function handleDelete() {
  const deleteReviewButton = this
  if (confirm('Are you sure you want to delete this review?')) { // eslint-disable-line no-alert
    fetch(`/reviews/${deleteReviewButton.dataset.reviewid}/delete`, {
      method: 'DELETE',
    })
      .then(response => response.text())
      .then((responseCode) => {
        document.querySelector('.success').innerHTML = `Success! ${responseCode}`
        const reviewToDelete = document.querySelector(`div[data-reviewid="${deleteReviewButton.dataset.reviewid}"`)
        reviewToDelete.parentElement.removeChild(reviewToDelete)
      })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const deleteReviewButtons = Array.from(document.querySelectorAll('.delete-review'))
  deleteReviewButtons.forEach((deleteReviewButton) => {
    deleteReviewButton.addEventListener('click', handleDelete)
  })
})
