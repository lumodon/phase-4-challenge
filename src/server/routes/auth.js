const router = require('express').Router()
const Users = require('../../models/users')
const handleFlash = require('../../helpers/handleFlash')
const validateInput = require('../../helpers/validateInput')

router.route('/sign-in')
  .get((req, res) => {
    const flash = handleFlash(req.session)
    res.render('sign_in', {flash, title: 'Sign In'})
  })
  .post((req, res) => {
    Users.verifyPasswordWithEmail(req.body.email, req.body.password)
      .then((user) => {
        if (user) {
          req.session.user = user.id
          if(req.session.urlAttempted) {
            res.redirect(req.session.urlAttempted)
          } else {
            res.redirect(`users/${user.id}`)
          }
        } else {
          req.session.flash = 'Invalid information.'
          res.redirect('/sign-in')
        }
      })
      .catch((error) => {
        res.status(500).render('error', {error})
      })
  })

router.route('/sign-up')
  .get((req, res) => {
    const flash = handleFlash(req.session)
    res.render('sign_up', {flash, title: 'Sign Up'})
  })
  .post((req, res) => {
    if (!validateInput(req.body, req.session)) {
      res.redirect('/sign-up')
    } else {
      Users.createUser(req.body.email, req.body.name, req.body.password)
        .then((user) => {
          req.session.user = user.id
          res.redirect(`users/${user.id}`)
        })
        .catch((error) => {
          if (error.code === '23505') {
            req.session.flash = 'Email already taken'
            res.redirect('/sign-up')
          } else {
            res.status(500).render('error', {error})
          }
        })
    }
  })

module.exports = router
