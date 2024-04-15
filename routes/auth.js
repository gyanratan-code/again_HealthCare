const express = require('express')
const passport = require('passport')
const router = express.Router()


router.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }))


router.get(
  '/auth/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/auth/google/failure'
	 }),
  (req, res, next) => {
    res.redirect('/log')
  }
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/auth/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})
module.exports = router;