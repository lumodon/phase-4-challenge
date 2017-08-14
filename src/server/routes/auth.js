const router = require('express').Router()
const Users = require('../../models/users')

router.route('/sign-in')
  .get((req, res) => {
    res.render('sign_in')
  })
  .post((req, res) => {
    Users.verifyPasswordWithEmail(req.body.email, req.body.password)
      .then((user) => {
        if (user) {
          req.session.user = user.id
          res.redirect(`users/${user.id}`)
        } else {
          res.redirect('/sign-in') // TODO: add error message explaining why
        }
      })
      .catch((error) => {
        res.status(500).render('error', {error})
      })
  })

router.route('/sign-up')
  .get((req, res) => {
    res.render('sign_up')
  })
  .post((req, res) => {
    Users.createUser(req.body.email, req.body.firstName, req.body.lastName, req.body.password)
      .then((user) => {
        res.render('profile', {user})
      })
      .catch((error) => {
        res.status(500).render('error', {error})
      })
  })

module.exports = router
