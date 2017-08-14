const router = require('express').Router()
const Users = require('../../models/users')

router.get('/:userID', (req, res) => {
  const userID = req.params.userID

  Users.getUserByID(userID)
    .then((user) => {
      res.render('profile', {user})
    })
    .catch((error) => {
      res.status(500).render('error', {error})
    })
})

module.exports = router
