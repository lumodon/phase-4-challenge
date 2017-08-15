const router = require('express').Router()
const Albums = require('../../models/albums')
const Reviews = require('../../models/reviews')
const setLocals = require('../../helpers/setLocals')

router.get('/sign-out', (req, res) => {
  req.session = null
  res.redirect('/')
})

router.use('/', (req, res, next) => {
  if (req.session.user) {
    console.log('req.session.user -> ', req.session.user)
    setLocals(res, next, {
      navbutton1: {
        text: 'Profile',
        link: `/users/${req.session.user}`,
      },
      navbutton2: {
        text: 'Sign Out',
        link: '/sign-out',
      },
    })
  } else {
    setLocals(res, next)
    // Should I set the default here
    // or leave it IN the helper function?
  }
})

router.get('/', (req, res) => {
  Promise.all([
    Reviews.getReviewsWithLimit(req.session.user),
    Albums.getAlbums(),
  ])
    .then(contents => ({
      reviews: contents[0],
      albums: contents[1],
    }))
    .then(({reviews, albums}) => {
      res.render('index', {reviews, albums})
    })
    .catch((error) => {
      res.status(500).render('error', {error})
    })
})

router.use('/', require('./auth'))
router.use('/users', require('./users'))
router.use('/albums', require('./albums'))

module.exports = router
