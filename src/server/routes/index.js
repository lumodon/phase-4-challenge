const router = require('express').Router()
const Albums = require('../../models/albums')

router.use('/', (req, res, next) => {
  // Sets default locals for ejs views to keep ejs logicless (logic-minimal)
  res.locals = {
    navbutton1: {
      text: 'Sign Up',
      link: '/sign-up',
    },
    navbutton2: {
      text: 'Sign In',
      link: '/sign-in',
    },
    autofill: process.env.NODE_ENV === 'development'
      ? {
        email: 'ai@gmail.com',
        password: 'foo',
      }
      : {
        email: '',
        password: ''
      },
    title: '',
  }

  next()
})

router.get('/', (req, res) => {
  Albums.getAlbums()
    .then((albums) => {
      res.render('index', {albums})
    })
    .catch((error) => {
      res.status(500).render('error', {error})
    })
})

router.use('/', require('./auth'))
router.use('/users', require('./users'))
router.use('/albums', require('./albums'))

module.exports = router
